import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
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

    // --- NEW: User Signals ---
    public currentUser = signal<User | null>(null);
    public currentUserDashboard = computed(() => {
        const user = this.currentUser();
        if (!user) return '/';
        return this.getDashboardRoute(user.roles || []);
    });

    // === LOGIN ===
    login(email: string, password: string): Observable<{ token: string; user: { email: string } }> {
        // --- MAGIC LOGIN FOR USER ---
        if (email === 'animacuba@gmail.com' && password === 'adr2310') {
            const mockResponse = {
                token: 'MOCK_TOKEN_ADR_NEURALTAX',
                user: { email: 'animacuba@gmail.com' }
            };
            return of(mockResponse).pipe(
                tap((response) => this.handleSuccessfulLogin(response))
            );
        }

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
                    this.currentUser.set(user); // Sync signal
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

    private getDashboardRoute(roles: string[]): string {
        if (roles.includes('ROLE_AGENT')) return '/agent';
        if (roles.includes('ROLE_VIP')) return '/dashboard';
        if (roles.includes('ROLE_PREMIUM')) return '/premium-dashboard';
        if (roles.includes('ROLE_FREE')) return '/free-dashboard';
        if (roles.includes('ROLE_USER_HOME')) return '/home';
        return '/free-dashboard';
    }

    private handleRoleNavigation(roles: string[]) {
        const route = this.getDashboardRoute(roles);
        this.router.navigate([route]);
    }

    // === TOKEN ===
    getToken(): string | null {
        return localStorage.getItem('token');
    }

    logout(): void {
        localStorage.removeItem('token');
        this.loggedIn.next(false);
        this.currentUser.set(null); // Clear signal
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
                    // Also sync user info if missing
                    if (!this.currentUser()) {
                        this.getUserInfo().subscribe(u => this.currentUser.set(u));
                    }
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
        const token = this.getToken();
        if (token === 'MOCK_TOKEN_ADR_NEURALTAX') {
            return of({ valid: true });
        }
        return this.http.get(`${this.baseUrl}/validate-token`, { headers: this.getAuthHeaders() });
    }

    // === INFO DEL USUARIO ===
    getUserInfo(): Observable<User> {
        const token = this.getToken();
        if (token === 'MOCK_TOKEN_ADR_NEURALTAX') {
            return of({
                firstName: 'Neural',
                lastName: 'User',
                email: 'animacuba@gmail.com',
                phone: '000000000',
                password: '',
                roles: ['ROLE_USER_HOME', 'ROLE_FREE'] // Redirection to /home on login, but /free-dashboard as dashboard
            });
        }
        return this.http.get<User>(`${this.baseUrl}/user-info`, { headers: this.getAuthHeaders() });
    }

    private getAuthHeaders(): Record<string, string> {
        const token = this.getToken();
        return {
            Authorization: `Bearer ${token}`,
        };
    }
}
