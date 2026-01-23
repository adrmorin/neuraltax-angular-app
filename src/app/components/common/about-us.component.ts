import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="about-section">
      <div class="container about-container">
        <div class="about-visual-new">
          <img src="assets/imagen-1.png" alt="Neuraltax Visual" class="about-img" />
          <div class="gradient-overlay"></div>
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
  `,
  styles: [`
    .about-container {
      display: grid;
      grid-template-columns: 1.3fr 1fr;
      gap: 4rem;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
    }
    .about-visual-new {
      position: relative;
      border-radius: 20px;
      overflow: hidden;
    }
    .about-img {
      width: 100%;
      display: block;
    }
    .gradient-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to right, transparent 50%, #f8fafc 100%);
    }
    .about-content {
      width: 100%;
    }
    .section-title {
      text-align: left;
    }
  `]
})
export class AboutUsComponent {
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
