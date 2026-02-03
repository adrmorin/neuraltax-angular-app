import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ChatbotComponent } from '../../components/chatbot/chatbot.component';
import { TaxDataService } from '../../services/tax-data.service';

@Component({
    selector: 'app-wizard',
    standalone: true,
    imports: [CommonModule, FormsModule, ChatbotComponent, RouterLink],
    templateUrl: './wizard.component.html',
    styleUrls: ['./wizard.component.css']
})
export class WizardComponent {
    private taxDataService = inject(TaxDataService);
    currentStep = signal(1);
    isCalculating = signal(false);
    resultData = signal<{ refund: number; taxDue: number } | null>(null);
    formData = {
        fullName: '',
        maritalStatus: 'single',
        annualIncome: null,
        otherIncome: null,
        isBusinessOwner: false,
        medicalExpenses: null,
        charity: null
    };

    nextStep() {
        if (this.currentStep() < 4) {
            if (this.currentStep() === 2) {
                this.taxDataService.setBusinessOwner(this.formData.isBusinessOwner);
            }
            this.currentStep.update(s => s + 1);
        } else if (this.currentStep() === 4) {
            this.calculateDeclaration();
        }
    }

    async calculateDeclaration() {
        this.isCalculating.set(true);

        // Simulate calculation delay
        await new Promise(resolve => setTimeout(resolve, 3000));

        const totalIncome = (this.formData.annualIncome || 0) + (this.formData.otherIncome || 0);
        const totalDeductions = (this.formData.medicalExpenses || 0) + (this.formData.charity || 0);

        // Simple mock calculation
        const taxableIncome = Math.max(0, totalIncome - totalDeductions - 12000);
        const estimatedTax = taxableIncome * 0.15;
        const withholding = totalIncome * 0.2; // Mock withholding

        const refund = Math.max(0, withholding - estimatedTax);
        const taxDue = Math.max(0, estimatedTax - withholding);

        this.resultData.set({ refund, taxDue });
        this.isCalculating.set(false);
        this.currentStep.set(5);
    }

    prevStep() {
        if (this.currentStep() > 1) {
            this.currentStep.update(s => s - 1);
        }
    }
}
