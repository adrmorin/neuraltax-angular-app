import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class N8nChatService {
    private http = inject(HttpClient);
    private auth = inject(AuthService);

    private readonly baseUrl = environment.n8nWebhookUrl;
    private guestKey: string | null = null;

    setGuestKey(key: string | null) {
        this.guestKey = key;
    }

    private generateId(): string {
        const g = globalThis as unknown as { crypto?: { randomUUID?: () => string } };
        if (g?.crypto?.randomUUID) return g.crypto.randomUUID();
        const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        return `${Date.now()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}`;
    }

    private ensureSessionKey(): string {
        const token = this.auth.getToken();
        if (token && token.trim() !== '') return token;
        if (this.guestKey && this.guestKey.trim() !== '') return this.guestKey;
        this.guestKey = this.generateId();
        return this.guestKey;
    }

    sendMessage(message: string): Observable<string> {
        let params = new HttpParams().set('message', message);
        const sessionKey = this.ensureSessionKey();
        params = params.set('key', sessionKey);

        return this.http.get(this.baseUrl, { params, responseType: 'text' }).pipe(
            map((res: string) => {
                const tryExtract = (data: unknown): string | null => {
                    if (data == null) return null;
                    if (typeof data === 'string') return data;
                    if (Array.isArray(data)) {
                        for (const item of data) {
                            const out = tryExtract(item);
                            if (out) return out;
                        }
                        return null;
                    }
                    if (typeof data === 'object') {
                        const obj = data as Record<string, unknown>;
                        if (typeof obj['output'] === 'string') return obj['output'];
                        if (obj['output'] != null) {
                            try {
                                return JSON.stringify(obj['output']);
                            } catch {
                                return null;
                            }
                        }
                        if (typeof obj['reply'] === 'string') return obj['reply'];
                        if (typeof obj['response'] === 'string') return obj['response'];
                        if (obj['data']) {
                            const nested = tryExtract(obj['data']);
                            if (nested) return nested;
                        }
                        if (obj['result']) {
                            const nested = tryExtract(obj['result']);
                            if (nested) return nested;
                        }
                    }
                    return null;
                };

                try {
                    const parsed = JSON.parse(res);
                    const extracted = tryExtract(parsed);
                    if (extracted != null) return extracted;
                    return typeof parsed === 'string' ? parsed : JSON.stringify(parsed);
                } catch {
                    return res;
                }
            })
        );
    }
}
