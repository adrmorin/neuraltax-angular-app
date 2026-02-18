import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal, computed } from '@angular/core';
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

    // --- NEW: User Signals ---
    public currentUser = signal<User | null>(null);
    public currentUserDashboard = computed(() => {
        const user = this.currentUser();
        if (!user) return '/';
        return this.getDashboardRoute(user.roles || []);
    });

    // === LOGIN ===
    login(email: string, password: string): Observable<{ token: string; userId: string; firstName: string; lastName: string }> {

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        });
        const body = { email, password };

        return this.http.post<{ token: string; userId: string; firstName: string; lastName: string }>(`${this.baseUrl}/login`, body, { headers }).pipe(
            tap((response) => this.handleSuccessfulLogin(response)),
            catchError(() => {
                return throwError(() => new Error('Credenciales inválidas o backend no disponible.'));
            })
        );
    }

    // === PROCESA EL LOGIN EXITOSO ===
    private handleSuccessfulLogin(response: { token: string; userId: string; firstName: string; lastName: string }) {
        if (response && response.token) {
            localStorage.setItem('token', response.token);

            // Set expiration to 24 hours from now
            const expirationTime = Date.now() + 24 * 60 * 60 * 1000;
            localStorage.setItem('token_expiry', expirationTime.toString());

            this.loggedIn.next(true);

            // Set user from login response
            this.currentUser.set({
                firstName: response.firstName || 'Usuario',
                lastName: response.lastName || '',
                email: '',
                phone: '',
                password: '',
                roles: ['ROLE_FREE'],
                isValidated: false // Explicitly false until they complete validation
            });

            // Navigate to dashboard
            const dashboardRoute = this.getDashboardRoute(['ROLE_FREE']);
            this.router.navigate([dashboardRoute]);
        } else {
            throw new Error('El servidor no devolvió un token de acceso válido.');
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



    // === TOKEN ===
    getToken(): string | null {
        const token = localStorage.getItem('token');
        const expiry = localStorage.getItem('token_expiry');

        if (!token || !expiry) {
            return null;
        }

        // Check if token has expired
        if (Date.now() > parseInt(expiry, 10)) {
            console.warn('Token has expired');
            this.logout();
            return null;
        }

        return token;
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('token_expiry');
        this.loggedIn.next(false);
        this.currentUser.set(null); // Clear signal
        this.alreadyChecked = false;
        this.router.navigate(['/']); // Ensure redirect to landing on logout
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
                    // Always fetch user info on app init
                    this.getUserInfo().subscribe({
                        next: (u) => {
                            console.log('✅ User info loaded on app init:', u);
                            this.currentUser.set(u);
                        },
                        error: (err) => {
                            console.error('❌ Failed to load user info on init:', err);
                            // Even if getUserInfo fails, keep user logged in with minimal info
                            // This prevents showing "Iniciar Sesión" button if token is valid
                            this.currentUser.set({
                                firstName: 'Usuario',
                                lastName: '',
                                email: '',
                                phone: '',
                                password: '',
                                roles: ['ROLE_FREE'],
                                isValidated: false
                            });
                        }
                    });
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
        console.log('📞 Calling getUserInfo() - Fetching user data from backend...');

        return this.http.get<User>(`${this.baseUrl}/user-info`, { headers: this.getAuthHeaders() });
    }

    private getAuthHeaders(): Record<string, string> {
        const token = this.getToken();
        return {
            Authorization: `Bearer ${token}`,
        };
    }
}
