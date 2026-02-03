import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeroSliderComponent } from '../hero-slider/hero-slider.component';

@Component({
  selector: 'app-home-hero',
  standalone: true,
  imports: [RouterLink, CommonModule, HeroSliderComponent],
  template: `
    <section class="home-hero">
      <div class="hero-grid">
        <div class="support-text-block">
          <h3>Specialized Support</h3>
          <p>Support in English or Spanish, powered by AI and human assistance when needed.</p>
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
            
            <h1 class="main-slogan">"NEURAL POWER,<br><span class="highlight-text">efficiency delivered.."</span></h1>
            
            <div class="sub-slogan-block">
              <h2 class="sub-headline">Maximize your savings</h2>
              <p class="sub-description">and your peace of mind with<br>AI-powered tax optimization</p>
              <p class="value-prop">More deductions,<br>less stress, full Control<br><strong>starts Now!</strong></p>
            </div>

            <div class="hero-actions">
              <a routerLink="/wizard" class="btn btn-estimate">
                <span class="material-symbols-outlined icon-flame">local_fire_department</span>
                Get Free Estimate
              </a>
              <a routerLink="/login" class="btn btn-login-hero">
                <span>Loguin</span>
                <span class="btn-subtext">or register</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .home-hero {
      padding-top: 140px; /* Keep top padding for header */
      padding-bottom: 0;
      /* Light bluish-greenish gradient backdrop */
      background: linear-gradient(135deg, #e0faff 0%, #f0fff4 100%);
      min-height: 85vh;
      display: flex;
      align-items: stretch; /* Stretch to fill height */
      justify-content: center;
      overflow: hidden;
    }

    .hero-grid {
      position: relative;
      display: grid;
      grid-template-columns: 0.8fr 1.2fr;
      gap: 2rem;
      width: 100%;
      margin: 0 auto;
      padding: 0; /* Remove padding as requested */
      padding-right: 2rem; /* Keep right padding for content breathing room */
      align-items: stretch; /* Allow columns to stretch */
    }

    /* LEFT COL */
    .hero-visual-col {
      display: flex;
      flex-direction: column;
      position: relative;
      /* min-height handled by grid stretch, but ensure it's tall enough */
      justify-content: flex-end; /* Anchor content to bottom */
    }

    .slider-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%; /* Will fill the column */
      z-index: 0;
      /* No shadow as it touches edge */
    }
    
    .support-text-block {
      position: absolute;
      top: 2rem; /* Slight spacing from very top */
      left: 50%;
      transform: translateX(-50%);
      z-index: 10;
      width: auto;
      max-width: 624px; /* Increased from 480px (+30%) */
      font-family: 'Inter', sans-serif;
      color: #334155;
      text-align: right; /* Right align text as requested */
      padding: 0;
    }
    .support-text-block h3 {
      font-weight: 700;
      font-size: 1.76rem; /* Increased from 1.35rem (+30%) */
      margin-bottom: 0.5rem;
      color: #0f172a;
    }
    .support-text-block p {
      font-size: 1.5rem; /* Increased from 1.15rem (+30%) */
      line-height: 1.5;
      max-width: 468px; /* Increased from 360px (+30%) */
    }

    /* RIGHT COL */
    .hero-content-col {
      display: flex;
      flex-direction: column;
      align-items: flex-end; /* Right align as per image flow */
      text-align: right;
    }

    .hero-text-content {
      margin-right: 4rem; /* Move left by adding margin from right (approx 2rem + existing or just more) Use 4rem to be safe per "2rem a la izquierda" request on top of visual gap */
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    .logo-area {
      align-self: flex-end; /* Default for this column is flex-end, but user wants LEFT? Wait. */
      /* User said "justificar a la izquierda" (justify to left). */
      /* If the column is on the right, and everything is right aligned... */
      /* Maybe they want the logo on the LEFT side of the TEXT BLOCK? */
      /* That would be align-self: flex-start. */
      align-self: flex-start;
      margin-bottom: 1rem;
    }

    .hero-brand-logo {
      max-height: 90px;
      width: auto;
      /* margin-bottom removed here as it is better on container or keep it. */
    }

    .main-slogan {
      font-family: 'Inter', sans-serif; /* Or custom font */
      font-size: 2.8rem; /* Reduced from 3.5rem (20% reduction) */
      font-weight: 300; /* Light/Thin for "NEURAL POWER" */
      color: #64748b; /* Grayish text */
      line-height: 1.1;
      margin-bottom: 1.5rem;
      text-transform: uppercase;
      text-align: right;
    }
    
    .highlight-text {
      font-weight: 300;
      font-size: 2rem; /* Reduced from 2.5rem (20% reduction) */
      color: #64748b;
      display: block;
      margin-top: 0.5rem;
      text-transform: none; /* "efficiency delivered.." is slightly cleaner */
      font-style: italic;
    }

    .sub-slogan-block {
      margin-bottom: 2.5rem;
    }

    .sub-headline {
      font-size: 2.5rem;
      font-weight: 800;
      color: #0d2b5b; /* Deep Blue "Maximize yours savings" */
      margin-bottom: 0.5rem;
    }
    
    .sub-description {
      font-size: 1.25rem;
      color: #334155;
      margin-bottom: 1.5rem;
      line-height: 1.4;
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
      justify-content: flex-start; /* Changed from flex-end to align left */
    }

    .btn {
      padding: 0.75rem 1.5rem;
      font-weight: 600;
      border-radius: 8px;
      text-decoration: none;
      transition: transform 0.2s, box-shadow 0.2s;
      display: inline-flex;
      align-items: center;
    }
    .btn:hover {
      transform: translateY(-2px);
    }

    .btn-estimate {
      background-color: #1e293b; /* Dark bg */
      color: white;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      margin-left: -5rem; /* Move 5rem to the left */
    }
    .icon-flame {
      color: #ef4444; /* Red flame */
      margin-right: 0.5rem;
    }

    .btn-login-hero {
      background-color: #94a3b8; /* Grayish green/blue */
      color: #0f172a;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      flex-direction: column; /* Stack text */
      line-height: 1.1;
      text-align: center;
      padding: 0.5rem 1.5rem; /* Adjust padding for height */
    }
    .btn-subtext {
      font-size: 0.75rem;
      font-weight: 400; /* Normal weight */
      opacity: 0.9;
    }

    /* RESPONSIVE */
    @media (max-width: 1024px) {
      .hero-grid {
        grid-template-columns: 1fr;
        text-align: center;
      }
      .hero-content-col {
        align-items: center;
        text-align: center;
      }
      .hero-visual-col {
        align-items: center;
      }
      .support-text-block {
        text-align: center;
        padding-left: 0;
      }
      .hero-actions {
        justify-content: center;
      }
    }
  `]
})
export class HomeHeroComponent { }
