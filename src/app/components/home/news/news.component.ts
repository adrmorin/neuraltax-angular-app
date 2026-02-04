import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-latest-news',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="latest-news">
      <div class="container">
        <div class="section-actions">
           <button class="btn-view-all">View All Articles</button>
        </div>
        
        <div class="section-header">
          <h2 class="section-title">Latest News & Tax Insights</h2>
          <p class="section-subtitle">Stay updated with the latest US tax regulations, AI-powered tax solutions, and IRS guidelines with our expert articles and comprehensive tax preparation guides.</p>
        </div>

        <div class="news-grid">
          @for (article of articles; track article.title) {
            <article class="news-card">
              <div class="card-image">
                <img [src]="article.image" [alt]="article.title">
                <span class="category-tag">{{ article.category }}</span>
              </div>
              <div class="card-content">
                <div class="article-meta">
                  <span class="date">{{ article.date }}</span>
                  <span class="read-time">{{ article.readTime }}</span>
                </div>
                <h3 class="article-title">{{ article.title }}</h3>
                <p class="article-excerpt">{{ article.excerpt }}</p>
                <a href="#" class="read-more">Read More &rsaquo;</a>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .latest-news {
      padding: 6rem 0;
      background: white;
    }
    .section-actions {
      display: flex;
      justify-content: center;
      margin-bottom: 4rem;
    }
    .btn-view-all {
       background: #688071;
       color: white;
       padding: 0.75rem 2.5rem;
       border-radius: 99px;
       border: none;
       font-weight: 600;
       cursor: pointer;
    }
    .section-header {
      text-align: center;
      margin-bottom: 4rem;
    }
    .section-title {
      font-size: 2.5rem;
      color: #182e6e;
      margin-bottom: 1rem;
    }
    .section-subtitle {
      max-width: 700px;
      margin: 0 auto;
      color: var(--text-secondary);
    }
    .news-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
    }
    .news-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0,0,0,0.05);
      border: 1px solid #f1f5f9;
      transition: transform 0.3s;
    }
    .news-card:hover {
      transform: translateY(-5px);
    }
    .card-image {
      height: 200px;
      position: relative;
    }
    .card-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .category-tag {
      position: absolute;
      top: 1rem;
      left: 1rem;
      background: rgba(104, 128, 113, 0.9);
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
      font-size: 0.7rem;
      font-weight: 600;
      text-transform: uppercase;
    }
    .card-content {
      padding: 1.5rem;
    }
    .article-meta {
      display: flex;
      justify-content: space-between;
      color: #94a3b8;
      font-size: 0.75rem;
      margin-bottom: 1rem;
    }
    .article-title {
      font-size: 1.25rem;
      color: #1e293b;
      margin-bottom: 1rem;
      line-height: 1.3;
      min-height: 3.5rem;
    }
    .article-excerpt {
      font-size: 0.85rem;
      color: #64748b;
      margin-bottom: 1.5rem;
      line-height: 1.5;
    }
    .read-more {
      color: #334155;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.85rem;
    }
    @media (max-width: 1200px) {
      .news-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 640px) {
      .news-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class LatestNewsComponent {
  articles = [
    {
      title: 'AI-Powered Tax Preparation:',
      excerpt: 'Discover how artificial intelligence is transforming US tax preparation, from automated...',
      category: 'AI Technology',
      date: 'January 15, 2024',
      readTime: '6 min read',
      image: 'assets/news/ai-tech.png'
    },
    {
      title: 'Maximizing US Tax Deductions: 2024 IRS',
      excerpt: 'Learn the latest IRS deduction strategies for 2024 and how AI-powered tools can identify...',
      category: 'IRS Guidelines',
      date: 'January 12, 2024',
      readTime: '8 min read',
      image: 'assets/news/irs-guidelines.png'
    },
    {
      title: 'Form 1040 Made Simple: AI-',
      excerpt: 'Navigate the complexities of US tax forms with AI assistance. From Schedule C to Form 8829...',
      category: 'Tax Forms',
      date: 'January 8, 2024',
      readTime: '7 min read',
      image: 'assets/news/tax-forms.png'
    },
    {
      title: 'Smart Tax Technology: The',
      excerpt: 'Explore cutting-edge tax preparation technology that\'s reshaping the industry. From...',
      category: 'Innovation',
      date: 'January 5, 2024',
      readTime: '5 min read',
      image: 'assets/news/innovation.png'
    }
  ];
}
