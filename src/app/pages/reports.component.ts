import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Interfaces for report data
export interface MonthlyData {
    month: string;
    clients: number;
    income: number;
}

export interface MembershipData {
    type: string;
    count: number;
    percentage: number;
    color: string;
}

export interface WeeklyTaskData {
    week: string;
    completed: number;
}

@Component({
    selector: 'app-reports',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="reports-container">
        <!-- Header -->
        <div class="reports-header">
            <div class="header-text">
                <h1 class="reports-title">Reportes y Análisis</h1>
                <p class="reports-subtitle">Visualiza el rendimiento de tu práctica</p>
            </div>
            <button class="export-btn" (click)="exportReport()">
                <span class="material-symbols-outlined">download</span>
                Exportar Reporte
            </button>
        </div>

        <!-- Main Chart - Income & Client Growth -->
        <div class="chart-card main-chart">
            <div class="chart-header">
                <div>
                    <h3 class="chart-title">Ingresos y Crecimiento de Clientes</h3>
                    <p class="chart-subtitle">Últimos 6 meses</p>
                </div>
                <button class="expand-btn">
                    <span class="material-symbols-outlined">open_in_full</span>
                </button>
            </div>
            <div class="line-chart-container">
                <!-- SVG Line Chart -->
                <svg viewBox="0 0 600 250" class="line-chart">
                    <!-- Grid Lines -->
                    <g class="grid-lines">
                        @for (i of [0, 1, 2, 3, 4]; track i) {
                            <line 
                                [attr.x1]="60" 
                                [attr.y1]="30 + (i * 45)" 
                                [attr.x2]="580" 
                                [attr.y2]="30 + (i * 45)" 
                                stroke="#e2e8f0" 
                                stroke-dasharray="4,4"/>
                        }
                    </g>
                    
                    <!-- Y Axis Labels (Income) -->
                    <g class="y-axis-labels">
                        @for (label of incomeLabels; track label.value; let i = $index) {
                            <text [attr.x]="55" [attr.y]="35 + (i * 45)" text-anchor="end" class="axis-label">
                                {{ label.text }}
                            </text>
                        }
                    </g>
                    
                    <!-- Y Axis Labels Right (Clients) -->
                    <g class="y-axis-labels-right">
                        @for (label of clientLabels; track label.value; let i = $index) {
                            <text [attr.x]="585" [attr.y]="35 + (i * 45)" text-anchor="start" class="axis-label">
                                {{ label.text }}
                            </text>
                        }
                    </g>
                    
                    <!-- X Axis Labels -->
                    <g class="x-axis-labels">
                        @for (data of monthlyData; track data.month; let i = $index) {
                            <text [attr.x]="90 + (i * 90)" [attr.y]="235" text-anchor="middle" class="axis-label">
                                {{ data.month }}
                            </text>
                        }
                    </g>
                    
                    <!-- Income Line (green) -->
                    <polyline 
                        [attr.points]="getIncomeLinePoints()"
                        fill="none" 
                        stroke="#688071" 
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"/>
                    
                    <!-- Clients Line (darker green) -->
                    <polyline 
                        [attr.points]="getClientsLinePoints()"
                        fill="none" 
                        stroke="#1e293b" 
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"/>
                    
                    <!-- Data Points - Income -->
                    @for (data of monthlyData; track data.month; let i = $index) {
                        <circle 
                            [attr.cx]="90 + (i * 90)" 
                            [attr.cy]="getIncomeY(data.income)"
                            r="5" 
                            fill="#688071"/>
                    }
                    
                    <!-- Data Points - Clients -->
                    @for (data of monthlyData; track data.month; let i = $index) {
                        <circle 
                            [attr.cx]="90 + (i * 90)" 
                            [attr.cy]="getClientsY(data.clients)"
                            r="5" 
                            fill="#1e293b"/>
                    }
                </svg>
                
                <!-- Legend -->
                <div class="chart-legend">
                    <div class="legend-item">
                        <span class="legend-dot clients"></span>
                        <span>Clientes</span>
                    </div>
                    <div class="legend-item">
                        <span class="legend-dot income"></span>
                        <span>Ingresos ($)</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bottom Charts Grid -->
        <div class="charts-grid">
            <!-- Pie Chart - Membership Distribution -->
            <div class="chart-card">
                <h3 class="chart-title">Distribución de Membresías</h3>
                <p class="chart-subtitle">Total: {{ getTotalClients() }} clientes</p>
                <div class="pie-chart-container">
                    <svg viewBox="0 0 200 200" class="pie-chart">
                        <!-- Pie segments -->
                        @for (segment of pieSegments; track segment.type; let i = $index) {
                            <circle
                                cx="100"
                                cy="100"
                                r="70"
                                fill="transparent"
                                [attr.stroke]="segment.color"
                                stroke-width="40"
                                [attr.stroke-dasharray]="getSegmentDashArray(segment.percentage)"
                                [attr.stroke-dashoffset]="getSegmentOffset(i)"
                                transform="rotate(-90 100 100)"/>
                        }
                    </svg>
                    <div class="pie-labels">
                        @for (data of membershipData; track data.type) {
                            <div class="pie-label-item">
                                <span class="label-dot" [style.background]="data.color"></span>
                                <span class="label-text">{{ data.type }}: {{ data.percentage }}%</span>
                            </div>
                        }
                    </div>
                </div>
            </div>

            <!-- Bar Chart - Tasks Completed -->
            <div class="chart-card">
                <h3 class="chart-title">Tareas Completadas</h3>
                <p class="chart-subtitle">Por semana (Noviembre)</p>
                <div class="bar-chart-container">
                    <svg viewBox="0 0 280 180" class="bar-chart">
                        <!-- Y Axis Labels -->
                        <g class="y-axis">
                            @for (val of [80, 60, 40, 20, 0]; track val; let i = $index) {
                                <text [attr.x]="25" [attr.y]="25 + (i * 35)" text-anchor="end" class="axis-label">
                                    {{ val }}
                                </text>
                                <line 
                                    x1="30" 
                                    [attr.y1]="20 + (i * 35)" 
                                    x2="270" 
                                    [attr.y2]="20 + (i * 35)" 
                                    stroke="#e2e8f0" 
                                    stroke-dasharray="2,2"/>
                            }
                        </g>
                        
                        <!-- Bars -->
                        @for (data of weeklyTaskData; track data.week; let i = $index) {
                            <rect 
                                [attr.x]="45 + (i * 55)" 
                                [attr.y]="160 - (data.completed * 1.75)"
                                width="35" 
                                [attr.height]="data.completed * 1.75"
                                fill="#688071"
                                rx="4"/>
                        }
                    </svg>
                </div>
            </div>
        </div>
    </div>
    `,
    styleUrl: './reports.component.css'
})
export class ReportsComponent {
    // Monthly data for line chart (last 6 months)
    monthlyData: MonthlyData[] = [
        { month: 'Jul', clients: 72, income: 18500 },
        { month: 'Ago', clients: 75, income: 19200 },
        { month: 'Sep', clients: 79, income: 21000 },
        { month: 'Oct', clients: 82, income: 22500 },
        { month: 'Nov', clients: 85, income: 24100 },
        { month: 'Dic', clients: 87, income: 25800 }
    ];

    // Membership distribution
    membershipData: MembershipData[] = [
        { type: 'VIP', count: 23, percentage: 26, color: '#688071' },
        { type: 'Premium', count: 38, percentage: 44, color: '#94a3b8' },
        { type: 'Free', count: 26, percentage: 30, color: '#cbd5e1' }
    ];

    // Weekly tasks completed
    weeklyTaskData: WeeklyTaskData[] = [
        { week: 'Sem 1', completed: 42 },
        { week: 'Sem 2', completed: 58 },
        { week: 'Sem 3', completed: 51 },
        { week: 'Sem 4', completed: 67 }
    ];

    // Y-axis labels for income
    incomeLabels = [
        { value: 26000, text: '26000' },
        { value: 19500, text: '19500' },
        { value: 13000, text: '13000' },
        { value: 6500, text: '6500' },
        { value: 0, text: '0' }
    ];

    // Y-axis labels for clients
    clientLabels = [
        { value: 100, text: '100' },
        { value: 75, text: '75' },
        { value: 50, text: '50' },
        { value: 25, text: '25' },
        { value: 0, text: '0' }
    ];

    // Pie chart segments for SVG
    pieSegments = this.membershipData;

    getTotalClients(): number {
        return this.membershipData.reduce((sum, m) => sum + m.count, 0);
    }

    getIncomeY(income: number): number {
        const maxIncome = 26000;
        const chartHeight = 180;
        const topPadding = 30;
        return topPadding + chartHeight - (income / maxIncome) * chartHeight;
    }

    getClientsY(clients: number): number {
        const maxClients = 100;
        const chartHeight = 180;
        const topPadding = 30;
        return topPadding + chartHeight - (clients / maxClients) * chartHeight;
    }

    getIncomeLinePoints(): string {
        return this.monthlyData
            .map((d, i) => `${90 + (i * 90)},${this.getIncomeY(d.income)}`)
            .join(' ');
    }

    getClientsLinePoints(): string {
        return this.monthlyData
            .map((d, i) => `${90 + (i * 90)},${this.getClientsY(d.clients)}`)
            .join(' ');
    }

    getSegmentDashArray(percentage: number): string {
        const circumference = 2 * Math.PI * 70;
        const segmentLength = (percentage / 100) * circumference;
        return `${segmentLength} ${circumference - segmentLength}`;
    }

    getSegmentOffset(index: number): number {
        const circumference = 2 * Math.PI * 70;
        let offset = 0;
        for (let i = 0; i < index; i++) {
            offset += (this.membershipData[i].percentage / 100) * circumference;
        }
        return -offset;
    }

    exportReport(): void {
        console.log('Exporting report...');
        // TODO: Implement export functionality (PDF/Excel)
        alert('Funcionalidad de exportación en desarrollo');
    }
}
