import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardHeaderComponent } from '../components/dashboard/dashboard-header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DashboardHeaderComponent],
  template: `
    <div style="padding-bottom: 2rem">
      <!-- Dashboard Header Component -->
      <app-dashboard-header clientType="agent" userName="Agente Neuraltax" />

      <!-- Stats Grid -->
      <div class="stats-grid">
        @for (stat of stats; track stat.title) {
          <div class="stat-card">
            <div class="stat-icon" [style.background]="'rgba(' + stat.color + ', 0.1)'">
              <span class="material-symbols-outlined" [style.color]="'rgb(' + stat.color + ')'">{{ stat.icon }}</span>
            </div>
            <div class="stat-content">
              <span class="stat-value">{{ stat.value }}</span>
              <span class="stat-title">{{ stat.title }}</span>
            </div>
            <span class="stat-change positive">{{ stat.change }}</span>
          </div>
        }
      </div>

      <!-- Main Content Grid -->
      <div class="dashboard-grid">
        <!-- Membership Distribution -->
        <div class="card membership-card">
          <h3>Distribución de Membresías</h3>
          <div class="membership-chart">
            <div class="chart-placeholder">
              <div class="pie-segment free" style="--percent: 35%">Free: 35%</div>
              <div class="pie-segment basic" style="--percent: 40%">Basic: 40%</div>
              <div class="pie-segment premium" style="--percent: 25%">Premium: 25%</div>
            </div>
          </div>
        </div>

        <!-- Upcoming Tasks -->
        <div class="card tasks-card">
          <h3>Tareas Pendientes</h3>
          <ul class="tasks-list">
            @for (task of upcomingTasks; track task.title) {
              <li class="task-item" [class]="task.priority">
                <span class="material-symbols-outlined">{{ task.icon }}</span>
                <div class="task-content">
                  <strong>{{ task.title }}</strong>
                  <span>{{ task.dueDate }}</span>
                </div>
              </li>
            }
          </ul>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="card activity-card">
        <h3>Actividad Reciente</h3>
        <ul class="activity-list">
          @for (activity of recentActivity; track activity.action) {
            <li class="activity-item">
              <span class="material-symbols-outlined">{{ activity.icon }}</span>
              <div class="activity-content">
                <strong>{{ activity.action }}</strong>
                <span>{{ activity.time }}</span>
              </div>
            </li>
          }
        </ul>
      </div>
    </div>
  `,
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  stats = [
    { title: 'Total Clientes', value: '87', change: '+12%', icon: 'group', color: '104, 128, 113' },
    { title: 'Ingresos Mensuales', value: '$24,580', change: '+8%', icon: 'payments', color: '104, 128, 113' },
    { title: 'Declaraciones Completadas', value: '43', change: '+15%', icon: 'task_alt', color: '104, 128, 113' },
    { title: 'Índice de Satisfacción', value: '98%', change: '+2%', icon: 'star', color: '104, 128, 113' }
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
