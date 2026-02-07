import { Component, inject } from '@angular/core';
import { SubscriberService } from '../../../services/old/services/subscriber.service';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../../services/modal.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-register-modal',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './register-modal.component.html',
    styleUrls: ['./register-modal.component.css']
})
export class RegisterModalComponent {
    public modalService = inject(ModalService);
    private subscriberService = inject(SubscriberService);

    email = '';
    loading = false;
    error = '';
    success = false;

    onSubmit() {
        if (!this.email) return;

        this.loading = true;
        this.error = '';
        this.success = false;

        this.subscriberService.subscribe(this.email).subscribe({
            next: (response) => {
                this.loading = false;
                if (response.success) {
                    this.success = true;
                    // Close after 2 seconds
                    setTimeout(() => {
                        this.modalService.closeRegister();
                        this.success = false;
                        this.email = '';
                    }, 2000);
                } else {
                    // Handle case where success is false but no error thrown
                    // Assuming message is present
                    this.error = response.message || 'Error desconocido.';
                }
            },
            error: (err) => {
                this.loading = false;
                // Check if error has message
                this.error = err.error?.message || err.message || 'Error al conectar con el servidor.';
                console.error('Registration error:', err);
            }
        });
    }
}
