import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="review-button" (click)="openGoogleReview()" title="Avalie-nos no Google">
      <div class="review-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      </div>
      <span class="tooltip">Avalie-nos</span>
    </div>
  `,
  styles: [`
    .review-button {
      position: fixed;
      bottom: 180px;
      right: 20px;
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

    .review-icon {
      background-color: #DB4437;
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
      .review-button {
        bottom: 160px;
        right: 15px;
      }

      .review-icon {
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
export class ReviewButtonComponent {
  // Replace with your actual Google Review URL
  private readonly GOOGLE_REVIEW_URL = 'https://g.page/r/Premium-Computadores-Sorriso/review';

  openGoogleReview(): void {
    window.open(this.GOOGLE_REVIEW_URL, '_blank');
  }
} 