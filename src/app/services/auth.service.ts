import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, tap, map } from 'rxjs/operators';
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

        let roles = user.roles || [];
        if (roles.length === 0 && user.authorities) {
            roles = user.authorities.map(a => a.authority || '');
        }

        return this.getDashboardRoute(roles);
    });

    // === LOGIN ===
    login(email: string, password: string): Observable<{ token: string; userId: string; firstName: string; lastName: string }> {

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        });
        const body = { email, password };

        return this.http.post<{ token: string; userId: string; firstName: string; lastName: string }>(`${this.baseUrl}/login`, body, { headers }).pipe(
            tap((response) => this.handleSuccessfulLogin(response, email)),
            catchError(() => {
                return throwError(() => new Error('Credenciales inválidas o backend no disponible.'));
            })
        );
    }

    // === PROCESA EL LOGIN EXITOSO ===
    private handleSuccessfulLogin(response: { token: string; userId: string; firstName: string; lastName: string }, email: string) {
        if (response && response.token) {
            localStorage.setItem('token', response.token);

            // Guardar info básica por si getUserInfo falla
            localStorage.setItem('fallback_email', email);
            if (response.firstName) localStorage.setItem('fallback_firstName', response.firstName);
            if (response.lastName) localStorage.setItem('fallback_lastName', response.lastName);

            // Set expiration to 24 hours from now
            const expirationTime = Date.now() + 24 * 60 * 60 * 1000;
            localStorage.setItem('token_expiry', expirationTime.toString());

            this.loggedIn.next(true);

            // Fetch actual user info to get the real roles
            this.getUserInfo().subscribe({
                next: (u) => {
                    this.currentUser.set(u);
                },
                error: (err) => {
                    console.error('❌ Failed to load user info after login:', err);
                    // Fallback to basic info from login response
                    this.currentUser.set({
                        firstName: localStorage.getItem('fallback_firstName') || response.firstName || 'Usuario',
                        lastName: localStorage.getItem('fallback_lastName') || response.lastName || '',
                        email: localStorage.getItem('fallback_email') || email,
                        phone: '',
                        password: '',
                        roles: ['ROLE_FREE'],
                        isValidated: false
                    });
                }
            });
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
                                firstName: localStorage.getItem('fallback_firstName') || 'Usuario',
                                lastName: localStorage.getItem('fallback_lastName') || '',
                                email: localStorage.getItem('fallback_email') || '',
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

        return this.http.get<User & { name?: string }>(`${this.baseUrl}/user-info`, { headers: this.getAuthHeaders() }).pipe(
            map((data) => {
                // Normalización de datos en caso de que el backend devuelva otro formato
                const user: User = {
                    ...data,
                    firstName: data.firstName || '',
                    lastName: data.lastName || '',
                    email: data.email || '',
                    phone: data.phone || '',
                    password: data.password || '',
                    roles: data.roles || ['ROLE_FREE'],
                    isValidated: !!data.isValidated
                };

                if (data.name && !user.firstName) {
                    const parts = data.name.split(' ');
                    user.firstName = parts[0] || '';
                    user.lastName = parts.slice(1).join(' ') || '';
                }

                if (!user.firstName) {
                    user.firstName = 'Usuario';
                }
                if (!user.roles || user.roles.length === 0) {
                    user.roles = ['ROLE_FREE'];
                }

                return user as User;
            })
        );
    }

    private getAuthHeaders(): Record<string, string> {
        const token = this.getToken();
        return {
            Authorization: `Bearer ${token}`,
        };
    }
}
