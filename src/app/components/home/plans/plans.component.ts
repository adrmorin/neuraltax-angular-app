import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-membership-plans',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  template: `
    <section class="membership-plans">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ 'HOME.PLANS.TITLE' | translate }}</h2>
          <p class="section-subtitle">{{ 'HOME.PLANS.SUBTITLE' | translate }}</p>
        </div>

        <div class="plans-grid">
          <!-- Free Plan -->
          <div class="plan-card free">
            <div class="card-header">
              <h3>{{ 'HOME.PLANS.INDIVIDUAL_FREE' | translate }}</h3>
              <p>{{ 'HOME.PLANS.FREE_DESC' | translate }}</p>
            </div>
            <div class="card-price">
              <span class="price-label">{{ 'HOME.PLANS.TAX_FEE_LABEL' | translate }}</span>
              <span class="price-value">$49</span>
            </div>
            <ul class="feature-list">
              <li><span class="material-symbols-outlined">check</span> {{ 'HOME.PLANS.FEATURES.AI_AUTOMATION' | translate }}</li>
              <li><span class="material-symbols-outlined">check</span> {{ 'HOME.PLANS.FEATURES.SECURITY' | translate }}</li>
              <li><span class="material-symbols-outlined">check</span> {{ 'HOME.PLANS.FEATURES.EFILE' | translate }}</li>
              <li><span class="material-symbols-outlined">check</span> {{ 'HOME.PLANS.FEATURES.ADVANCE_PAY' | translate }}</li>
              <li><span class="material-symbols-outlined">check</span> {{ 'HOME.PLANS.FEATURES.CHATBOT' | translate }}</li>
            </ul>
          </div>

          <!-- Smart Saver (Most Popular) -->
          <div class="plan-card featured">
            <div class="popular-badge">{{ 'HOME.PLANS.MOST_POPULAR' | translate }}</div>
            <div class="card-header">
              <h3>{{ 'HOME.PLANS.SMART_SAVER' | translate }}</h3>
              <p>{{ 'HOME.PLANS.SMART_SAVER_DESC' | translate }}</p>
            </div>
            <div class="card-price">
              <span class="price-value">$12/{{ 'HOME.PLANS.MONTHLY' | translate }}</span>
            </div>
            <ul class="feature-list">
              <li class="emphasized"><span class="material-symbols-outlined">check</span> {{ 'HOME.PLANS.FEATURES.SMART_SAVER_FEE' | translate }}</li>
              <li class="sub-feature">{{ 'HOME.PLANS.FEATURES.SMART_SAVER_FEE_LESS' | translate }}</li>
              <li><span class="material-symbols-outlined">check</span> {{ 'HOME.PLANS.FEATURES.CHATBOT' | translate }} ({{ 'HOME.PLANS.FEATURES.PRIORITY_SUPPORT' | translate }})</li>
              <li><span class="material-symbols-outlined">check</span> {{ 'HOME.PLANS.FEATURES.EDUCATIONAL' | translate }}</li>
              <li><span class="material-symbols-outlined">check</span> {{ 'HOME.PLANS.FEATURES.AI_AUTOMATION' | translate }}</li>
              <li><span class="material-symbols-outlined">check</span> {{ 'HOME.PLANS.FEATURES.SECURITY' | translate }}</li>
              <li><span class="material-symbols-outlined">check</span> {{ 'HOME.PLANS.FEATURES.EFILE' | translate }}</li>
              <li><span class="material-symbols-outlined">check</span> {{ 'HOME.PLANS.FEATURES.ADVANCE_PAY' | translate }}</li>
              <li><span class="material-symbols-outlined">check</span> {{ 'HOME.PLANS.FEATURES.STORAGE' | translate }}</li>
            </ul>
            <button class="btn btn-outline-light" routerLink="/update">{{ 'HOME.PLANS.UPDATE_NOW' | translate }}</button>
          </div>

          <!-- VIP Plan -->
          <div class="plan-card black">
            <div class="popular-badge">{{ 'HOME.PLANS.EXCLUSIVE_VIP' | translate }}</div>
            <div class="card-header">
              <h3>{{ 'HOME.PLANS.BLACK_VIP' | translate }}</h3>
              <p>{{ 'HOME.PLANS.BLACK_VIP_DESC' | translate }}</p>
            </div>
            <div class="card-price">
              <span class="price-value">{{ 'HOME.PLANS.BY_INVITATION' | translate }}</span>
            </div>
            <ul class="feature-list">
              <li><span class="material-symbols-outlined">check</span> {{ 'HOME.PLANS.FEATURES.FREE_TAX_DECL' | translate }}</li>
              <li><span class="material-symbols-outlined">check</span> {{ 'HOME.PLANS.FEATURES.CHATBOT_1TO1' | translate }}</li>
              <li><span class="material-symbols-outlined">check</span> {{ 'HOME.PLANS.FEATURES.SECURITY' | translate }}</li>
              <li><span class="material-symbols-outlined">check</span> {{ 'HOME.PLANS.FEATURES.PERSONAL_COUNSELING' | translate }}</li>
              <li><span class="material-symbols-outlined">check</span> {{ 'HOME.PLANS.FEATURES.INVESTMENT_PLANS' | translate }}</li>
            </ul>
            <button class="btn btn-outline-light">{{ 'HOME.PLANS.REQUEST_INVITATION' | translate }}</button>
          </div>

          <!-- Agent Plan -->
          <div class="plan-card agent">
            <div class="popular-badge agent-badge">{{ 'HOME.PLANS.B2B_SOLUTION' | translate }}</div>
            <div class="card-header">
              <h3>{{ 'HOME.PLANS.PROFESSIONAL_AGENT' | translate }}</h3>
              <p>{{ 'HOME.PLANS.AGENT_DESC' | translate }}</p>
            </div>
            <div class="card-price">
              <span class="price-value">{{ 'HOME.PLANS.CUSTOM_PLAN' | translate }}</span>
            </div>
            <ul class="feature-list">
              <li class="emphasized green-highlight"><span class="material-symbols-outlined green-highlight">hub</span> {{ 'HOME.PLANS.FEATURES.CLIENT_MGMT' | translate }}</li>
              <li><span class="material-symbols-outlined">check</span> {{ 'HOME.PLANS.FEATURES.AGENT_TOOLS' | translate }}</li>
              <li><span class="material-symbols-outlined">check</span> {{ 'HOME.PLANS.FEATURES.COLLABORATION' | translate }}</li>
              <li><span class="material-symbols-outlined">check</span> {{ 'HOME.PLANS.FEATURES.FILING_RATES' | translate }}</li>
              <li><span class="material-symbols-outlined">check</span> {{ 'HOME.PLANS.FEATURES.ACCOUNT_MANAGER' | translate }}</li>
              <li><span class="material-symbols-outlined">check</span> {{ 'HOME.PLANS.FEATURES.API_INTEGRATION' | translate }}</li>
            </ul>
            <button class="btn btn-agent">{{ 'HOME.PLANS.CONTACT_SALES' | translate }}</button>
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
      background: radial-gradient(circle at 75% 15%, #d1d5db 0%, #9ca3af 70%) !important; /* Gray Glow Effect */
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
      background: radial-gradient(circle at 75% 15%, #334155 0%, #000000 70%) !important;
      color: white;
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    }
    .plan-card.agent {
      background: radial-gradient(circle at 75% 15%, #0d9488 0%, #064e4b 70%) !important;
      border: 1px solid #134e4a;
      color: white !important;
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
    .popular-badge.agent-badge {
      background: #4ade80 !important;
      color: #064e4b !important;
    }
    .green-highlight {
      color: #4ade80 !important;
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
      background: #14b8a6;
      color: white;
      border: 1px solid rgba(255,255,255,0.2);
    }
    .btn-agent:hover {
      background: #0d9488;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(13, 148, 136, 0.4);
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
