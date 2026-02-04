import { Component, OnDestroy, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { fromEvent, Subscription, timer } from 'rxjs';
import { map, pairwise, share, throttleTime } from 'rxjs/operators';
import { ModalService } from '../../services/modal.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <header class="glass-header" [class.hidden]="isHidden">
      <div class="container">
        <div class="logo">
          <img src="assets/neuraltax_logo.png" alt="NeuralTax AI" style="max-height: 55px; width: auto; display: block; padding: 5px 0;" />
        </div>
        <nav>
          <ul>
            <li><a routerLink="/free-dashboard" class="btn btn-tier btn-free">Free</a></li>
            <li><a routerLink="/premium-dashboard" class="btn btn-tier btn-premium">Premium</a></li>
            <li><a routerLink="/premium-dashboard" class="btn btn-tier btn-vip">VIP</a></li>
            <li><a routerLink="/agent" class="btn btn-tier btn-agente">Agente</a></li>
            
            @if (authService.currentUser(); as user) {
              <li><a [routerLink]="authService.currentUserDashboard()" class="btn btn-dashboard">Dashboard</a></li>
              <li class="user-profile">
                <div class="user-avatar-container">
                  <img src="assets/nerea_avatar.png" alt="User Profile" class="user-avatar" />
                  <span class="status-indicator"></span>
                </div>
              </li>
            } @else {
              <li><button (click)="modalService.openLogin()" class="btn btn-login">Login</button></li>
            }
          </ul>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    /* Header transition for hiding */
    .glass-header {
      transition: transform 0.3s ease-in-out;
    }
    
    .glass-header.hidden {
      transform: translateY(-100%);
    }

    .btn-tier {
      padding: 0.5rem 1.25rem !important;
      border-radius: 8px !important;
      font-weight: 600 !important;
      font-size: 0.9rem !important;
      transition: all 0.3s ease !important;
      border: 2px solid transparent !important;
      text-decoration: none;
      display: inline-block;
    }

    .btn-free {
      background-color: #9ca3af !important;
      color: white !important;
    }

    .btn-free:hover {
      background-color: #6b7280 !important;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(156, 163, 175, 0.3);
    }

    .btn-premium {
      background-color: var(--brand-blue) !important;
      color: white !important;
    }

    .btn-premium:hover {
      background-color: #172554 !important; /* Solid darker blue */
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(30, 58, 138, 0.4);
    }

    .btn-agente {
      background-color: #064e4b !important;
      color: white !important;
      border: 2px solid rgba(255, 255, 255, 0.2) !important;
    }

    .btn-agente:hover {
      background-color: #0d9488 !important;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(13, 148, 136, 0.4);
    }

    .btn-vip {
      background: #000000 !important;
      color: white !important;
      border: 2px solid rgba(255, 255, 255, 0.2) !important;
    }

    .btn-vip:hover {
      background: #1e293b !important;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    }

    .btn-login {
      background-color: transparent !important;
      color: white !important;
      border: 2px solid white !important;
      text-decoration: none;
    }

    .btn-login:hover {
      background-color: white !important;
      color: #1e293b !important;
      transform: translateY(-2px);
    }

    .btn-dashboard {
      background-color: #9ca3af !important; /* Matched with Free button gray */
      color: white !important;
      padding: 0.6rem 1.4rem !important;
      border-radius: 8px !important;
      font-weight: 700 !important;
      font-size: 0.9rem !important;
      transition: all 0.3s ease !important;
      border: none !important;
      display: inline-block;
      text-decoration: none;
    }

    .btn-dashboard:hover {
      background-color: #6b7280 !important;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(156, 163, 175, 0.3);
    }

    .user-profile {
      display: flex;
      align-items: center;
      margin-left: 1rem;
    }

    .user-avatar-container {
      position: relative;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 2px solid var(--accent-green-bright);
      padding: 2px;
      background: rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: transform 0.3s ease;
    }

    .user-avatar-container:hover {
      transform: scale(1.1);
    }

    .user-avatar {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }

    .status-indicator {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 10px;
      height: 10px;
      background-color: #22c55e;
      border: 2px solid #0f172a;
      border-radius: 50%;
    }
  `]
})
export class HeaderComponent implements OnInit, OnDestroy {
  isHidden = false;
  private scrollSub: Subscription | null = null;
  private inactivitySub: Subscription | null = null;
  private readonly HIDE_DELAY = 180000; // 3 minutes in ms
  private platformId = inject(PLATFORM_ID);
  public modalService = inject(ModalService);
  public authService = inject(AuthService);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.startInactivityTimer();
      this.initScrollListener();
    }
  }

  ngOnDestroy() {
    this.scrollSub?.unsubscribe();
    this.inactivitySub?.unsubscribe();
  }

  private startInactivityTimer() {
    this.resetInactivityTimer();
  }

  private resetInactivityTimer() {
    this.inactivitySub?.unsubscribe();
    // Start timer to hide header after HIDE_DELAY
    this.inactivitySub = timer(this.HIDE_DELAY).subscribe(() => {
      this.isHidden = true;
    });
  }

  private initScrollListener() {
    const scroll$ = fromEvent(window, 'scroll').pipe(
      throttleTime(10), // Reduced throttling for smoother feel
      map(() => window.scrollY),
      pairwise(),
      share()
    );

    this.scrollSub = scroll$.subscribe(([y1, y2]) => {
      // If scrolling UP (y2 < y1) and header is hidden, show it
      if (y2 < y1 && this.isHidden) {
        this.isHidden = false;
        this.resetInactivityTimer(); // Restart the cycle
      }
      // Note: We deliberately DO NOT hide on scroll down based on user request.
      // The requirement is: Hide after 3 mins -> Show when scrolling up with mouse -> Repeat cycle.

      // However, any interaction usually resets inactivity. 
      // User said "vuelve al mismo ciclo de los tres minutos".
      // So if I scroll up and it shows, the timer resets. 
    });
  }
}

