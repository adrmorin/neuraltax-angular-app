import { Component, OnDestroy, OnInit, inject, PLATFORM_ID, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { fromEvent, Subscription, timer } from 'rxjs';
import { map, pairwise, share, throttleTime } from 'rxjs/operators';
import { ModalService } from '../../services/modal.service';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, TranslateModule],
  template: `
    <header class="glass-header" [class.hidden]="isHidden">
      <div class="container">
        <div class="logo">
          <img src="assets/neuraltax_logo.png" alt="NeuralTax AI" style="max-height: 55px; width: auto; display: block; padding: 5px 0;" />
        </div>
        <nav>
          <ul>

            @if (minimal) {
              <li>
                <a routerLink="/home" class="back-home-link">
                  <span class="material-symbols-outlined">home</span>
                  {{ 'HEADER.BACK_TO_HOME' | translate }}
                </a>
              </li>
            }

            @if (!minimal) {
              <!-- Theme Toggle MOVED UP -->
              <li class="theme-switcher">
                <button class="btn btn-theme" (click)="themeService.toggleTheme()" [title]="themeService.theme() === 'dark' ? 'Switch to Light' : 'Switch to Dark'">
                  <span class="material-symbols-outlined">
                    {{ themeService.theme() === 'dark' ? 'light_mode' : 'dark_mode' }}
                  </span>
                </button>
              </li>

              <li><a routerLink="/free-dashboard" class="btn btn-tier btn-free">{{ 'COMMON.FREE' | translate }}</a></li>
              <li><a routerLink="/premium-dashboard" class="btn btn-tier btn-premium">{{ 'COMMON.PREMIUM' | translate }}</a></li>

              <li class="lang-switcher">
                <button class="btn btn-lang" (click)="switchLanguage(currentLang === 'es' ? 'en' : 'es')">
                  <span class="material-symbols-outlined">public</span>
                  <span class="lang-text">{{ currentLang | uppercase }}</span>
                </button>
              </li>
            }
            
            @if (authService.currentUser(); as user) {
              @if (!minimal) {
                <li><a [routerLink]="authService.currentUserDashboard()" class="btn btn-dashboard">{{ 'HEADER.DASHBOARD' | translate }}</a></li>
              }
              <li class="user-profile">
                <span class="user-name">
                  {{ getUserDisplayName(user) }}
                </span>
                <div class="user-avatar-container">
                  <img src="assets/nerea_avatar.png" alt="User Profile" class="user-avatar" />
                  <span class="status-indicator"></span>
                </div>
                <button (click)="logout()" class="btn btn-logout" title="Cerrar Sesión">
                  <span class="material-symbols-outlined">logout</span>
                </button>
              </li>
            } @else {
              @if (!minimal) {
                <li><button (click)="modalService.openLogin()" class="btn btn-login">{{ 'HEADER.LOGIN' | translate }}</button></li>
              }
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
      background: var(--bg-dark-deep) !important;
      position: sticky;
      top: 0;
      z-index: 9999;
    }
    
    .glass-header.hidden {
      transform: translateY(-100%);
    }

    nav ul {
      gap: 1.5rem !important;
      flex-wrap: nowrap;
    }

    .btn-theme {
      background: transparent !important;
      border: none !important;
      color: #4ade80 !important;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 50%;
      display: flex !important;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      min-width: 40px;
      min-height: 40px;
    }

    .btn-theme:hover {
      background: rgba(74, 222, 128, 0.1) !important;
    }

    .btn-theme .material-symbols-outlined {
      font-size: 1.5rem !important;
      transition: transform 0.3s ease, color 0.3s ease;
      color: #4ade80 !important;
    }

    .btn-theme:hover .material-symbols-outlined {
      transform: rotate(15deg) scale(1.1);
      color: #22c55e !important;
    }

    .back-home-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: white;
      text-decoration: none;
      font-weight: 500;
      font-size: 0.95rem;
      transition: all 0.3s ease;
    }

    .back-home-link:hover {
      color: #166534;
      transform: translateX(-4px);
    }

    .back-home-link span {
      font-size: 1.1rem;
    }

    .user-name {
      margin-right: 1rem;
      font-weight: 600;
      color: white;
      font-size: 0.9rem;
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
      gap: 0.75rem;
    }

    .user-name {
      font-weight: 600;
      color: white;
      font-size: 0.95rem;
      white-space: nowrap;
    }

    .btn-logout {
      background-color: transparent !important;
      color: #ef4444 !important;
      border: 1px solid rgba(239, 68, 68, 0.3) !important;
      padding: 0.5rem !important;
      border-radius: 8px !important;
      cursor: pointer !important;
      transition: all 0.3s ease !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      min-width: 40px;
      min-height: 40px;
    }

    .btn-logout:hover {
      background-color: rgba(239, 68, 68, 0.1) !important;
      border-color: #ef4444 !important;
      transform: translateY(-2px);
    }

    .btn-logout .material-symbols-outlined {
      font-size: 1.2rem !important;
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

    .btn-lang {
      background-color: transparent !important;
      color: white !important;
      display: flex !important;
      align-items: center !important;
      gap: 0.4rem !important;
      padding: 0.5rem 0.8rem !important;
      border-radius: 8px !important;
      font-weight: 700 !important;
      font-size: 0.85rem !important;
      border: 1px solid rgba(255, 255, 255, 0.2) !important;
      cursor: pointer !important;
      transition: all 0.3s ease !important;
    }

    .btn-lang:hover {
      background-color: rgba(255, 255, 255, 0.1) !important;
      border-color: var(--accent-green-bright) !important;
    }

    .btn-lang .material-symbols-outlined {
      font-size: 1.2rem !important;
      color: var(--accent-green-bright) !important;
    }

    .logo img {
      /* High contrast faint green almost white */
      filter: brightness(0) invert(1) sepia(0.1) saturate(500%) hue-rotate(70deg) brightness(1.2);
    }
  `]
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() minimal = false;
  isHidden = false;
  private scrollSub: Subscription | null = null;
  private inactivitySub: Subscription | null = null;
  private readonly HIDE_DELAY = 180000; // 3 minutes in ms
  private platformId = inject(PLATFORM_ID);
  public modalService = inject(ModalService);
  public authService = inject(AuthService);
  public themeService = inject(ThemeService);
  private translate = inject(TranslateService);

  get currentLang(): string {
    return this.translate.currentLang || this.translate.defaultLang || 'es';
  }

  getUserDisplayName(user: { firstName?: string; lastName?: string; email?: string }): string {
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    if (user.firstName) {
      return user.firstName;
    }
    if (user.email) {
      return user.email.split('@')[0];
    }
    return 'Usuario';
  }

  logout(): void {
    this.authService.logout();
    console.log('👋 Sesión cerrada');
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
  }

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

