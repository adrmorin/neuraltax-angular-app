import { Component, OnDestroy, OnInit, inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-hero-slider',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="hero-logo-slider">
      @for (img of images; track img; let i = $index) {
        <img 
          [src]="img" 
          alt="Neuraltax Slider {{i}}" 
          class="hero-logo-img" 
          [class.active]="i === currentImageIndex">
      }
    </div>
  `,
  styles: [`
    .hero-logo-slider {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: flex-start;
      z-index: 0;
    }
    .hero-logo-img {
      height: 100%;
      width: auto;
      object-fit: contain;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      transition: opacity 1s ease-in-out;
    }
    .hero-logo-img.active {
      opacity: 1;
    }
    @media (max-width: 1024px) {
      .hero-logo-slider { justify-content: center; }
      .hero-logo-img { right: auto; left: 50%; transform: translateX(-50%); } 
    }
  `]
})
export class HeroSliderComponent implements OnInit, OnDestroy {
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
  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.startSlider();
    }
  }

  ngOnDestroy() {
    this.sliderSub?.unsubscribe();
  }

  startSlider() {
    this.sliderSub = timer(0, 3000).subscribe(() => {
      // Logic for next slide
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
      this.cdr.detectChanges(); // Force update
    });
  }
}
