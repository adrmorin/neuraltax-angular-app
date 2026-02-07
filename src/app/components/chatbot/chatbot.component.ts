import { Component, signal, ElementRef, ViewChild, AfterViewChecked, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { N8nChatService } from '../../services/n8n-chat.service';
import { AuthService } from '../../services/auth.service';

interface Message {
    type: 'user' | 'bot';
    text: string;
}

// Minimal interfaces for Web Speech API to resolve TS/Lint errors
interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: Event) => void;
    onend: () => void;
    start: () => void;
    stop: () => void;
}

interface SpeechRecognitionEvent extends Event {
    results: Record<number, Record<number, Record<'transcript', string>>>;
}

@Component({
    selector: 'app-chatbot',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './chatbot.component.html',
    styleUrl: './chatbot.component.css'
})
export class ChatbotComponent implements OnInit, AfterViewChecked {
    private router = inject(Router);
    private n8n = inject(N8nChatService);
    private auth = inject(AuthService);
    @ViewChild('messagesEnd') messagesEnd!: ElementRef;

    isOpen = signal(false);
    messages = signal<Message[]>([]);
    inputValue = signal('');
    isTyping = signal(false);
    quickReplies = signal<string[]>([]);
    currentLang = 'es';
    isAudioEnabled = signal(true);
    isListening = signal(false);
    private recognition: SpeechRecognition | null = null;
    private synthesis = window.speechSynthesis;
    private selectedVoice: SpeechSynthesisVoice | null = null;

    @Input() embedded = false;
    formMode = signal(false);
    currentFormStep = signal(1);

    private readonly intents = {
        GREETING: 'greeting',
        CHECK_STATUS: 'check_status',
        ESTIMATE_REFUND: 'estimate_refund',
        UPLOAD_DOCS: 'upload_docs',
        TALK_TO_HUMAN: 'talk_to_human',
        HELP: 'help',
        THANKS: 'thanks',
        GOODBYE: 'goodbye',
        UNKNOWN: 'unknown'
    };

    constructor() {
        this.initSpeechRecognition();
        this.initVoiceSelection();
    }

    private initVoiceSelection(): void {
        const loadVoices = () => {
            const voices = this.synthesis.getVoices();
            // Refined locales: Latin American Spanish (es-MX, es-US, es-CL, etc.) and American English (en-US)
            const targetLocale = this.currentLang === 'es' ? 'es-MX' : 'en-US';
            const secondaryLocale = this.currentLang === 'es' ? 'es-US' : 'en-GB';

            const preferredVoices = voices.filter(v => {
                const isFemale = v.name.toLowerCase().includes('female') ||
                    v.name.toLowerCase().includes('zira') ||
                    v.name.toLowerCase().includes('helena') ||
                    v.name.toLowerCase().includes('google mex') ||
                    v.name.toLowerCase().includes('google us');

                return (v.lang.startsWith(targetLocale) || v.lang.startsWith(secondaryLocale)) && isFemale;
            });

            // Prioritize "Natural" or "Google" voices for high-fidelity quality
            this.selectedVoice = preferredVoices.find(v => v.name.toLowerCase().includes('natural')) ||
                preferredVoices.find(v => v.name.toLowerCase().includes('google')) ||
                preferredVoices[0] ||
                voices.find(v => v.lang.startsWith(targetLocale) && (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('google'))) ||
                voices.find(v => v.lang.startsWith(this.currentLang)) ||
                null;
        };

        if (this.synthesis.onvoiceschanged !== undefined) {
            this.synthesis.onvoiceschanged = loadVoices;
        }
        loadVoices();
    }

    private initSpeechRecognition(): void {
        const win = window as unknown as {
            SpeechRecognition?: new () => SpeechRecognition;
            webkitSpeechRecognition?: new () => SpeechRecognition;
        };
        const SpeechRecognitionClass = win.SpeechRecognition || win.webkitSpeechRecognition;
        if (SpeechRecognitionClass) {
            this.recognition = new SpeechRecognitionClass();
            if (this.recognition) {
                this.recognition.continuous = false;
                this.recognition.interimResults = false;
                this.recognition.lang = this.currentLang === 'es' ? 'es-ES' : 'en-US';

                this.recognition.onresult = (event: SpeechRecognitionEvent) => {
                    const text = event.results[0][0].transcript;
                    this.handleUserMessage(text);
                    this.isListening.set(false);
                };

                this.recognition.onerror = () => {
                    this.isListening.set(false);
                };

                this.recognition.onend = () => {
                    this.isListening.set(false);
                };
            }
        }
    }

    toggleListening(): void {
        if (!this.recognition) return;
        if (this.isListening()) {
            this.recognition.stop();
        } else {
            this.recognition.start();
            this.isListening.set(true);
        }
    }

    toggleAudio(): void {
        this.isAudioEnabled.update(v => !v);
        if (!this.isAudioEnabled()) {
            this.synthesis.cancel();
        }
    }

    private speak(text: string): void {
        if (!this.isAudioEnabled() || !this.synthesis) return;

        // Remove HTML tags for cleaner speech
        const cleanText = text.replace(/<[^>]*>?/gm, '');
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = this.currentLang === 'es' ? 'es-ES' : 'en-US';

        if (this.selectedVoice) {
            utterance.voice = this.selectedVoice;
        }

        // Adjust for the "Warm, polished, articulate" female persona:
        utterance.rate = 0.95; // Articulate and moderately paced
        utterance.pitch = 1.05; // Slightly warmer female tone
        utterance.volume = 1.0;

        this.synthesis.speak(utterance);
    }

    ngAfterViewChecked(): void {
        this.scrollToBottom();
    }

    private scrollToBottom(): void {
        if (this.messagesEnd) {
            this.messagesEnd.nativeElement.scrollIntoView({ behavior: 'smooth' });
        }
    }

    toggleChat(): void {
        if (this.embedded) {
            this.isOpen.set(true);
            return;
        }
        this.isOpen.update(v => !v);
        if (this.isOpen()) {
            // Manage session key
            const token = this.auth.getToken();
            if (!token) {
                // If guest, ensure we have a key (service handles generation if null)
                this.n8n.setGuestKey(null);
            } else {
                this.n8n.setGuestKey(null); // auth token will be used
            }

            if (this.messages().length === 0) {
                this.sendInitialGreeting();
            }
        }
    }

    ngOnInit(): void {
        if (this.embedded) {
            this.isOpen.set(true);
            this.formMode.set(true);
            this.sendFormGreeting();
        }
    }

    private sendFormGreeting(): void {
        const text = this.currentLang === 'es'
            ? '¡Hola! Soy Nerea. ¡Es hora de asegurar tu reembolso! ¿Empezamos a completar tu información personal ahora mismo?'
            : 'Hello! I\'m Nerea. It\'s time to secure your refund! Shall we start completing your personal information right now?';
        this.messages.set([{ type: 'bot', text }]);
        this.quickReplies.set(this.currentLang === 'es' ? ['¡Sí, empecemos!', 'Tengo una duda'] : ['Yes, let\'s start!', 'I have a question']);
    }

    closeChat(): void {
        this.isOpen.set(false);
    }

    private sendInitialGreeting(): void {
        const response = this.getResponse(this.intents.GREETING);
        this.messages.set([{ type: 'bot', text: response.text }]);
        this.quickReplies.set(response.options);
        this.speak(response.text);
    }

    handleUserMessage(text: string): void {
        if (!text.trim()) return;

        this.messages.update(msgs => [...msgs, { type: 'user', text }]);
        this.inputValue.set('');
        this.quickReplies.set([]);
        this.isTyping.set(true);

        setTimeout(() => {
            this.isTyping.set(false);
            this.processResponse(text);
        }, 1000 + Math.random() * 500);
    }

    private processResponse(message: string): void {
        // PII Check
        if (message.match(/\d{3}-\d{2}-\d{4}/) || message.match(/\d{9}/)) {
            const text = this.t('pii_warning');
            this.messages.update(msgs => [...msgs, { type: 'bot', text }]);
            this.speak(text);
            return;
        }

        // Add a placeholder message for the bot response
        this.messages.update(msgs => [...msgs, { type: 'bot', text: '' }]);
        const botMessageIndex = this.messages().length - 1;

        // Call n8n service for actual logic with streaming
        this.n8n.sendMessage(message).subscribe({
            next: (chunk: string) => {
                // Update the last message with the new chunk
                this.messages.update(msgs => {
                    const newMsgs = [...msgs];
                    if (newMsgs[botMessageIndex]) {
                        newMsgs[botMessageIndex] = {
                            ...newMsgs[botMessageIndex],
                            text: newMsgs[botMessageIndex].text + chunk
                        };
                    }
                    return newMsgs;
                });
                this.scrollToBottom();
            },
            error: (err) => {
                console.error('Chat error:', err);
                const errorText = this.currentLang === 'es'
                    ? 'Lo siento, hubo un error al conectar con mi cerebro. Inténtalo de nuevo.'
                    : 'Sorry, there was an error connecting to my brain. Please try again.';

                this.messages.update(msgs => {
                    const newMsgs = [...msgs];
                    // If we have started a message, append error, otherwise create new
                    if (newMsgs[botMessageIndex] && newMsgs[botMessageIndex].text) {
                        newMsgs[botMessageIndex].text += '\n\n[' + errorText + ']';
                    } else {
                        // Replace the empty placeholder or append if missing
                        if (newMsgs[botMessageIndex]) {
                            newMsgs[botMessageIndex].text = errorText;
                        } else {
                            newMsgs.push({ type: 'bot', text: errorText });
                        }
                    }
                    return newMsgs;
                });
                this.speak(errorText);
            },
            complete: () => {
                // Determine intent from full text after stream completes
                const fullText = this.messages()[botMessageIndex]?.text || '';
                const intent = this.detectIntent(fullText); // Note: acting on bot reply might differ from user intent logic, but keeping structure
                const response = this.getResponse(intent);
                // Only show options if meaningful
                if (response.options.length > 0 && intent !== this.intents.UNKNOWN) {
                    this.quickReplies.set(response.options);
                }
                this.speak(fullText);
            }
        });
    }

    private detectIntent(message: string): string {
        const lowerMsg = message.toLowerCase();

        if (lowerMsg.match(/\b(hello|hi|hola|hey|greetings|saludos)\b/)) return this.intents.GREETING;
        if (lowerMsg.match(/\b(status|estado|track|seguimiento)\b/)) return this.intents.CHECK_STATUS;
        if (lowerMsg.match(/\b(refund|reembolso|money|dinero|estimate)\b/)) return this.intents.ESTIMATE_REFUND;
        if (lowerMsg.match(/\b(upload|subir|document|documento)\b/)) return this.intents.UPLOAD_DOCS;
        if (lowerMsg.match(/\b(human|humano|agent|agente)\b/)) return this.intents.TALK_TO_HUMAN;
        if (lowerMsg.match(/\b(help|ayuda|options|opciones)\b/)) return this.intents.HELP;
        if (lowerMsg.match(/\b(thank|thanks|gracias)\b/)) return this.intents.THANKS;
        if (lowerMsg.match(/\b(bye|goodbye|adios)\b/)) return this.intents.GOODBYE;

        return this.intents.UNKNOWN;
    }

    private getResponse(intent: string): { text: string; options: string[] } {
        const responses: Record<string, { text: string; options: string[] }> = {
            [this.intents.GREETING]: {
                text: this.t('greeting'),
                options: [this.t('opt_status'), this.t('opt_refund'), this.t('opt_upload')]
            },
            [this.intents.CHECK_STATUS]: {
                text: this.t('check_status'),
                options: [this.t('opt_refund'), this.t('opt_upload')]
            },
            [this.intents.ESTIMATE_REFUND]: {
                text: this.t('estimate_refund'),
                options: [this.t('opt_status'), this.t('opt_upload')]
            },
            [this.intents.UPLOAD_DOCS]: {
                text: this.t('upload_docs'),
                options: [this.t('opt_go_upload'), this.t('opt_status')]
            },
            [this.intents.TALK_TO_HUMAN]: {
                text: this.t('talk_to_human'),
                options: [this.t('opt_upgrade'), this.t('opt_no_thanks')]
            },
            [this.intents.HELP]: {
                text: this.t('help'),
                options: [this.t('opt_status'), this.t('opt_refund'), this.t('opt_upload')]
            },
            [this.intents.THANKS]: {
                text: this.t('thanks'),
                options: [this.t('opt_status'), this.t('opt_refund')]
            },
            [this.intents.GOODBYE]: {
                text: this.t('goodbye'),
                options: []
            },
            [this.intents.UNKNOWN]: {
                text: this.t('unknown'),
                options: [this.t('opt_status'), this.t('opt_refund'), this.t('opt_upload')]
            }
        };

        return responses[intent] || responses[this.intents.UNKNOWN];
    }

    handleQuickReply(option: string): void {
        if (option === this.t('opt_go_upload')) {
            this.router.navigate(['/upload']);
            this.isOpen.set(false);
            return;
        }
        this.handleUserMessage(option);
    }

    onKeyPress(event: KeyboardEvent): void {
        if (event.key === 'Enter' && this.inputValue().trim()) {
            this.handleUserMessage(this.inputValue());
        }
    }

    // Simple translation helper (to be replaced with ngx-translate)
    private t(key: string): string {
        const translations: Record<string, Record<string, string>> = {
            es: {
                greeting: '¡Hola! Soy Nerea. ¡Vamos a por ese reembolso! ¿Quieres subir tus documentos o verificar el estado de tu declaración hoy?',
                check_status: 'Tu declaración está siendo procesada. Puedes ver el estado en tu Dashboard.',
                estimate_refund: 'Según tus documentos, tu reembolso estimado está disponible en la calculadora.',
                upload_docs: 'Puedes subir tus documentos de forma segura. Acepto W2, 1099, y más.',
                talk_to_human: 'Nuestros agentes están disponibles en el plan Premium. ¿Te gustaría actualizar?',
                help: 'Puedo ayudarte con: verificar estado, estimar reembolsos, y subir documentos.',
                thanks: '¡De nada! Estoy aquí para ayudarte.',
                goodbye: '¡Hasta luego! Que tengas un excelente día.',
                unknown: 'No estoy segura de entender. ¿Podrías reformular tu pregunta?',
                pii_warning: '⚠️ Por favor, no compartas información sensible como tu SSN aquí.',
                opt_status: '📊 Ver estado',
                opt_refund: '💰 Estimar reembolso',
                opt_upload: '📄 Subir documentos',
                opt_go_upload: '📤 Ir a subir',
                opt_upgrade: '⭐ Ver planes',
                opt_no_thanks: 'No, gracias',
                role: 'Asistente de Impuestos IA',
                placeholder: 'Escribe tu mensaje...',
                encrypted: 'Encriptado de extremo a extremo'
            },
            en: {
                greeting: 'Hello! I\'m Nerea. Let\'s get that refund! Do you want to upload your documents or check your declaration status today?',
                check_status: 'Your return is being processed. You can see the status on your Dashboard.',
                estimate_refund: 'Based on your documents, your estimated refund is available in the calculator.',
                upload_docs: 'You can securely upload your documents. I accept W2, 1099, and more.',
                talk_to_human: 'Our agents are available on the Premium plan. Would you like to upgrade?',
                help: 'I can help you with: checking status, estimating refunds, and uploading documents.',
                thanks: 'You\'re welcome! I\'m here to help.',
                goodbye: 'Goodbye! Have a great day.',
                unknown: 'I\'m not sure I understand. Could you rephrase your question?',
                pii_warning: '⚠️ Please don\'t share sensitive info like your SSN here.',
                opt_status: '📊 Check status',
                opt_refund: '💰 Estimate refund',
                opt_upload: '📄 Upload docs',
                opt_go_upload: '📤 Go to upload',
                opt_upgrade: '⭐ View plans',
                opt_no_thanks: 'No, thanks',
                role: 'AI Tax Assistant',
                placeholder: 'Type your message...',
                encrypted: 'End-to-end encrypted'
            }
        };
        return translations[this.currentLang][key] || key;
    }
}
