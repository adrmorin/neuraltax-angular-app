import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-plans-modal',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="plans-modal-container">
      <div class="header">
        <h2>Upgrade Your Experience</h2>
        <p>Choose the plan that best fits your professional needs.</p>
        <button class="close-btn" (click)="modalService.closePlans()">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <div class="plans-grid">
        <!-- Smart Saver (Premium/Standard) -->
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
            <li class="emphasized"><span class="material-symbols-outlined">check</span> Tax declaration fee: $0 (if +4 months membership)</li>
            <li><span class="material-symbols-outlined">check</span> Chatbot Assistant (priority support)</li>
            <li><span class="material-symbols-outlined">check</span> Tax educational resources</li>
            <li><span class="material-symbols-outlined">check</span> AI form filing automation</li>
            <li><span class="material-symbols-outlined">check</span> IRS/CISA level security</li>
          </ul>
          <button class="btn btn-outline-light" routerLink="/update" (click)="modalService.closePlans()">Update Now</button>
        </div>

        <!-- Agent Plan -->
        <div class="plan-card agent">
          <div class="popular-badge agent-badge">B2B Solution</div>
          <div class="card-header">
            <h3>Professional Agent</h3>
            <p>For tax professionals and accounting firms</p>
          </div>
          <div class="card-price">
            <span class="price-value">Custom Plan</span>
          </div>
          <ul class="feature-list">
            <li class="emphasized green-highlight"><span class="material-symbols-outlined green-highlight">hub</span> Unlimited Client Management</li>
            <li><span class="material-symbols-outlined">check</span> Advanced AI Tools for Agents</li>
            <li><span class="material-symbols-outlined">check</span> Multi-user collaboration</li>
            <li><span class="material-symbols-outlined">check</span> Wholesale filing rates</li>
            <li><span class="material-symbols-outlined">check</span> Dedicated account manager</li>
          </ul>
          <button class="btn btn-agent">Contact Sales</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .plans-modal-container {
      background: white;
      border-radius: 24px;
      padding: 2.5rem;
      width: 100%;
      max-width: 900px;
      position: relative;
      max-height: 90vh;
      overflow-y: auto;
    }

    .header {
      text-align: center;
      margin-bottom: 2rem;
      position: relative;
    }

    .header h2 {
      font-size: 2rem;
      color: #1e293b;
      margin-bottom: 0.5rem;
      font-weight: 800;
    }

    .header p {
      color: #64748b;
    }

    .close-btn {
      position: absolute;
      top: -1rem;
      right: -1rem;
      background: #f1f5f9;
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #64748b;
      transition: all 0.2s;
    }

    .close-btn:hover {
      background: #e2e8f0;
      color: #0f172a;
    }

    .plans-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }

    /* REUSED STYLES FROM PLANS COMPONENT with adjustments */
    .plan-card {
      border-radius: 20px;
      padding: 2rem;
      position: relative;
      color: white;
      display: flex;
      flex-direction: column;
    }

    .plan-card.featured {
      background: radial-gradient(circle at 75% 15%, #60a5fa 0%, #152961 70%);
      box-shadow: 0 10px 25px rgba(21, 41, 97, 0.2);
    }

    .plan-card.agent {
      background: radial-gradient(circle at 75% 15%, #0d9488 0%, #064e4b 70%);
      box-shadow: 0 10px 25px rgba(6, 78, 75, 0.2);
    }

    .popular-badge {
      position: absolute;
      top: 1rem;
      right: 1.5rem; /* Changed to right for better balance in modal */
      left: auto;
      background: #86efac;
      color: #064e3b;
      padding: 0.25rem 0.75rem;
      border-radius: 99px;
      font-size: 0.7rem;
      font-weight: 700;
    }

    .popular-badge.agent-badge {
      background: #4ade80;
      color: #064e4b;
    }

    .card-header h3 {
      font-size: 1.5rem;
      margin-bottom: 0.25rem;
    }

    .card-header p {
      font-size: 0.85rem;
      opacity: 0.8;
      margin-bottom: 1.5rem;
    }

    .card-price {
      margin-bottom: 1.5rem;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      padding-bottom: 1.5rem;
    }

    .price-value {
      font-size: 2rem;
      font-weight: 800;
    }

    .feature-list {
      list-style: none;
      padding: 0;
      margin: 0 0 2rem;
      flex-grow: 1;
    }

    .feature-list li {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      margin-bottom: 0.75rem;
      font-size: 0.9rem;
      line-height: 1.3;
    }

    .text-sm {
        font-size: 0.8rem;
    }

    .feature-list li span {
      font-size: 1.1rem;
      color: #34d399; /* Emerald 400 */
      margin-top: 1px;
    }

    .emphasized {
      font-weight: 700;
      color: #86efac;
    }

    .green-highlight {
      color: #4ade80 !important;
    }

    .btn {
      width: 100%;
      padding: 0.85rem;
      border-radius: 12px;
      font-weight: 700;
      cursor: pointer;
      border: none;
      font-size: 0.95rem;
      transition: transform 0.2s;
    }

    .btn:hover {
      transform: translateY(-2px);
    }

    .btn-outline-light {
      background: transparent;
      border: 2px solid white;
      color: white;
    }

    .btn-outline-light:hover {
      background: white;
      color: #152961;
    }

    .btn-agent {
      background: white;
      color: #0f766e;
      border: none;
    }
    
    .btn-agent:hover {
      background: #f0fdfa;
    }

    @media (max-width: 768px) {
      .plans-grid {
        grid-template-columns: 1fr;
      }
      .plans-modal-container {
        padding: 1.5rem;
      }
    }
  `]
})
export class PlansModalComponent {
  public modalService = inject(ModalService);
}
