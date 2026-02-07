import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem('token');

    // Solo añadir Authorization si la URL pertenece a la API propia
    const isOwnApi = req.url.startsWith(environment.apiUrl);

    // No añadir token para login/register o assets
    const isAuthEndpoint = /(\/api\/(users|auth)\/(login|register))(\b|\/|\?)/.test(req.url) || req.url.includes('/assets/');

    if (token && isOwnApi && !isAuthEndpoint) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    return next(req);
};
