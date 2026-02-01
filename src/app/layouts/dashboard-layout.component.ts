import { Component, signal, computed, inject } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd, Event } from '@angular/router';
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
  portalType = computed(() => {
    const url = this.currentUrl();
    if (url.includes('premium-dashboard')) return 'premium';
    return url.includes('free-dashboard') ? 'free' : 'agent';
  });

  private router = inject(Router);

  constructor() {
    // Set initial URL
    this.currentUrl.set(this.router.url);

    // Listen to route changes
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentUrl.set(event.url);
    });
  }
}
