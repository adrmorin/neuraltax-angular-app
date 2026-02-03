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
    templateUrl: './reports.component.html',
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
