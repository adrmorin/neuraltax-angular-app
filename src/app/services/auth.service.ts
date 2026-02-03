import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../models/user-interface';

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
            catchError((err: Error) => {
                console.error('Login error:', err);
                return throwError(() => new Error('Credenciales inválidas o backend no disponible.'));
            })
        );
    }

    // === PROCESA EL LOGIN EXITOSO ===
    private handleSuccessfulLogin(response: { token: string; user: { email: string } }) {
        if (response && response.token) {
            localStorage.setItem('token', response.token);
            this.loggedIn.next(true);

            // Fetch user info to determine the role and redirect accordingly
            this.getUserInfo().subscribe({
                next: (user) => {
                    this.handleRoleNavigation(user.roles || []);
                },
                error: () => {
                    this.router.navigate(['/home']);
                }
            });
        } else {
            console.error('Token is undefined or null');
        }
    }

    private handleRoleNavigation(roles: string[]) {
        if (roles.includes('ROLE_AGENT')) {
            this.router.navigate(['/agent']);
        } else if (roles.includes('ROLE_VIP')) {
            this.router.navigate(['/dashboard']);
        } else if (roles.includes('ROLE_PREMIUM')) {
            this.router.navigate(['/premium-dashboard']);
        } else {
            this.router.navigate(['/free-dashboard']);
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
            this.validateToken().subscribe({
                next: () => {
                    this.loggedIn.next(true);
                    this.alreadyChecked = true;
                },
                error: () => {
                    this.loggedIn.next(false);
                    this.logout();
                }
            });
        }

        return this.loggedIn.getValue();
    }

    // === VALIDACIÓN DE TOKEN ===
    validateToken(): Observable<unknown> {
        return this.http.get(`${this.baseUrl}/validate-token`, { headers: this.getAuthHeaders() });
    }

    // === INFO DEL USUARIO ===
    getUserInfo(): Observable<User> {
        return this.http.get<User>(`${this.baseUrl}/user-info`, { headers: this.getAuthHeaders() });
    }

    private getAuthHeaders(): Record<string, string> {
        const token = this.getToken();
        return {
            Authorization: `Bearer ${token}`,
        };
    }
}
