import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class N8nChatService {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  //private readonly baseUrl = environment.n8nWebhookUrl;
  private guestKey: string | null = null;

  // Allow components to set a transient guest session key when user is not logged in
  setGuestKey(key: string | null) {
    this.guestKey = key;
  }

  private generateId(): string {
    const g = globalThis as Record<string, unknown>;
    if (g?.crypto && typeof (g.crypto as Record<string, unknown>).randomUUID === 'function') {
      return ((g.crypto as Record<string, unknown>).randomUUID as () => string)();
    }
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return `${Date.now()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}`;
  }

  // Always return a non-empty session key: prefer user token, then guestKey, else generate one
  private ensureSessionKey(): string {
    const token = this.auth.getToken();
    if (token && token.trim() !== '') return token;
    if (this.guestKey && this.guestKey.trim() !== '') return this.guestKey;
    this.guestKey = this.generateId();
    return this.guestKey;
  }

  // Sends the user's message to the n8n agent via GET and returns the response as plain text
  /* sendMessage(message: string): Observable<string> {
     // Strict params: only 'message' and 'key' as requested
     let params = new HttpParams().set('message', message);
     const token = this.auth.getToken();
     const sessionKey = this.ensureSessionKey();
     // 'key' is required by the workflow as the session identifier (never empty)
     params = params.set('key', sessionKey);
 
     // Dev log: print final GET with query params
     if (!environment.production) {
       //console.log('n8n GET', `${this.baseUrl}?${params.toString()}`);
     }
     return this.http.get(this.baseUrl, { params, responseType: 'text' }).pipe(
       map((res: string) => {
         // Try to parse JSON; otherwise return raw text
         const tryExtract = (data: any): string | null => {
           if (data == null) return null;
           if (typeof data === 'string') return data;
           // Array: look for first element with an 'output' string, else reply/response
           if (Array.isArray(data)) {
             for (const item of data) {
               const out = tryExtract(item);
               if (out) return out;
             }
             return null;
           }
           // Object: prefer 'output'
           if (typeof data === 'object') {
             if (typeof (data as any).output === 'string') return (data as any).output;
             if ((data as any).output != null) {
               try {
                 return JSON.stringify((data as any).output);
               } catch {  }
             }
             if (typeof (data as any).reply === 'string') return (data as any).reply;
             if (typeof (data as any).response === 'string') return (data as any).response;
             // Nested common containers
             if ((data as any).data) {
               const nested = tryExtract((data as any).data);
               if (nested) return nested;
             }
             if ((data as any).result) {
               const nested = tryExtract((data as any).result);
               if (nested) return nested;
             }
           }
           return null;
         };
 
         try {
           const parsed = JSON.parse(res);
           const extracted = tryExtract(parsed);
           if (extracted != null) return extracted;
           // Fallback to stringified JSON when no standard field is found
           return typeof parsed === 'string' ? parsed : JSON.stringify(parsed);
         } catch {
           return res;
         }
       })
     );
   } */
}
