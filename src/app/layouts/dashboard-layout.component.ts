import { Component, signal, computed } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { SidebarComponent } from '../components/common/sidebar.component';
import { ChatbotComponent } from '../components/chatbot/chatbot.component';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, ChatbotComponent, CommonModule],
  template: `
    <div class="dashboard-container">
      <app-sidebar 
        [isCollapsed]="isCollapsed()" 
        [portalType]="portalType()"
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
  currentUrl = signal('');
  portalType = computed(() =>
    this.currentUrl().includes('free-dashboard') ? 'free' : 'agent'
  );

  constructor(private router: Router) {
    // Set initial URL
    this.currentUrl.set(this.router.url);

    // Listen to route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentUrl.set(event.url);
    });
  }
}
