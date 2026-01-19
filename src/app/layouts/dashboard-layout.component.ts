import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../components/common/sidebar.component';
import { ChatbotComponent } from '../components/chatbot/chatbot.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-dashboard-layout',
    standalone: true,
    imports: [RouterOutlet, SidebarComponent, ChatbotComponent, CommonModule],
    template: `
    <div class="dashboard-container">
      <app-sidebar 
        [isCollapsed]="isCollapsed()" 
        (isCollapsedChange)="isCollapsed.set($event)" 
      />
      <main class="main-content" [class.sidebar-collapsed]="isCollapsed()">
        <router-outlet />
      </main>
      <app-chatbot />
    </div>
  `,
    styles: []
})
export class DashboardLayoutComponent {
    isCollapsed = signal(false);
}
