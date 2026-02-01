import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DashboardHeaderComponent } from '../components/dashboard/dashboard-header.component';
import { TaxDataService } from '../services/tax-data.service';

@Component({
    selector: 'app-premium-dashboard',
    standalone: true,
    imports: [CommonModule, RouterLink, DashboardHeaderComponent],
    templateUrl: './premium-dashboard.component.html',
    styleUrl: './premium-dashboard.component.css'
})
export class PremiumDashboardComponent {
    private taxDataService = inject(TaxDataService);

    premiumStats = [
        {
            label: 'Eficiencia Fiscal',
            value: '94%',
            icon: 'insights',
            trend: '+12%',
            description: 'Basado en deducciones optimizadas por Nerea'
        },
        {
            label: 'Ahorro Potencial',
            value: '$4,250',
            icon: 'savings',
            trend: 'Optimizado',
            description: 'Créditos fiscales identificados'
        },
        {
            label: 'Riesgo de Auditoría',
            value: 'Bajo',
            icon: 'verified_user',
            trend: 'Certificado',
            description: 'Análisis de "Red Flags" completado'
        }
    ];

    aiModules = [
        {
            title: 'Auditor de IA en Tiempo Real',
            description: 'Nerea analiza cada entrada para asegurar el cumplimiento con las normativas del IRS de 2026.',
            icon: 'biotech',
            action: 'Iniciar Escaneo'
        },
        {
            title: 'Optimizador de Deducciones',
            description: 'Algoritmos avanzados que buscan deducciones específicas para su sector industrial.',
            icon: 'auto_awesome',
            action: 'Optimizar'
        },
        {
            title: 'Estrategia de Oasis Fiscal',
            description: 'Planificación proactiva para el próximo trimestre basada en sus gastos actuales.',
            icon: 'area_chart',
            action: 'Ver Estrategia'
        }
    ];

    priorityTasks = [
        { text: 'Validación de Anexo C (Business)', status: 'completado' },
        { text: 'Análisis de Crédito por Energía Limpia', status: 'pendiente' },
        { text: 'Sincronización de Gastos Digitales', status: 'pendiente' }
    ];
}
