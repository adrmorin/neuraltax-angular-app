import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api/payments`;

  // Método para obtener el clientSecret desde el backend
  createPaymentIntent(amount: number, currency: string): Observable<{ clientSecret: string }> {
    const payload = { amount, currency };
    return this.http.post<{ clientSecret: string }>(`${this.baseUrl}/create-payment-intent`, payload);
  }
}
