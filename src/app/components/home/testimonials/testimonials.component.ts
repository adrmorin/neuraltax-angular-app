import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-testimonials',
    standalone: true,
    imports: [CommonModule],
    template: `
    <section class="testimonials">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">What Our Clients Say</h2>
          <p class="section-subtitle">Discover why thousands of businesses and professionals trust Neuraltax for their most important tax needs.</p>
        </div>

        <div class="testimonials-grid">
          @for (item of reviews; track item.name) {
            <div class="testimonial-card">
              <div class="card-header">
                <div class="user-info">
                  <div class="user-avatar">{{ item.initials }}</div>
                  <div class="user-details">
                    <h4 class="user-name">{{ item.name }}</h4>
                    <span class="user-role">{{ item.role }}</span>
                    <span class="user-company">{{ item.company }}</span>
                  </div>
                </div>
              </div>
              <div class="star-rating">
                @for (star of [1,2,3,4,5]; track star) {
                  <span class="material-symbols-outlined">star</span>
                }
              </div>
              <p class="testimonial-text">"{{ item.text }}"</p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
    styles: [`
    .testimonials {
      padding: 6rem 0;
      background: #f8fafc;
    }
    .section-header {
      text-align: center;
      margin-bottom: 5rem;
    }
    .section-title {
      font-size: 2.5rem;
      color: #1e3a8a;
      margin-bottom: 1rem;
    }
    .section-subtitle {
      max-width: 600px;
      margin: 0 auto;
      color: var(--text-secondary);
    }
    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }
    .testimonial-card {
      background: white;
      padding: 2.5rem;
      border-radius: 16px;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
      border: 1px solid #f1f5f9;
      transition: all 0.3s;
    }
    .testimonial-card:hover {
      box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
      transform: translateY(-5px);
    }
    .card-header {
      margin-bottom: 1.5rem;
    }
    .user-info {
      display: flex;
      gap: 1.25rem;
      align-items: flex-start;
    }
    .user-avatar {
      width: 48px;
      height: 48px;
      background: #e2e8f0;
      color: #64748b;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      font-weight: 700;
      font-size: 0.9rem;
    }
    .user-details {
      display: flex;
      flex-direction: column;
    }
    .user-name {
      font-size: 1.1rem;
      color: #1e293b;
      margin: 0;
    }
    .user-role {
      font-size: 0.8rem;
      color: #64748b;
    }
    .user-company {
      font-size: 0.8rem;
      font-weight: 600;
      color: #688071;
    }
    .star-rating {
      display: flex;
      gap: 2px;
      margin-bottom: 1.5rem;
    }
    .star-rating span {
      font-size: 1.1rem;
      color: #fbbf24;
      font-variation-settings: 'FILL' 1;
    }
    .testimonial-text {
      font-size: 0.95rem;
      color: #475569;
      line-height: 1.6;
      font-style: italic;
    }
    @media (max-width: 1024px) {
      .testimonials-grid { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 640px) {
      .testimonials-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class TestimonialsComponent {
    reviews = [
        {
            name: 'Maria Gonzalez',
            initials: 'MG',
            role: 'Executive Director',
            company: 'Legal Consulting',
            text: 'Neuraltax completely revolutionized our tax management. AI automation saved us over 80% of the time in tax preparation.'
        },
        {
            name: 'Carlos Rodriguez',
            initials: 'CR',
            role: 'CEO',
            company: 'TechStart Solutions',
            text: 'The accuracy and speed of Neuraltax is impressive. We haven\'t had a single error in our tax returns since we started using the service.'
        },
        {
            name: 'Ana Patricia Diaz',
            initials: 'APD',
            role: 'Independent Accountant',
            company: 'Freelancer',
            text: 'As an independent professional, Neuraltax allows me to offer premium quality services to my clients without the traditional technical complexity.'
        },
        {
            name: 'Roberto Silva',
            initials: 'RS',
            role: 'CFO',
            company: 'RSM Investments',
            text: 'The operational cost savings have been extraordinary. Neuraltax helped us optimize our tax structure in a completely legal manner.'
        },
        {
            name: 'Laura Mendoza',
            initials: 'LM',
            role: 'Financial Manager',
            company: 'Retail Plus',
            text: 'The interface is intuitive and the technical support exceptional. I recommend Neuraltax to any company looking to modernize their tax management.'
        },
        {
            name: 'David Chen',
            initials: 'DC',
            role: 'Founder',
            company: 'Global E-commerce',
            text: 'Neuraltax perfectly handles the tax complexities of our international business. An indispensable tool for global companies.'
        }
    ];
}
