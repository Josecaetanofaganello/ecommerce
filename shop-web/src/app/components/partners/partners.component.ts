import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="partners-section">
      <div class="container">     
        <div class="partners-grid">
          <div class="partner-item" *ngFor="let partner of partners">
            <img [src]="partner.logo" [alt]="partner.name" [title]="partner.name">
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .partners-section {
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
      margin-bottom: 3rem;
      color: #2c3e50;
      font-size: 2rem;
      font-weight: 600;
    }

    .partners-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 2rem;
      justify-items: center;
      align-items: center;
    }

    .partner-item {
      transition: transform 0.3s ease;
      padding: 1rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      
      &:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      }

      img {
        max-width: 120px;
        height: auto;
        filter: grayscale(100%);
        opacity: 0.7;
        transition: all 0.3s ease;

        &:hover {
          filter: grayscale(0%);
          opacity: 1;
        }
      }
    }

    @media (max-width: 768px) {
      .partners-grid {
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        gap: 1.5rem;
      }

      .partner-item img {
        max-width: 80px;
      }
    }
  `]
})
export class PartnersComponent {
  partners = [
    {
      name: 'Intel',
      logo: 'assets/partners/intel-logo.svg'
    },
    {
      name: 'AMD',
      logo: 'assets/partners/amd-logo.svg'
    },
    {
      name: 'Epson',
      logo: 'assets/partners/epson-logo.svg'
    },
    
    {
      name: 'Gigabyte',
      logo: 'assets/partners/gigabyte-logo.svg'
    },
    
    {
      name: 'Dell',
      logo: 'assets/partners/dell-logo.svg'
    },    
    {
      name: 'LG',
      logo: 'assets/partners/lg-logo.svg'
    },
    {
      name: 'Western Digital',
      logo: 'assets/partners/western-digital-logo.svg'
    },
    {
      name: 'Logitech',
      logo: 'assets/partners/logitech-logo.svg'
    },
    {
      name: 'AOC',
      logo: 'assets/partners/aoc-logo.svg'
    },
    {
      name: 'Samsung',
      logo: 'assets/partners/samsung-logo.svg'
    },
    {
      name: 'Acer',
      logo: 'assets/partners/acer-logo.svg'
    },
    {
      name: 'Lenovo',
      logo: 'assets/partners/lenovo-logo.svg'
    },
    {
        name: 'ASUS',
        logo: 'assets/partners/asus-logo.svg'
    }
  ];
} 