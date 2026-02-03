import { Component, OnDestroy, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common'; // Import CommonModule for ngClass/ngFor
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-home-hero',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <section class="home-hero">
      <div class="hero-container">
        <div class="hero-header">
          <div class="hero-logo-slider">
            @for (img of images; track img; let i = $index) {
              <img 
                [src]="img" 
                alt="Neuraltax Slider {{i}}" 
                class="hero-logo-img" 
                [class.active]="i === currentImageIndex">
            }
          </div>
        </div>
        <div class="hero-main">
          <div class="hero-content">
            <div class="hero-actions">
              <a routerLink="/wizard" class="btn btn-dark">
                <span class="material-symbols-outlined" style="color: #ff4d4d; margin-right: 8px; vertical-align: middle;">bolt</span>
                Get Free Estimate
              </a>
              <a routerLink="/login" class="btn btn-loguin">Loguin</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .home-hero {
      padding: 160px 0 6rem;
      background: radial-gradient(circle at 10% 20%, rgba(74, 222, 128, 0.05) 0%, transparent 40%);
      overflow: hidden;
    }
    .hero-container {
      max-width: 1440px;
      margin: 0 auto;
      padding: 0 2rem;
    }
    .hero-header {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      margin-bottom: 2rem;
      height: 120px; /* Fixed height to prevent jumps */
      position: relative;
    }
    .hero-logo-slider {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: flex-end; /* Align images to right/center as before */
    }
    .hero-logo-img {
      height: 120px;
      object-fit: contain;
      position: absolute;
      top: 0;
      right: 0;
      opacity: 0;
      transition: opacity 1s ease-in-out;
    }
    .hero-logo-img.active {
      opacity: 1;
    }
    .hero-slogan {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-top: -1rem;
      margin-right: 4rem;
    }
    .slogan-text {
      font-family: var(--font-family-heading);
      font-size: 3rem;
      font-weight: 700;
      color: var(--secondary-sage);
      letter-spacing: -1px;
    }
    .slogan-subtext {
      font-family: var(--font-family-heading);
      font-size: 1.5rem;
      color: var(--text-secondary);
      margin-left: 2rem;
    }
    .hero-main {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 200px;
    }
    .hero-visual-img {
      width: 100%;
      border-radius: 20px;
      filter: drop-shadow(0 20px 50px rgba(0,0,0,0.1));
    }
    .hero-support-badge {
      font-size: 0.9rem;
      max-width: 300px;
      color: var(--text-dark);
      margin-bottom: 2rem;
      line-height: 1.4;
    }
    .hero-support-badge strong {
      display: block;
      font-size: 1.1rem;
      margin-bottom: 0.25rem;
    }
    .hero-title {
      font-size: 3.5rem;
      color: #1e3a8a; /* Deep blue from image */
      margin-bottom: 0.5rem;
      letter-spacing: -2px;
    }
    .hero-subtitle {
      font-size: 1.25rem;
      color: var(--text-secondary);
      margin-bottom: 2rem;
    }
    .hero-value-headline {
      font-size: 2rem;
      color: #1e3a8a;
      font-weight: 600;
    }
    .hero-cta-tagline {
      font-size: 2.5rem;
      font-weight: 800;
      color: #0d47a1;
      margin-bottom: 3rem;
    }
    .hero-actions {
      display: flex;
      gap: 1.5rem;
      align-items: center;
    }
    @media (max-width: 1024px) {
      .hero-main { grid-template-columns: 1fr; }
      .hero-header { align-items: center; text-align: center; }
      .hero-logo-slider { justify-content: center; }
      .hero-logo-img { right: auto; left: 50%; transform: translateX(-50%); } /* Center in mobile */
      .hero-slogan { margin-right: 0; align-items: center; }
      .hero-slogan span { margin-left: 0; }
      .hero-title { font-size: 2.5rem; }
    }
  `]
})
export class HomeHeroComponent implements OnInit, OnDestroy {
  images: string[] = [
    'assets/slider/slide-1.png',
    'assets/slider/slide-2.png',
    'assets/slider/slide-3.png',
    'assets/slider/slide-4.png',
    'assets/slider/slide-5.png',
    'assets/slider/slide-6.png',
    'assets/slider/slide-7.png',
    'assets/slider/slide-8.png'
  ];
  currentImageIndex = 0;
  private sliderSub: Subscription | null = null;
  private platformId = inject(PLATFORM_ID);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.startSlider();
    }
  }

  ngOnDestroy() {
    this.sliderSub?.unsubscribe();
  }

  startSlider() {
    this.sliderSub = timer(0, 4000).subscribe(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    });
  }

  onImgError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'https://placehold.co/600x400/e2e8f0/1e293b?text=Neuraltax+Family';
  }
}
