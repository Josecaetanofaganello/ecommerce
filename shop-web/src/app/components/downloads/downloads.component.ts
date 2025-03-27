import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface DownloadItem {
  name: string;
  description: string;
  icon: string;
  downloadUrl: string;
  category: 'utilities' | 'security' | 'drivers' | 'remote';
  version?: string;
  size?: string;
}

@Component({
  selector: 'app-downloads',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="downloads-section">
      <div class="container">
        <h2>Downloads Úteis</h2>
        <p class="section-description">
          Softwares recomendados para manter seu computador funcionando perfeitamente.
        </p>

        <div class="categories">
          <button 
            *ngFor="let cat of categories" 
            (click)="selectCategory(cat.value)"
            [class.active]="selectedCategory === cat.value"
            class="category-btn">
            {{ cat.label }}
          </button>
        </div>

        <div class="downloads-grid">
          <div 
            *ngFor="let item of filteredDownloads" 
            class="download-card">
            <div class="download-icon" [innerHTML]="item.icon"></div>
            <div class="download-info">
              <h3>{{ item.name }}</h3>
              <p>{{ item.description }}</p>
              <div class="download-meta">
                <span *ngIf="item.version">Versão: {{ item.version }}</span>
                <span *ngIf="item.size">Tamanho: {{ item.size }}</span>
              </div>
            </div>
            <a [href]="item.downloadUrl" target="_blank" class="download-btn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
              </svg>
              Download
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .downloads-section {
      padding: 4rem 0;
      background-color: #f8f9fa;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    h2 {
      text-align: center;
      margin-bottom: 1rem;
      color: #2c3e50;
      font-size: 2rem;
      font-weight: 600;
    }

    .section-description {
      text-align: center;
      color: #666;
      margin-bottom: 2rem;
    }

    .categories {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 3rem;
      flex-wrap: wrap;
    }

    .category-btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 25px;
      background-color: #e9ecef;
      color: #495057;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.9rem;

      &:hover {
        background-color: #dee2e6;
      }

      &.active {
        background-color: #007bff;
        color: white;
      }
    }

    .downloads-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .download-card {
      background: white;
      border-radius: 10px;
      padding: 1.5rem;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      display: flex;
      flex-direction: column;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }
    }

    .download-icon {
      width: 48px;
      height: 48px;
      margin-bottom: 1rem;

      svg {
        width: 100%;
        height: 100%;
      }
    }

    .download-info {
      flex: 1;

      h3 {
        margin: 0 0 0.5rem;
        color: #2c3e50;
        font-size: 1.1rem;
      }

      p {
        color: #666;
        font-size: 0.9rem;
        margin: 0 0 1rem;
      }
    }

    .download-meta {
      display: flex;
      gap: 1rem;
      font-size: 0.8rem;
      color: #666;
      margin-bottom: 1rem;
    }

    .download-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      background-color: #28a745;
      color: white;
      border: none;
      border-radius: 25px;
      font-size: 0.9rem;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.3s ease;
      justify-content: center;

      svg {
        width: 20px;
        height: 20px;
      }

      &:hover {
        background-color: #218838;
        transform: translateY(-2px);
      }
    }

    @media (max-width: 768px) {
      .downloads-grid {
        grid-template-columns: 1fr;
      }

      .category-btn {
        padding: 0.5rem 1rem;
      }
    }
  `]
})
export class DownloadsComponent {
  selectedCategory: string = 'all';

  categories = [
    { label: 'Todos', value: 'all' },
    { label: 'Utilitários', value: 'utilities' },
    { label: 'Segurança', value: 'security' },
    { label: 'Drivers', value: 'drivers' },
    { label: 'Acesso Remoto', value: 'remote' }
  ];

  downloads: DownloadItem[] = [
    {
      name: 'CCleaner',
      description: 'Ferramenta de limpeza e otimização do sistema',
      icon: '<svg viewBox="0 0 24 24"><path fill="#5DBAE3" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>',
      downloadUrl: 'https://www.ccleaner.com/ccleaner/download',
      category: 'utilities',
      version: '6.15',
      size: '35 MB'
    },
    {
      name: 'ESET Antivirus',
      description: 'Proteção em tempo real contra vírus e malware',
      icon: '<svg viewBox="0 0 24 24"><path fill="#FF7800" d="M12 2L2 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-8-4z"/></svg>',
      downloadUrl: 'https://www.eset.com/br/antivirus-domestico/download-antivirus-gratis/',
      category: 'security',
      version: '18.0',
      size: '550 MB'
    },
    {
      name: 'AnyDesk',
      description: 'Software de acesso remoto rápido e seguro',
      icon: '<svg viewBox="0 0 24 24"><path fill="#EF443B" d="M21 12c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9 9-4.03 9-9z"/></svg>',
      downloadUrl: 'https://anydesk.com/pt/downloads',
      category: 'remote',
      version: '8.0',
      size: '3.5 MB'
    },
    {
      name: 'Driver Booster',
      description: 'Atualizador automático de drivers do sistema',
      icon: '<svg viewBox="0 0 24 24"><path fill="#00A650" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',
      downloadUrl: 'https://www.iobit.com/pt/driver-booster.php',
      category: 'drivers',
      version: '10.5',
      size: '50 MB'
    }
  ];

  get filteredDownloads() {
    return this.selectedCategory === 'all'
      ? this.downloads
      : this.downloads.filter(item => item.category === this.selectedCategory);
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }
} 