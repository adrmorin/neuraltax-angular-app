import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-membership-plans',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="membership-plans">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Membership plans</h2>
          <p class="section-subtitle">Choose the membership plan that best fits your tax needs. All plans include our advanced AI technology and expert support.</p>
        </div>

        <div class="plans-grid">
          <!-- Free Plan -->
          <div class="plan-card free">
            <div class="card-header">
              <h3>Individual Free Member</h3>
              <p>Essential tax services with AI automation</p>
            </div>
            <div class="card-price">
              <span class="price-label">Tax declaration fee</span>
              <span class="price-value">$49</span>
            </div>
            <ul class="feature-list">
              <li><span class="material-symbols-outlined">check</span> AI form filing automation</li>
              <li><span class="material-symbols-outlined">check</span> IRS/CISA level security</li>
              <li><span class="material-symbols-outlined">check</span> Direct e-file submission</li>
              <li><span class="material-symbols-outlined">check</span> Advance payment</li>
              <li><span class="material-symbols-outlined">check</span> Chatbot Assistant</li>
            </ul>
          </div>

          <!-- Smart Saver (Most Popular) -->
          <div class="plan-card featured">
            <div class="popular-badge">Most Popular</div>
            <div class="card-header">
              <h3>Smart Saver</h3>
              <p>Comprehensive monthly tax management solution</p>
            </div>
            <div class="card-price">
              <span class="price-value">$12/Monthly</span>
            </div>
            <ul class="feature-list">
              <li class="emphasized"><span class="material-symbols-outlined">check</span> Tax declaration fee: $0 (if you have +4 months with membership)</li>
              <li class="sub-feature">$29-$39 (if you have less than 4 months)</li>
              <li><span class="material-symbols-outlined">check</span> Chatbot Assistant (priority support)</li>
              <li><span class="material-symbols-outlined">check</span> Tax educational resources</li>
              <li><span class="material-symbols-outlined">check</span> AI form filing automation</li>
              <li><span class="material-symbols-outlined">check</span> IRS/CISA level security</li>
              <li><span class="material-symbols-outlined">check</span> Direct e-file submission</li>
              <li><span class="material-symbols-outlined">check</span> Advance payment</li>
              <li><span class="material-symbols-outlined">check</span> Invoice & document storage (unlimited)</li>
            </ul>
            <button class="btn btn-outline-light">Update Now</button>
          </div>

          <!-- VIP Plan -->
          <div class="plan-card black">
            <div class="popular-badge">Exclusive VIP</div>
            <div class="card-header">
              <h3>Black (Exclusive VIP)</h3>
              <p>Ultimate exclusive membership by invitation only</p>
            </div>
            <div class="card-price">
              <span class="price-value">By invitation</span>
            </div>
            <ul class="feature-list">
              <li><span class="material-symbols-outlined">check</span> Free Tax declaration</li>
              <li><span class="material-symbols-outlined">check</span> Chatbot Assistant (1-to-1)</li>
              <li><span class="material-symbols-outlined">check</span> IRS/CISA level security</li>
              <li><span class="material-symbols-outlined">check</span> Personal financial counseling</li>
              <li><span class="material-symbols-outlined">check</span> FTF investment plans</li>
            </ul>
            <button class="btn btn-outline-light">Request Invitation</button>
          </div>

          <!-- Agent Plan -->
          <div class="plan-card agent">
            <div class="popular-badge" style="background: #FDE68A; color: #92400E;">B2B Solution</div>
            <div class="card-header">
              <h3>Professional Agent</h3>
              <p>For tax professionals and accounting firms</p>
            </div>
            <div class="card-price">
              <span class="price-value">Custom Plan</span>
            </div>
            <ul class="feature-list">
              <li class="emphasized" style="color: #B45309;"><span class="material-symbols-outlined" style="color: #B45309;">hub</span> Unlimited Client Management</li>
              <li><span class="material-symbols-outlined">check</span> Advanced AI Tools for Agents</li>
              <li><span class="material-symbols-outlined">check</span> Multi-user collaboration</li>
              <li><span class="material-symbols-outlined">check</span> Wholesale filing rates</li>
              <li><span class="material-symbols-outlined">check</span> Dedicated account manager</li>
              <li><span class="material-symbols-outlined">check</span> Custom API integrations</li>
            </ul>
            <button class="btn btn-agent">Contact Sales</button>
          </div>
        </div>
        
        <p class="disclaimer">*Free tax declaration available with Saver and Gold memberships. Additional terms may apply.</p>
      </div>
    </section>
  `,
  styles: [`
    .membership-plans {
      padding: 6rem 0;
      background: #f8fafc;
    }
    .section-header {
      text-align: center;
      margin-bottom: 5rem;
    }
    .section-title {
      font-size: 3rem;
      color: #152961 !important; /* Brand Blue Forced Darker 30% */
      font-weight: 800 !important;
      text-transform: uppercase !important;
      margin-bottom: 1rem;
    }
    .section-subtitle {
      max-width: 600px;
      margin: 0 auto;
      color: var(--text-secondary);
    }
    .plans-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
      align-items: start;
    }
    .plan-card {
      background: white;
      border-radius: 20px;
      padding: 3rem 2rem;
      position: relative;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
      transition: transform 0.3s;
    }
    .plan-card:hover {
      transform: translateY(-10px);
    }
    .plan-card.free {
      background: #9ca3af !important; /* Medium Gray (50% darker) */
      border: 1px solid #6b7280;
    }
    .plan-card.free h3,
    .plan-card.free .card-header p,
    .plan-card.free .feature-list li {
      color: #1f2937 !important; /* Dark text for contrast */
    }
    .plan-card.free .price-value {
      color: #111827 !important;
    }
    .plan-card.featured {
      background: radial-gradient(circle at 75% 15%, #60a5fa 0%, #152961 70%) !important;
      color: white;
      padding: 4rem 2rem;
      margin-top: -1rem;
      box-shadow: 0 20px 40px rgba(0,0,0,0.2);
    }
    .plan-card.black {
      background: #000;
      color: white;
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    }
    .plan-card.agent {
      background: #FFFBEB;
      border: 1px solid #FDE68A;
      color: #1e293b;
    }
    .popular-badge {
      position: absolute;
      top: 1.5rem;
      left: 1.5rem;
      background: #86efac;
      color: #064e3b;
      padding: 0.25rem 1rem;
      border-radius: 99px;
      font-size: 0.75rem;
      font-weight: 700;
    }
    .card-header h3 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }
    .card-header p {
      font-size: 0.9rem;
      opacity: 0.7;
      margin-bottom: 2rem;
    }
    .card-price {
      display: flex;
      flex-direction: column;
      margin-bottom: 2rem;
      border-bottom: 1px solid rgba(0,0,0,0.05);
      padding-bottom: 2rem;
    }
    .featured .card-price, .black .card-price {
      border-color: rgba(255,255,255,0.1);
    }
    .price-label {
      font-size: 0.9rem;
      font-weight: 600;
    }
    .price-value {
      font-size: 2.5rem;
      font-weight: 800;
    }
    .feature-list {
      list-style: none;
      padding: 0;
      margin: 0 0 2rem;
    }
    .feature-list li {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
      font-size: 0.95rem;
    }
    .feature-list li span {
      font-size: 1.2rem;
      color: #10b981;
    }
    .emphasized {
      font-weight: 700;
      color: #86efac;
    }
    .sub-feature {
      margin-left: 2rem;
      opacity: 0.8;
      font-size: 0.85rem !important;
    }
    .btn {
      width: 100%;
      padding: 1rem;
      border-radius: 12px;
      font-weight: 700;
      cursor: pointer;
      border: none;
    }
    .btn-outline-light {
      background: transparent;
      border: 2px solid white;
      color: white;
    }
    .btn-success {
      background: #10b981;
      color: white;
    }
    .btn-agent {
      background: #D4AF37;
      color: white;
    }
    .btn-agent:hover {
      background: #C5A028;
    }
    .disclaimer {
      text-align: center;
      margin-top: 4rem;
      font-size: 0.85rem;
      color: var(--text-secondary);
    }
    @media (max-width: 1024px) {
      .plans-grid { grid-template-columns: 1fr; }
      .plan-card.featured { margin-top: 0; }
    }
  `]
})
export class MembershipPlansComponent { }
