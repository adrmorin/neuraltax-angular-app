import { Component, OnDestroy, OnInit, inject, PLATFORM_ID, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { fromEvent, Subscription, timer } from 'rxjs';
import { map, pairwise, share, throttleTime } from 'rxjs/operators';
import { ModalService } from '../../services/modal.service';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserProfileMenuComponent } from './user-profile-menu/user-profile-menu.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, TranslateModule, UserProfileMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
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
    return this.translate.instant('AUTH.USER');
  }

  isProfileMenuOpen = false;
  private menuTimeout: ReturnType<typeof setTimeout> | null = null;

  toggleProfileMenu() {
    if (this.menuTimeout) clearTimeout(this.menuTimeout);
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  cancelMenuClose() {
    if (this.menuTimeout) clearTimeout(this.menuTimeout);
  }

  closeProfileMenu() {
    if (this.menuTimeout) clearTimeout(this.menuTimeout);
    this.menuTimeout = setTimeout(() => {
      this.isProfileMenuOpen = false;
    }, 500); // 500ms delay
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

