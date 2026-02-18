import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { MessageComponent } from '../../components/common/message/message.component';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, MessageComponent],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    private authService = inject(AuthService);
    public modalService = inject(ModalService);

    email = '';
    password = '';
    loading = false;
    error = '';

    onSubmit() {
        this.loading = true;
        this.error = '';

        this.authService.login(this.email, this.password).subscribe({
            next: () => {
                this.loading = false;
                this.modalService.closeLogin();
            },
            error: (err) => {
                this.loading = false;
                this.error = err.message || 'Error al iniciar sesión. Por favor verifica tus credenciales.';
                console.error('❌ Login error in component:', err);
            }
        });
    }
}
