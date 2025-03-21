import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-maps-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="maps-button" (click)="openGoogleMaps()" title="Encontre-nos no Google Maps">
      <div class="maps-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      </div>
      <span class="tooltip">Localização</span>
    </div>
  `,
  styles: [`
    .maps-button {

  position: fixed;
  right: 20px;
  bottom: 100px;
  z-index: 1000;
      cursor: pointer;
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.1);

        .tooltip {
          opacity: 1;
          visibility: visible;
          transform: translateX(-100%) translateY(-50%);
        }
      }
    }

    .maps-icon {
      background-color: #4285F4;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);

      svg {
        width: 30px;
        height: 30px;
        color: white;
      }
    }

    .tooltip {
      position: absolute;
      right: 75px;
      top: 50%;
      background-color: #333;
      color: white;
      padding: 8px 12px;
      border-radius: 4px;
      font-size: 14px;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      transform: translateX(-80%) translateY(-50%);
      white-space: nowrap;

      &:after {
        content: '';
        position: absolute;
        right: -6px;
        top: 50%;
        transform: translateY(-50%);
        border-left: 6px solid #333;
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;
      }
    }

    @media (max-width: 768px) {
      .maps-button {
        bottom: 80px;
        right: 15px;
      }

      .maps-icon {
        width: 50px;
        height: 50px;

        svg {
          width: 25px;
          height: 25px;
        }
      }
    }
  `]
})
export class MapsButtonComponent {
  // Replace with your actual business address
  private readonly MAPS_ADDRESS = 'Premium Computadores,Sorriso+MT';

  openGoogleMaps(): void {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${this.MAPS_ADDRESS}`;
    window.open(mapsUrl, '_blank');
  }
} 