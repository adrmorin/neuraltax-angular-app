import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <section class="about-section">
      <div class="container about-container">
        <div class="about-visual-new">
          <img src="assets/imagen-1.png" alt="Neuraltax Visual" class="about-img" />
          <div class="gradient-overlay"></div>
        </div>
        <div class="about-content">
          <h2 class="section-title">{{ 'HOME.ABOUT.TITLE' | translate }}</h2>

          <div class="accordion">
            @for (item of accordionItems; track $index) {
              <div class="accordion-item" [class.active]="activeAccordion() === $index">
                <button class="accordion-header" (click)="toggleAccordion($index)">
                  {{ 'HOME.ABOUT.QUESTIONS.' + $index + '.Q' | translate }} <span class="material-symbols-outlined" style="vertical-align: middle;">keyboard_arrow_down</span>
                </button>
                <div class="accordion-body">
                  <p>{{ 'HOME.ABOUT.QUESTIONS.' + $index + '.A' | translate }}</p>
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

  accordionItems = new Array(10);

  toggleAccordion(index: number): void {
    this.activeAccordion.set(this.activeAccordion() === index ? null : index);
  }
}
