import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { catchError, tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private baseUrl = `${environment.apiUrl}/api/auth`;
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.loggedIn.asObservable();
  private alreadyChecked = false;

  // === LOGIN ===
  login(email: string, password: string): Observable<{ token: string; user: { email: string } }> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });
    const body = { email, password };

    return this.http.post<{ token: string; user: { email: string } }>(`${this.baseUrl}/login`, body, { headers }).pipe(
      tap((response) => this.handleSuccessfulLogin(response)),
      catchError((err) => {
        console.warn('Login request failed — fallback offline enabled. Error:', err);

        // === Fallback Offline Mode (solo para testing) ===
        if (email === 'chano@yahoo.com' && password === 'Abcde12345$$') {
          const fakeResponse = {
            token: 'fake-jwt-token-offline-123456',
            user: { email }
          };
          return of(fakeResponse).pipe(
            delay(300),
            tap((resp) => this.handleSuccessfulLogin(resp))
          );
        }

        return throwError(() => new Error('Credenciales inválidas o backend no disponible.'));
      })
    );
  }

  // === PROCESA EL LOGIN EXITOSO ===
  private handleSuccessfulLogin(response: { token?: string; user?: { email: string } }) {
    if (response && response.token) {
      localStorage.setItem('token', response.token);
      this.loggedIn.next(true);
      this.router.navigate(['/home']);
    } else {
      console.error('Token is undefined or null');
    }
  }

  // === TOKEN ===
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.alreadyChecked = false;
  }

  // === CHECK LOGIN STATUS ===
  checkLoginStatus(): boolean {
    const token = this.getToken();
    if (!token) {
      this.loggedIn.next(false);
      this.alreadyChecked = true;
      return false;
    }

    if (!this.alreadyChecked) {
      this.validateToken().subscribe(
        () => {
          this.loggedIn.next(true);
          this.alreadyChecked = true;
        },
        () => {
          this.loggedIn.next(false);
          this.logout();
        }
      );
    }

    return this.loggedIn.getValue();
  }

  // === VALIDACIÓN DE TOKEN ===
  validateToken(): Observable<{ valid: boolean }> {
    return this.http.get<{ valid: boolean }>(`${this.baseUrl}/validate-token`, { headers: this.getAuthHeaders() });
  }

  // === INFO DEL USUARIO ===
  getUserInfo(): Observable<{ email: string; name?: string }> {
    return this.http.get<{ email: string; name?: string }>(`${this.baseUrl}/user-info`, { headers: this.getAuthHeaders() });
  }

  private getAuthHeaders(): Record<string, string> {
    const token = this.getToken();
    return {
      Authorization: `Bearer ${token}`,
    };
  }
}
