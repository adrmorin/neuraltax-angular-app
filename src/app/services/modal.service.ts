import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    private loginVisible = signal(false);

    // Getter para el estado del modal
    get isLoginVisible() {
        return this.loginVisible.asReadonly();
    }

    // Abrir el modal
    openLogin() {
        this.loginVisible.set(true);
        document.body.style.overflow = 'hidden'; // Bloquear scroll
    }

    // Cerrar el modal
    closeLogin() {
        this.loginVisible.set(false);
        document.body.style.overflow = 'auto'; // Habilitar scroll
    }

    // Alternar el modal
    toggleLogin() {
        if (this.loginVisible()) {
            this.closeLogin();
        } else {
            this.openLogin();
        }
    }
}
