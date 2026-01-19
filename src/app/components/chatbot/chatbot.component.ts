import { Component, signal, computed, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
    type: 'user' | 'bot';
    text: string;
}

@Component({
    selector: 'app-chatbot',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './chatbot.component.html',
    styleUrl: './chatbot.component.css'
})
export class ChatbotComponent implements AfterViewChecked {
    @ViewChild('messagesEnd') messagesEnd!: ElementRef;

    isOpen = signal(false);
    messages = signal<Message[]>([]);
    inputValue = signal('');
    isTyping = signal(false);
    quickReplies = signal<string[]>([]);
    currentLang = 'es';

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

    constructor(private router: Router) { }

    ngAfterViewChecked(): void {
        this.scrollToBottom();
    }

    private scrollToBottom(): void {
        if (this.messagesEnd) {
            this.messagesEnd.nativeElement.scrollIntoView({ behavior: 'smooth' });
        }
    }

    toggleChat(): void {
        this.isOpen.update(v => !v);
        if (this.isOpen() && this.messages().length === 0) {
            this.sendInitialGreeting();
        }
    }

    closeChat(): void {
        this.isOpen.set(false);
    }

    private sendInitialGreeting(): void {
        const response = this.getResponse(this.intents.GREETING, '');
        this.messages.set([{ type: 'bot', text: response.text }]);
        this.quickReplies.set(response.options);
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
            this.messages.update(msgs => [...msgs, { type: 'bot', text: this.t('pii_warning') }]);
            return;
        }

        const intent = this.detectIntent(message);
        const response = this.getResponse(intent, message);

        this.messages.update(msgs => [...msgs, { type: 'bot', text: response.text }]);
        this.quickReplies.set(response.options || []);
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

    private getResponse(intent: string, message: string): { text: string; options: string[] } {
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
                greeting: '¡Hola! Soy Nerea, tu asistente de impuestos. ¿En qué puedo ayudarte hoy?',
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
                greeting: 'Hello! I\'m Nerea, your tax assistant. How can I help you today?',
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
