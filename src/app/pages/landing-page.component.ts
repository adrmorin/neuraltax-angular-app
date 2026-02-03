import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from '../components/common/about-us.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterLink, CommonModule, AboutUsComponent],
  template: `
    <div class="landing-page">
      <!-- Hero Section -->
      <section class="hero-new">
        <div class="hero-bg-overlay"></div>
        <div class="container hero-container">

          <div class="hero-content-right">
            <div class="main-logo-container">
              <img src="assets/neuraltax3.png" alt="Neuraltax" class="main-logo-img" />
            </div>


            <div class="hero-value-prop">
              <h3>Maximize your savings</h3>
              <p>and your peace of mind with<br />AI-powered tax optimization</p>
            </div>

            <p class="hero-tagline">More deductions, less stress, full control<br /><strong>starts NOW!</strong></p>

            <div class="hero-actions">
              <a routerLink="/wizard" class="btn btn-dark"><span class="material-symbols-outlined" style="color: #ff4d4d; margin-right: 8px; vertical-align: middle;">bolt</span> Get Free Estimate</a>
              <a routerLink="/login" class="btn btn-loguin">Loguin</a>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features-bar">
        <div class="container features-grid">
          <div class="feature-col left">
            <h3>Why Neuraltax?</h3>
            <p>Neuraltax is your automated tax expert. Designed to simplify tax management, we combine cutting-edge technology with precision and efficiency. Our intelligent system analyzes, calculates, and optimizes your returns, ensuring full IRS compliance and maximizing your tax benefits.</p>
          </div>
          <div class="feature-col right">
            <h3>Smart Automation:</h3>
            <ul>
              <li><strong>Fast processes, no human errors</strong></li>
              <li>Save Time and Money: Forget the hassle, focus on what matters.</li>
              <li>Guaranteed Compliance: Always up-to-date with tax regulations.</li>
              <li><strong>Discover how Neuraltax can transform your tax experience.</strong></li>
            </ul>
          </div>
        </div>
      </section>

      <!-- About / FAQ Section -->
      <app-about-us></app-about-us>
    </div>
  `,
  styles: []
})
export class LandingPageComponent {
}
