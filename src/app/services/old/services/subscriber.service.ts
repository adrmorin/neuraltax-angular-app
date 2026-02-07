import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api/subscribers`;

  subscribe(email: string): Observable<{ success: boolean; message?: string }> {
    console.log("emailService", email);
    const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
    return this.http.post<{ success: boolean; message?: string }>(this.baseUrl, email, { headers });
  }

  getAllSubscribers(): Observable<{ email: string; createdAt?: string }[]> {
    return this.http.get<{ email: string; createdAt?: string }[]>(this.baseUrl);
  }
}
