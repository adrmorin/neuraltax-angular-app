import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DashboardHeaderComponent } from '../components/dashboard/dashboard-header.component';
import { Form1040acComponent } from '../components/forms/form1040aC/form1040aC.component';

@Component({
    selector: 'app-free-dashboard',
    standalone: true,
    imports: [CommonModule, RouterLink, DashboardHeaderComponent, Form1040acComponent],
    templateUrl: './free-dashboard.component.html',
    styleUrl: './free-dashboard.component.css'
})
export class FreeDashboardComponent {
    stats = [
        {
            label: 'Documentos Subidos',
            value: '2',
            total: '/10',
            icon: 'description',
            status: '2/10'
        },
        {
            label: 'Formularios Completados',
            value: '0',
            total: '/1',
            icon: 'task_alt',
            status: 'En Progreso'
        },
        {
            label: 'Reembolso Est.',
            value: '$0',
            total: '',
            icon: 'payments',
            status: 'Estimado'
        }
    ];

    uploadSteps = [
        { text: 'Formularios W-2', completed: true },
        { text: 'Estados de Interés', completed: true },
        { text: 'Recibos y Facturas', completed: false, premium: true }
    ];

    declarationSteps = [
        { text: 'Form 1040 (Principal)', completed: true },
        { text: 'Deducción Estándar', completed: true },
        { text: 'Schedule C (Negocio)', completed: false, premium: true }
    ];

    showForm1040aC = false;

    toggleForm() {
        this.showForm1040aC = !this.showForm1040aC;
    }
}
