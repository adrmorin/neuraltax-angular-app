import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AiToolsComponent } from '../components/dashboard/ai-tools.component';

@Component({
    selector: 'app-ai-tools-page',
    standalone: true,
    imports: [CommonModule, AiToolsComponent],
    template: `
    <div class="ai-tools-page">
        <app-ai-tools></app-ai-tools>
    </div>
    `,
    styles: [`
        .ai-tools-page {
            padding-bottom: 2rem;
        }
    `]
})
export class AiToolsPageComponent { }
