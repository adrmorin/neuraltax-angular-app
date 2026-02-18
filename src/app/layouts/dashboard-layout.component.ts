import { Component, signal, computed, inject } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd, Event } from '@angular/router';
import { SidebarComponent } from '../components/common/sidebar.component';
import { ChatbotComponent } from '../components/chatbot/chatbot.component';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { ValidateModalComponent } from '../components/common/validate-modal.component';
import { ModalService } from '../services/modal.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, ChatbotComponent, CommonModule, ValidateModalComponent],
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
      <app-validate-modal />
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
  private modalService = inject(ModalService);
  private authService = inject(AuthService);

  constructor() {
    // Set initial URL
    this.currentUrl.set(this.router.url);

    // Listen to route changes
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentUrl.set(event.url);
      this.checkValidation();
    });

    // Initial check
    this.checkValidation();
  }

  checkValidation() {
    // Check if user is validated (Validation Logic)
    const user = this.authService.currentUser();
    // Only check if user is logged in (implicit by being in dashboard layout, but good to be safe)
    if (user && !user.isValidated) {
      // Prevent opening if already on validate page (if we were using a page), but we are using a modal.
      // We should open the modal.
      this.modalService.openValidate();
    }
  }
}
