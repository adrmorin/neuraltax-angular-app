import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Guard para evitar que usuarios autenticados accedan al landing page.
 * Si el usuario está logueado, lo redirige a /home.
 */
export const landingGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    // Verificación síncrona inmediata
    const token = authService.getToken();

    if (token) {
        // Usuario autenticado: redirigir a home
        router.navigate(['/home']);
        return false;
    } else {
        // Usuario no autenticado: permitir acceso al landing
        return true;
    }
};
