import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    private authService = inject(AuthService);

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
                // Navigation is handled inside AuthService.handleSuccessfulLogin
            },
            error: (err) => {
                this.loading = false;
                this.error = err.message || 'Error al iniciar sesión';
            }
        });
    }
}
