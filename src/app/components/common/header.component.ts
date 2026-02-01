import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header class="glass-header">
      <div class="container">
        <div class="logo">
          <img src="assets/neuraltax_logo.png" alt="NeuralTax AI" style="height: 35px" />
        </div>
        <nav>
          <ul>
            <li><a routerLink="/free-dashboard" class="btn btn-tier btn-free">Free</a></li>
            <li><a routerLink="/premium-dashboard" class="btn btn-tier btn-premium">Premium</a></li>
            <li><a routerLink="/agent" class="btn btn-tier btn-agente">Agente</a></li>
            <li><a routerLink="/dashboard" class="btn btn-tier btn-vip">VIP</a></li>
            <li><a routerLink="/login" class="btn btn-login">Login</a></li>
          </ul>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .btn-tier {
      padding: 0.5rem 1.25rem !important;
      border-radius: 8px !important;
      font-weight: 600 !important;
      font-size: 0.9rem !important;
      transition: all 0.3s ease !important;
      border: 2px solid transparent !important;
      text-decoration: none;
      display: inline-block;
    }

    .btn-free {
      background-color: #9ca3af !important;
      color: white !important;
    }

    .btn-free:hover {
      background-color: #6b7280 !important;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(156, 163, 175, 0.3);
    }

    .btn-premium {
      background-color: #688071 !important;
      color: white !important;
    }

    .btn-premium:hover {
      background-color: #576b5f !important;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(104, 128, 113, 0.4);
    }

    .btn-agente {
      background-color: #FF2400 !important; /* Rojo Escarlata Vibrante */
      color: white !important;
      border: 2px solid rgba(255, 255, 255, 0.4) !important;
    }

    .btn-agente:hover {
      background-color: #D81E00 !important;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(255, 36, 0, 0.4);
    }

    .btn-vip {
      background: #000000 !important;
      color: white !important;
      border: 2px solid rgba(255, 255, 255, 0.2) !important;
    }

    .btn-vip:hover {
      background: #1e293b !important;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    }

    .btn-login {
      background-color: transparent !important;
      color: white !important;
      border: 2px solid white !important;
      text-decoration: none;
    }

    .btn-login:hover {
      background-color: white !important;
      color: #1e293b !important;
    }
  `]
})
export class HeaderComponent { }

