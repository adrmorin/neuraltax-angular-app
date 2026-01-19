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
            <li><a routerLink="/">Home</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">About</a></li>
            <li><a routerLink="/dashboard" class="btn btn-login">Login</a></li>
          </ul>
        </nav>
      </div>
    </header>
  `,
    styles: []
})
export class HeaderComponent { }
