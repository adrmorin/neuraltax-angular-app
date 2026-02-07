import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.isLoggedIn.pipe(
        map(isLoggedIn => {
            if (isLoggedIn) {
                return true;
            } else {
                // Redirigir a landing page si no está autenticado
                router.navigate(['/']);
                return false;
            }
        })
    );
};
