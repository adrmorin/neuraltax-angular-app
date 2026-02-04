import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/common/header.component';
import { FooterComponent } from '../components/common/footer.component';
import { ChatbotComponent } from '../components/chatbot/chatbot.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ChatbotComponent],
  template: `
    <div class="app-layout">
      <app-header />
      <main>
        <router-outlet />
      </main>
      <app-footer />
      <app-chatbot />
    </div>
  `,
  styles: []
})
export class LayoutComponent { }
