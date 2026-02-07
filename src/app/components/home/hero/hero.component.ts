import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeroSliderComponent } from '../hero-slider/hero-slider.component';
import { ModalService } from '../../../services/modal.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home-hero',
  standalone: true,
  imports: [RouterLink, CommonModule, HeroSliderComponent, TranslateModule],
  template: `
    <section class="home-hero">
      <div class="hero-grid">
        <div class="support-text-block">
          <h3>{{ 'HOME.HERO.SPECIALIZED_SUPPORT' | translate }}</h3>
          <p>{{ 'HOME.HERO.SUPPORT_DESC' | translate }}</p>
          
          <!-- Animated Text Block -->
          <div class="animated-text-carousel">
            <div class="carousel-item">
              <p class="carousel-message" [innerHTML]="messages[currentMessageIndex()]"></p>
            </div>
          </div>
        </div>

        <!-- LEFT COLUMN: Slider -->
        <div class="hero-visual-col">
          <div class="slider-container">
             <app-hero-slider />
          </div>
        </div>

        <!-- RIGHT COLUMN: Main Content -->
        <div class="hero-content-col">
          <div class="hero-text-content">
            <div class="logo-area">
               <img src="assets/neuraltax_logo.png" alt="Neuraltax AI Expert" class="hero-brand-logo" />
            </div>
            
            <h1 class="main-slogan" [innerHTML]="'HOME.HERO.MAIN_SLOGAN' | translate"></h1>
            
            <div class="sub-slogan-block">
              <h2 class="sub-headline">{{ 'HOME.HERO.MAXIMIZE_SAVINGS' | translate }}</h2>
              <p class="sub-description" [innerHTML]="'HOME.HERO.AI_OPTIMIZATION_DESC' | translate"></p>
              <p class="value-prop" [innerHTML]="'HOME.HERO.VALUE_PROP' | translate"></p>
            </div>

            <div class="hero-actions">
              <a routerLink="/wizard" class="btn btn-estimate">
                <span class="material-symbols-outlined icon-flame">local_fire_department</span>
                {{ 'HOME.HERO.GET_ESTIMATE' | translate }}
              </a>
              <button (click)="modalService.openPlans()" class="btn btn-login-hero">
                <span>{{ 'HOME.HERO.UPDATE' | translate }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .home-hero {
      padding-top: 2rem;
      padding-left: 0;
      padding-right: 0;
      padding-bottom: 0;
      background: linear-gradient(135deg, #e0faff 0%, #f0fff4 100%);
      height: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .hero-grid {
      position: relative;
      display: grid;
      grid-template-columns: 1fr 1fr; /* Balanced columns */
      gap: 4rem;
      width: 100%;
      padding-right: 10%;
      padding-left: 0;
      align-items: center; 
    }

    /* LEFT COL */
    .hero-visual-col {
      display: flex;
      flex-direction: column;
      position: relative;
      height: 100%;
      min-height: 500px;
      justify-content: center;
      padding: 0;
      margin: 0;
    }

    .slider-container {
      width: 100%;
      height: 100%; 
      z-index: 0;
      position: relative;
      padding: 0;
      margin: 0;
    }
    
    .support-text-block {
      /* Position custom */
      position: absolute;
      top: 22%;
      left: 25%;
      /* transform: translate(-50%, -50%); removed to respect exact coordinates */
      z-index: 10;
      width: auto;
      max-width: 400px; 
      font-family: 'Inter', sans-serif;
      color: #334155;
      text-align: right; 
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      background: rgba(255, 255, 255, 0.6); /* Slight backing for readability */
      padding: 1rem;
      border-radius: 12px;
      backdrop-filter: blur(4px);
    }

    .animated-text-carousel {
       margin-top: 1rem;
       width: 100%;
    }

    .carousel-item {
       animation: textFade 5s infinite;
       display: flex;
       justify-content: flex-end;
    }

    .carousel-message {
       font-size: 0.85rem;
       line-height: 1.4;
       color: #166534; 
       font-style: italic;
       max-width: 100%;
       text-align: right;
    }

    @keyframes textFade {
       0%, 10% { opacity: 0; transform: translateY(10px); }
       15%, 85% { opacity: 1; transform: translateY(0); }
       90%, 100% { opacity: 0; transform: translateY(-10px); }
    }

    .support-text-block h3 {
      font-weight: 700;
      font-size: 1.25rem; 
      margin-bottom: 0.25rem;
      color: #0f172a;
    }
    .support-text-block p {
      font-size: 1rem;
      line-height: 1.5;
    }

    /* RIGHT COL */
    .hero-content-col {
      display: flex;
      flex-direction: column;
      align-items: flex-end; 
      text-align: right;
      padding-top: 2rem;
    }

    .hero-text-content {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      padding-bottom: 4rem;
    }

    .logo-area {
      align-self: flex-end;
      margin-bottom: 1.5rem;
    }

    .hero-brand-logo {
      max-height: 80px;
      width: auto;
    }

    .main-slogan {
      font-family: 'Inter', sans-serif; 
      font-size: 2.5rem;
      font-weight: 300; 
      color: #64748b; 
      line-height: 1.1;
      margin-bottom: 2rem;
      text-transform: uppercase;
      text-align: right;
    }
    
    .highlight-text {
      font-weight: 300;
      font-size: 1.8rem;
      color: #64748b;
      display: block;
      margin-top: 0.5rem;
      text-transform: none; 
      font-style: italic;
    }

    .sub-slogan-block {
      margin-bottom: 3rem;
    }

    .sub-headline {
      font-size: 3rem;
      font-weight: 800;
      color: #0d2b5b; 
      margin-bottom: 1rem;
    }
    
    .sub-description {
      font-size: 1.25rem;
      color: #334155;
      margin-bottom: 1.5rem;
      line-height: 1.5;
    }

    .value-prop {
      font-size: 1.5rem;
      color: #0d2b5b;
      font-weight: 600;
      line-height: 1.3;
    }
    .value-prop strong {
      font-weight: 900;
      text-transform: uppercase;
      font-size: 1.8rem;
    }

    /* BUTTONS */
    .hero-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end; /* Align right to match text */
      width: 100%;
    }

    .btn {
      padding: 1rem 2rem;
      font-weight: 600;
      border-radius: 50px;
      text-decoration: none;
      transition: all 0.2s;
      display: inline-flex;
      align-items: center;
    }
    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    }

    .btn-estimate {
      background-color: #0f172a; 
      color: white;
    }
    .icon-flame {
      color: #ef4444; 
      margin-right: 0.5rem;
    }

    .btn-login-hero {
      background-color: white; 
      color: #0f172a;
      border: 1px solid #e2e8f0;
      display: inline-flex;
      flex-direction: row; 
      align-items: center; 
      justify-content: center; 
      line-height: 1.1;
      text-align: center;
      padding: 1rem 2rem;
      cursor: pointer;
    }
    .btn-login-hero:hover {
        background-color: #f8fafc;
        border-color: #cbd5e1;
    }
    .btn-subtext {
      font-size: 0.75rem;
      font-weight: 400; 
      opacity: 0.9;
    }

    /* USER PROFILE SECTION */
    .user-profile-section {
      display: flex;
      align-items: center;
      gap: 1rem;
      background: white;
      padding: 0.75rem 1.5rem;
      border-radius: 50px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }

    .user-avatar {
      position: relative;
      width: 45px;
      height: 45px;
      border-radius: 50%;
      border: 2px solid #22c55e;
      padding: 2px;
      background: rgba(34, 197, 94, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .user-avatar img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }

    .status-indicator {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 12px;
      height: 12px;
      background-color: #22c55e;
      border: 2px solid white;
      border-radius: 50%;
    }

    .welcome-text {
      font-weight: 600;
      color: #0f172a;
      font-size: 1rem;
      white-space: nowrap;
    }

    .btn-panel {
      background-color: #0f172a !important;
      color: white !important;
      padding: 0.6rem 1.2rem !important;
      border-radius: 8px !important;
      font-weight: 600 !important;
      display: flex !important;
      align-items: center !important;
      gap: 0.5rem !important;
      border: none !important;
      cursor: pointer !important;
      transition: all 0.3s ease !important;
    }

    .btn-panel:hover {
      background-color: #1e293b !important;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.3);
    }

    .btn-logout-hero {
      background-color: transparent !important;
      color: #ef4444 !important;
      border: 1px solid rgba(239, 68, 68, 0.3) !important;
      padding: 0.6rem !important;
      border-radius: 8px !important;
      cursor: pointer !important;
      transition: all 0.3s ease !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      min-width: 42px;
      min-height: 42px;
    }

    .btn-logout-hero:hover {
      background-color: rgba(239, 68, 68, 0.1) !important;
      border-color: #ef4444 !important;
      transform: translateY(-2px);
    }

    .btn-logout-hero .material-symbols-outlined,
    .btn-panel .material-symbols-outlined {
      font-size: 1.2rem !important;
    }

    /* RESPONSIVE */
    @media (max-width: 1024px) {
      .home-hero {
        padding-top: 100px;
        min-height: auto;
      }
      .hero-grid {
        grid-template-columns: 1fr;
        gap: 3rem;
        padding-top: 2rem;
      }
      .hero-content-col {
        align-items: center;
        text-align: center;
        order: 1; /* Content first on mobile */
      }
      .hero-visual-col {
        order: 2;
        min-height: 300px;
      }
      .hero-text-content {
        align-items: center;
        margin-right: 0;
      }
      .main-slogan, .sub-headline, .support-text-block, .carousel-message {
        text-align: center;
      }
      .logo-area {
        align-self: center;
      }
      .hero-actions {
        justify-content: center;
      }
      .support-text-block {
        position: relative;
        top: auto;
        right: auto;
        left: auto;
        transform: none;
        margin: 2rem auto;
        align-items: center;
      }
    }
  `]
})
export class HomeHeroComponent implements OnInit, OnDestroy {
  public modalService = inject(ModalService);
  private translate = inject(TranslateService);

  protected currentMessageIndex = signal(0);
  private intervalId?: ReturnType<typeof setInterval>;
  private langSub?: { unsubscribe(): void };

  protected messages: string[] = [];

  ngOnInit() {
    this.startCarousel();
    this.loadMessages();
    this.langSub = this.translate.onLangChange.subscribe(() => {
      this.loadMessages();
    });
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.langSub?.unsubscribe();
  }

  private loadMessages() {
    this.translate.get('HOME.MESSAGES').subscribe((msgs: string[]) => {
      this.messages = msgs;
    });
  }

  private startCarousel() {
    this.intervalId = setInterval(() => {
      this.currentMessageIndex.update(idx => (idx + 1) % this.messages.length);
    }, 5000);
  }
}
