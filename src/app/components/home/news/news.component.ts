import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-latest-news',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class LatestNewsComponent {
  articles = [
    {
      date: 'January 15, 2024',
      readTime: '6',
      image: 'assets/news/ai-tech.png'
    },
    {
      date: 'January 12, 2024',
      readTime: '8',
      image: 'assets/news/irs-guidelines.png'
    },
    {
      date: 'January 8, 2024',
      readTime: '7',
      image: 'assets/news/tax-forms.png'
    },
    {
      date: 'January 5, 2024',
      readTime: '5',
      image: 'assets/news/innovation.png'
    }
  ];
}
