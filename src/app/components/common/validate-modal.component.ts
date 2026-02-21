import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { AuthService } from '../../services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-validate-modal',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, TranslateModule],
    templateUrl: './validate-modal.component.html',
    styleUrls: ['./validate-modal.component.css']
})
export class ValidateModalComponent {
    modalService = inject(ModalService);
    authService = inject(AuthService);
    translate = inject(TranslateService);

    // Signals for file uploads
    dniFile = signal<File | null>(null);
    w2File = signal<File | null>(null);
    ssnFile = signal<File | null>(null);

    isSubmitting = signal(false);

    // Method to handle file selection
    onFileSelected(event: Event, type: 'dni' | 'w2' | 'ssn') {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            if (type === 'dni') this.dniFile.set(file);
            if (type === 'w2') this.w2File.set(file);
            if (type === 'ssn') this.ssnFile.set(file);
        }
    }

    // Submit validation
    submitValidation() {
        if (!this.dniFile() || !this.w2File() || !this.ssnFile()) {
            alert(this.translate.instant('VALIDATION.ERROR_MISSING'));
            return;
        }

        this.isSubmitting.set(true);

        // Mock/Simulate API call
        setTimeout(() => {
            console.log('Validating documents:', {
                dni: this.dniFile(),
                w2: this.w2File(),
                ssn: this.ssnFile()
            });

            // Update user status
            const currentUser = this.authService.currentUser();
            if (currentUser) {
                this.authService.currentUser.set({ ...currentUser, isValidated: true });
            }

            this.modalService.closeValidate();
            this.isSubmitting.set(false);
        }, 2000);
    }
}
