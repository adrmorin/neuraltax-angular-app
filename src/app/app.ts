import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ModalService } from './services/modal.service';
import { LoginComponent } from './pages/login/login.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, CommonModule],
  template: `
    <router-outlet />
    
    <!-- Global Login Modal Overlay -->
    @if (modalService.isLoginVisible()) {
      <div class="modal-overlay" 
           (click)="modalService.closeLogin()" 
           (keydown.escape)="modalService.closeLogin()"
           (keyup.enter)="modalService.closeLogin()"
           tabindex="0"
           role="dialog"
           aria-modal="true">
        <div class="modal-content" (click)="$event.stopPropagation()" (keydown.enter)="$event.stopPropagation()" role="document">
          <app-login />
        </div>
      </div>
    }
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.3); /* 30% Transparency / 30% Black */
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000; /* Extremely high to cover everything */
      animation: fadeIn 0.2s ease-in-out;
    }

    .modal-content {
      width: 100%;
      max-width: 400px;
      display: flex;
      justify-content: center;
      padding: 20px;
      outline: none;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `]
})
export class App implements OnInit {
  private auth = inject(AuthService);
  public modalService = inject(ModalService);

  ngOnInit() {
    this.auth.checkLoginStatus();
  }
}
