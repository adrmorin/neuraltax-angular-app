import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../../services/modal.service';
import { CommonModule } from '@angular/common';
import { MessageComponent } from '../message/message.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-register-modal',
    standalone: true,
    imports: [FormsModule, CommonModule, MessageComponent, TranslateModule],
    templateUrl: './register-modal.component.html',
    styleUrls: ['./register-modal.component.css']
})
export class RegisterModalComponent {
    public modalService = inject(ModalService);
    private userService = inject(UserService);
    private router = inject(Router);

    email = '';
    firstName = '';
    lastName = '';
    phone = '';
    password = '';
    confirmPassword = '';
    loading = false;
    error = '';
    success = false;

    // Password visibility
    showPassword = false;

    // Validation flags
    hasUpperCase = false;
    hasSpecialChar = false;
    hasNumber = false;
    minLength = false;
    passwordsMatch = false;

    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }

    validatePassword() {
        this.hasUpperCase = /[A-Z]/.test(this.password);
        this.hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(this.password);
        this.hasNumber = /\d/.test(this.password);
        this.minLength = this.password.length >= 8;

        this.checkPasswordsMatch();
    }

    checkPasswordsMatch() {
        this.passwordsMatch = this.password === this.confirmPassword && this.password !== '';
    }

    get isPasswordValid(): boolean {
        return this.hasUpperCase && this.hasSpecialChar && this.hasNumber && this.minLength;
    }

    onSubmit() {
        this.validatePassword();

        if (!this.email || !this.firstName || !this.lastName || !this.phone || !this.password || !this.confirmPassword) {
            this.error = 'Todos los campos son obligatorios';
            return;
        }

        if (!this.isPasswordValid) {
            this.error = 'La contraseña no cumple con los requisitos';
            return;
        }

        if (!this.passwordsMatch) {
            this.error = 'Las contraseñas no coinciden';
            return;
        }

        this.loading = true;
        this.error = '';
        this.success = false;

        const registrationData = {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phone: this.phone,
            password: this.password,
            username: this.email // Fallback: some backends require username
        };

        console.log('Sending registration payload:', registrationData);

        this.userService.registerUser(registrationData).subscribe({
            next: (response) => {
                console.log('Registration success:', response);
                this.loading = false;
                this.success = true;
                // Close modal and route to free dashboard immediately
                this.modalService.closeRegister();
                this.success = false;
                this.resetForm();
                this.router.navigate(['/home']);
            },
            error: (err) => {
                this.loading = false;
                this.error = 'Error del servidor. Por favor, inténtelo de nuevo más tarde.';
                console.error('Registration error:', err);
            }
        });
    }

    resetForm() {
        this.email = '';
        this.firstName = '';
        this.lastName = '';
        this.phone = '';
        this.password = '';
        this.confirmPassword = '';
        this.error = '';
        this.hasUpperCase = false;
        this.hasSpecialChar = false;
        this.hasNumber = false;
        this.minLength = false;
        this.passwordsMatch = false;
    }
}
