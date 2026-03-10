import { Component } from '@angular/core';
import { Schedule1AComponent } from '../../components/forms/schedule1-a/schedule1-a.component';

@Component({
    selector: 'app-schedule1-a-page',
    standalone: true,
    imports: [Schedule1AComponent],
    template: `
    <div class="page-container">
      <app-schedule1-a></app-schedule1-a>
    </div>
  `,
    styles: [`
    .page-container {
      padding: 20px;
      background-color: #f4f4f7;
      min-height: 100vh;
    }
  `]
})
export class Schedule1APageComponent { }
