import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardHeaderComponent } from '../../components/dashboard/dashboard-header.component';

@Component({
    selector: 'app-agent',
    standalone: true,
    imports: [CommonModule, DashboardHeaderComponent],
    templateUrl: './agent.component.html',
    styleUrl: './agent.component.css'
})
export class AgentComponent {
    stats = [
        { title: 'Total Clientes', value: '87', change: '+12%', icon: 'group', color: '255, 36, 0' },
        { title: 'Ingresos Mensuales', value: '$24,580', change: '+8%', icon: 'payments', color: '255, 36, 0' },
        { title: 'Declaraciones Completadas', value: '43', change: '+15%', icon: 'task_alt', color: '255, 36, 0' },
        { title: 'Índice de Satisfacción', value: '98%', change: '+2%', icon: 'star', color: '255, 36, 0' }
    ];

    upcomingTasks = [
        { title: 'Revisar documentos W2 de María García', dueDate: 'Hoy', icon: 'description', priority: 'urgent' },
        { title: 'Completar declaración de Carlos Rodríguez', dueDate: 'Mañana', icon: 'task', priority: 'high' },
        { title: 'Llamada con nuevo cliente', dueDate: 'En 2 días', icon: 'call', priority: 'normal' }
    ];

    recentActivity = [
        { action: 'Nuevo cliente registrado: Ana Martínez', time: 'Hace 2 horas', icon: 'person_add' },
        { action: 'Declaración enviada al IRS: Juan Pérez', time: 'Hace 4 horas', icon: 'send' },
        { action: 'Documentos recibidos: Laura Sánchez', time: 'Hace 6 horas', icon: 'upload_file' }
    ];
}
