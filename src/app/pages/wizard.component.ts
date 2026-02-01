import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotComponent } from '../components/chatbot/chatbot.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wizard',
  standalone: true,
  imports: [CommonModule, FormsModule, ChatbotComponent, RouterLink],
  template: `
    <div class="wizard-container">
      <!-- Sidebar -->
      <aside class="wizard-sidebar">
        <div class="sidebar-logo">
          <img src="assets/neuraltax3.png" alt="Neuraltax">
        </div>
        <nav class="sidebar-nav">
          <a routerLink="/" class="nav-item" title="Volver al Inicio">
            <span class="material-symbols-outlined">home</span>
          </a>
        </nav>
      </aside>

      <div class="wizard-main-content">
        <header class="wizard-header">
          <h1>Asistente de Impuestos Neuraltax</h1>
          <p>Completa tu declaración con la ayuda de Nerea</p>
        </header>

        <div class="wizard-layout">
          <!-- Form Section -->
          <div class="form-section">
            <div class="step-indicator">
              <div class="step" [class.active]="currentStep() === 1" [class.completed]="currentStep() > 1">1</div>
              <div class="step" [class.active]="currentStep() === 2" [class.completed]="currentStep() > 2">2</div>
              <div class="step" [class.active]="currentStep() === 3" [class.completed]="currentStep() > 3">3</div>
              <div class="step" [class.active]="currentStep() === 4" [class.completed]="currentStep() > 4">4</div>
              <div class="step" [class.active]="currentStep() === 5" [class.completed]="currentStep() > 5">5</div>
            </div>

            <div class="form-content">
              <!-- Loading State -->
              @if (isCalculating()) {
                <div class="calculating-overlay">
                  <div class="loader"></div>
                  <h3>Calculando tu declaración...</h3>
                  <p>Nerea está optimizando tus deducciones</p>
                </div>
              }

              @if (!isCalculating()) {
                <!-- Step 1: Personal Info -->
                @if (currentStep() === 1) {
                  <div class="step-content">
                    <h2>Información Personal</h2>
                    <div class="form-group">
                      <label for="fullName">Nombre Completo</label>
                      <input id="fullName" type="text" [(ngModel)]="formData.fullName" placeholder="Ej: Juan Pérez">
                    </div>
                    <div class="form-group">
                      <label for="maritalStatus">Estado Civil</label>
                      <select id="maritalStatus" [(ngModel)]="formData.maritalStatus">
                        <option value="single">Soltero/a</option>
                        <option value="married">Casado/a</option>
                        <option value="head">Cabeza de Familia</option>
                      </select>
                    </div>
                  </div>
                }

                <!-- Step 2: Income -->
                @if (currentStep() === 2) {
                  <div class="step-content">
                    <h2>Ingresos</h2>
                    <div class="form-group">
                      <label for="annualIncome">Ingresos Anuales (W2)</label>
                      <input id="annualIncome" type="number" [(ngModel)]="formData.annualIncome" placeholder="0.00">
                    </div>
                    <div class="form-group">
                      <label for="otherIncome">Otros Ingresos (1099, etc.)</label>
                      <input id="otherIncome" type="number" [(ngModel)]="formData.otherIncome" placeholder="0.00">
                    </div>
                  </div>
                }

                <!-- Step 3: Deductions -->
                @if (currentStep() === 3) {
                  <div class="step-content">
                    <h2>Deducciones</h2>
                    <div class="form-group">
                      <label for="medicalExpenses">Gastos Médicos</label>
                      <input id="medicalExpenses" type="number" [(ngModel)]="formData.medicalExpenses" placeholder="0.00">
                    </div>
                    <div class="form-group">
                      <label for="charity">Donaciones</label>
                      <input id="charity" type="number" [(ngModel)]="formData.charity" placeholder="0.00">
                    </div>
                  </div>
                }

                <!-- Step 4: Review -->
                @if (currentStep() === 4) {
                  <div class="step-content">
                    <h2>Revisión Final</h2>
                    <div class="review-summary">
                      <p><strong>Nombre:</strong> {{ formData.fullName }}</p>
                      <p><strong>Estado Civil:</strong> {{ formData.maritalStatus }}</p>
                      <p><strong>Ingresos Totales:</strong> {{ (formData.annualIncome || 0) + (formData.otherIncome || 0) | currency }}</p>
                      <p><strong>Deducciones Totales:</strong> {{ (formData.medicalExpenses || 0) + (formData.charity || 0) | currency }}</p>
                    </div>
                  </div>
                }

                <!-- Step 5: Result -->
                @if (currentStep() === 5) {
                  <div class="step-content result-step">
                    <h2>Resultado Estimado</h2>
                    @if (resultData(); as result) {
                      <div class="result-card" [class.refund]="result.refund > 0">
                        <div class="result-icon">
                          <span class="material-symbols-outlined">{{ result.refund > 0 ? 'payments' : 'account_balance_wallet' }}</span>
                        </div>
                        <div class="result-amount">
                          <span class="label">{{ result.refund > 0 ? 'Tu Reembolso Estimado' : 'Impuesto a Pagar' }}</span>
                          <span class="value">{{ (result.refund > 0 ? result.refund : result.taxDue) | currency }}</span>
                        </div>
                      </div>
                    }
                    <div class="result-actions">
                      <button class="btn-next" (click)="currentStep.set(1)">Nueva Declaración</button>
                    </div>
                  </div>
                }
              }
            </div>

            @if (currentStep() < 5 && !isCalculating()) {
              <div class="form-actions">
                @if (currentStep() > 1) {
                  <button class="btn-prev" (click)="prevStep()">Anterior</button>
                }
                <div style="flex: 1"></div>
                <button class="btn-next" (click)="nextStep()">
                  {{ currentStep() === 4 ? 'Calcular Declaración' : 'Siguiente' }}
                </button>
              </div>
            }
          </div>

          <!-- Chatbot Section (Integrated) -->
          <div class="chatbot-section">
            <app-chatbot [embedded]="true"></app-chatbot>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './wizard.component.css'
})
export class WizardComponent {
  currentStep = signal(1);
  isCalculating = signal(false);
  resultData = signal<{ refund: number; taxDue: number } | null>(null);
  formData = {
    fullName: '',
    maritalStatus: 'single',
    annualIncome: null,
    otherIncome: null,
    medicalExpenses: null,
    charity: null
  };

  nextStep() {
    if (this.currentStep() < 4) {
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
