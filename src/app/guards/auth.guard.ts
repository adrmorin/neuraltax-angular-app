import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    // Verificación síncrona inmediata
    const token = authService.getToken();

    if (token) {
        return true;
    } else {
        router.navigate(['/']);
        return false;
    }
};
