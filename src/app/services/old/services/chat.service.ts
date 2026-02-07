import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
    private messages: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

    constructor() {}

    // Obtiene los mensajes actuales
    getMessages() {
      return this.messages.asObservable();
    }

    // Agrega un mensaje nuevo
    addMessage(message: any) {
      const currentMessages = this.messages.getValue();
      this.messages.next([...currentMessages, message]);
    }

    // Simula la carga inicial de mensajes (puedes conectarlo con una API)
    loadMessages() {
      const initialMessages = [
        { text: 'Hello! How can I help you?', type: 'bot', timestamp: '19:58' },
        { text: 'What makes you different?', type: 'user', timestamp: '19:59' },
      ];
      this.messages.next(initialMessages);
    }
  }
