import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api/openai`;

  sendMessage(prompt: string): Observable<{ response: string }> {
    const body = { prompt };
    return this.http.post<{ response: string }>(`${this.baseUrl}/chat`, body);
  }

  processDocuments(formData: FormData): Observable<{ result: string }> {
    return this.http.post<{ result: string }>(`${this.baseUrl}/process-documents`, formData);
  }
}
