import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [RouterLink, CommonModule],
    template: `
    <div class="home-page">
      <!-- Hero Section -->
      <section class="hero-new">
        <div class="hero-bg-overlay"></div>
        <div class="container hero-container">
          <div class="hero-content-left">
            <div class="hero-image-wrapper">
              <img src="https://placehold.co/600x400/png?text=Family+and+Robot" alt="Family and AI Robot" class="hero-img-main" />
              <div class="floating-card card-tax">
                <i class="fas fa-check-circle"></i>
                <span>Tax Optimized</span>
              </div>
            </div>
          </div>
          <div class="hero-content-right">
            <h1 class="main-title">
              <span class="neural-text">Neural</span><span class="tax-text">tax</span>
              <span class="ai-badge">AI EXPERT</span>
            </h1>
            <h2 class="hero-quote">"NEURAL POWER,<br />efficiency delivered.."</h2>

            <div class="hero-value-prop">
              <h3>Maximize your savings</h3>
              <p>and your peace of mind with<br />AI-powered tax optimization</p>
            </div>

            <p class="hero-tagline">More deductions, less stress, full control<br /><strong>starts NOW!</strong></p>

            <div class="hero-actions">
              <a routerLink="/calculator" class="btn btn-dark"><i class="fas fa-fire"></i> Get Free Estimate</a>
              <a routerLink="/dashboard" class="btn btn-light">Login</a>
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
      <section class="about-section">
        <div class="container about-container">
          <div class="about-visual">
            <img src="https://placehold.co/400x700/png?text=Mobile+App+Mockup" alt="NeuralTax App" class="app-mockup" />
            <div class="welcome-text">
              <h2>Welcome back</h2>
            </div>
          </div>
          <div class="about-content">
            <h2 class="section-title">ABOUT US</h2>

            <div class="accordion">
              @for (item of accordionItems; track $index) {
                <div class="accordion-item" [class.active]="activeAccordion() === $index">
                  <button class="accordion-header" (click)="toggleAccordion($index)">
                    {{ item.question }} <i class="fas fa-chevron-down"></i>
                  </button>
                  <div class="accordion-body">
                    <p>{{ item.answer }}</p>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
    styles: []
})
export class HomeComponent {
    activeAccordion = signal<number | null>(null);

    accordionItems = [
        { question: 'Does Neuraltax replace an accountant?', answer: 'Neuraltax acts as a powerful AI assistant that handles most tax scenarios with precision. For complex cases, we offer access to human experts.' },
        { question: 'How do I get started?', answer: 'Simply click "Get Free Estimate" or "Login" to create your account. Our wizard will guide you through the process step-by-step.' },
        { question: 'Can I use Neuraltax if I only file personal taxes?', answer: 'Absolutely! Neuraltax is optimized for individual filers (1040), freelancers, and families.' },
        { question: 'How secure is the platform?', answer: 'We use bank-level 256-bit encryption to protect your data. Your privacy and security are our top priorities.' },
        { question: 'What services does it offer?', answer: 'We offer federal and state tax filing, tax planning, and audit support.' },
        { question: 'Who is it for?', answer: 'Anyone looking to simplify their tax filing process.' },
        { question: 'What are the main benefits?', answer: 'Accuracy, speed, and maximum refund guarantee.' },
        { question: 'How does it work?', answer: 'Upload your documents, answer simple questions, and let our AI do the rest.' },
        { question: 'What pricing plans are available?', answer: 'We offer free and premium plans to suit your needs.' },
        { question: 'What is Neuraltax?', answer: 'Your AI-powered tax filing companion.' }
    ];

    toggleAccordion(index: number): void {
        this.activeAccordion.set(this.activeAccordion() === index ? null : index);
    }
}
