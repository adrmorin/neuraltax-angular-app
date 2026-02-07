import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-stats-bar',
  standalone: true,
  imports: [TranslateModule],
  template: `
    <div class="stats-bar">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-value">98%</span>
            <span class="stat-label">{{ 'HOME.STATS.SATISFACTION' | translate }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">5,000+</span>
            <span class="stat-label">{{ 'HOME.STATS.CLIENTS' | translate }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">24/7</span>
            <span class="stat-label">{{ 'HOME.STATS.SUPPORT' | translate }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .stats-bar {
      background: white;
      padding: 3rem 0;
      border-top: 1px solid #f1f5f9;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      text-align: center;
    }
    .stat-item {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .stat-value {
      font-size: 2rem;
      font-weight: 800;
      color: #152961;
    }
    .stat-label {
      font-size: 0.9rem;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: 600;
    }
    @media (max-width: 640px) {
      .stats-grid { grid-template-columns: 1fr; gap: 3rem; }
    }
  `]
})
export class StatsBarComponent { }
