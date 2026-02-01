import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface AiTool {
    id: string;
    title: string;
    description: string;
    icon: string;
    iconColor: string;
    badge?: string;
    badgeColor?: string;
}

export interface AiPerformanceMetric {
    label: string;
    value: string;
    sublabel: string;
}

@Component({
    selector: 'app-ai-tools',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="ai-tools-container">
        <!-- Header -->
        <div class="ai-tools-header">
            <div class="header-left">
                <div class="header-icon">
                    <span class="material-symbols-outlined">psychology</span>
                </div>
                <div class="header-text">
                    <h2 class="header-title">Herramientas IA para Agentes</h2>
                    <p class="header-subtitle">Herramientas IA potentes para hacer crecer y optimizar tu práctica</p>
                </div>
            </div>
            <div class="header-badge">
                <span class="material-symbols-outlined">auto_awesome</span>
                Impulsado por IA
            </div>
        </div>

        <!-- Tools Grid -->
        <div class="ai-tools-grid">
            @for (tool of aiTools; track tool.id) {
                <div class="ai-tool-card">
                    <div class="tool-header">
                        <div class="tool-icon" [style.color]="tool.iconColor">
                            <span class="material-symbols-outlined">{{ tool.icon }}</span>
                        </div>
                        <div class="tool-info">
                            <h3 class="tool-title">{{ tool.title }}</h3>
                            <p class="tool-description">{{ tool.description }}</p>
                        </div>
                        @if (tool.badge) {
                            <span class="tool-badge" [style.background]="tool.badgeColor">{{ tool.badge }}</span>
                        }
                    </div>
                    <button class="tool-action-btn" (click)="onExecuteAnalysis(tool.id)">
                        <span class="material-symbols-outlined">auto_awesome</span>
                        Ejecutar Análisis
                    </button>
                </div>
            }
        </div>

        <!-- Performance Summary -->
        <div class="performance-summary">
            <div class="summary-header">
                <div class="summary-icon">
                    <span class="material-symbols-outlined">insights</span>
                </div>
                <h3 class="summary-title">Resumen de Rendimiento IA</h3>
            </div>
            <div class="summary-metrics">
                @for (metric of performanceMetrics; track metric.label) {
                    <div class="metric-item">
                        <span class="metric-label">{{ metric.label }}</span>
                        <span class="metric-value">{{ metric.value }}</span>
                        <span class="metric-sublabel">{{ metric.sublabel }}</span>
                    </div>
                }
            </div>
        </div>
    </div>
    `,
    styleUrl: './ai-tools.component.css'
})
export class AiToolsComponent {
    @Input() showHeader = true;

    aiTools: AiTool[] = [
        {
            id: 'risk-analysis',
            title: 'Análisis de Riesgo de Clientes',
            description: 'IA identifica clientes en riesgo de auditoría o que necesitan atención inmediata',
            icon: 'warning',
            iconColor: '#dc2626',
            badge: '3 clientes marcados',
            badgeColor: 'rgba(30, 41, 59, 0.1)'
        },
        {
            id: 'income-optimization',
            title: 'Optimización de Ingresos',
            description: 'IA sugiere precios óptimos y paquetes de servicios para cada cliente',
            icon: 'trending_up',
            iconColor: '#688071',
            badge: '+$2,400 potencial',
            badgeColor: 'rgba(104, 128, 113, 0.15)'
        },
        {
            id: 'client-matching',
            title: 'Emparejamiento Inteligente de Clientes',
            description: 'IA empareja clientes prospectivos con tu experiencia y capacidad',
            icon: 'groups',
            iconColor: '#688071',
            badge: '5 coincidencias',
            badgeColor: 'rgba(104, 128, 113, 0.15)'
        },
        {
            id: 'performance-forecast',
            title: 'Pronóstico de Rendimiento',
            description: 'IA predice el rendimiento de tu práctica y sugiere estrategias de crecimiento',
            icon: 'analytics',
            iconColor: '#688071',
            badge: '+18% proyectado',
            badgeColor: 'rgba(104, 128, 113, 0.15)'
        },
        {
            id: 'task-prioritization',
            title: 'Priorización de Tareas IA',
            description: 'Ordenación inteligente de tareas basada en fechas límite, impacto y necesidades del cliente',
            icon: 'checklist',
            iconColor: '#688071',
            badge: '12 tareas reordenadas',
            badgeColor: 'rgba(30, 41, 59, 0.1)'
        },
        {
            id: 'deduction-scanner',
            title: 'Escáner Masivo de Deducciones',
            description: 'IA escanea todas las carteras de clientes para oportunidades de deducción perdidas',
            icon: 'search',
            iconColor: '#688071',
            badge: '$18K en ahorros encontrados',
            badgeColor: 'rgba(104, 128, 113, 0.15)'
        }
    ];

    performanceMetrics: AiPerformanceMetric[] = [
        { label: 'Tiempo Ahorrado', value: '23.5 horas', sublabel: 'Este mes' },
        { label: 'Ingresos Adicionales', value: '$4,850', sublabel: 'De insights IA' },
        { label: 'Satisfacción del Cliente', value: '+12%', sublabel: 'Desde usar IA' }
    ];

    onExecuteAnalysis(toolId: string): void {
        console.log(`Executing analysis for tool: ${toolId}`);
        // This can be extended to emit an event or call a service
    }
}
