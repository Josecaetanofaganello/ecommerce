import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleReviewsService, GoogleReview } from '../../services/google-reviews.service';

@Component({
  selector: 'app-google-reviews',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="reviews-section">
      <div class="container">
        <h2>Avaliações dos Nossos Clientes</h2>
        <div class="overall-rating">
          <div class="rating-number">{{ averageRating }}</div>
          <div class="stars">
            <svg *ngFor="let star of [1,2,3,4,5]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" [class.filled]="star <= averageRating">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
          </div>
          <div class="total-reviews">Baseado em {{ totalReviews }} avaliações</div>
        </div>
        
        <div class="reviews-grid">
          <div class="review-card" *ngFor="let review of reviews">
            <div class="review-header">
              <img [src]="review.profile_photo_url" [alt]="review.author_name" class="reviewer-photo">
              <div class="reviewer-info">
                <h3>{{ review.author_name }}</h3>
                <div class="review-stars">
                  <svg *ngFor="let star of [1,2,3,4,5]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" [class.filled]="star <= review.rating">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                </div>
                <span class="review-date">{{ review.relative_time_description }}</span>
              </div>
            </div>
            <p class="review-text">{{ review.text }}</p>
          </div>
        </div>

        <div class="review-cta">
          <button (click)="openGoogleReviews()" class="write-review-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
            Deixe sua Avaliação
          </button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .reviews-section {
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
      margin-bottom: 2rem;
      color: #2c3e50;
      font-size: 2rem;
      font-weight: 600;
    }

    .overall-rating {
      text-align: center;
      margin-bottom: 3rem;
      padding: 2rem;
      background: white;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .rating-number {
      font-size: 3rem;
      font-weight: bold;
      color: #DB4437;
      margin-bottom: 0.5rem;
    }

    .stars {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      margin-bottom: 1rem;

      svg {
        width: 24px;
        height: 24px;
        fill: #e0e0e0;

        &.filled {
          fill: #FFC107;
        }
      }
    }

    .total-reviews {
      color: #666;
      font-size: 0.9rem;
    }

    .reviews-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .review-card {
      background: white;
      padding: 1.5rem;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }
    }

    .review-header {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .reviewer-photo {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      object-fit: cover;
    }

    .reviewer-info {
      h3 {
        margin: 0;
        font-size: 1rem;
        color: #2c3e50;
      }
    }

    .review-stars {
      display: flex;
      gap: 0.25rem;
      margin: 0.25rem 0;

      svg {
        width: 16px;
        height: 16px;
        fill: #e0e0e0;

        &.filled {
          fill: #FFC107;
        }
      }
    }

    .review-date {
      font-size: 0.8rem;
      color: #666;
    }

    .review-text {
      color: #444;
      font-size: 0.9rem;
      line-height: 1.5;
      margin: 0;
    }

    .review-cta {
      text-align: center;
      margin-top: 2rem;
    }

    .write-review-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      background-color: #DB4437;
      color: white;
      border: none;
      border-radius: 25px;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 2px 10px rgba(219, 68, 55, 0.3);

      svg {
        width: 20px;
        height: 20px;
        fill: currentColor;
      }

      &:hover {
        background-color: darken(#DB4437, 10%);
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(219, 68, 55, 0.4);
      }
    }

    @media (max-width: 768px) {
      .reviews-grid {
        grid-template-columns: 1fr;
      }

      .review-card {
        padding: 1rem;
      }

      .rating-number {
        font-size: 2.5rem;
      }
    }
  `]
})
export class GoogleReviewsComponent implements OnInit {
  reviews: GoogleReview[] = [];
  averageRating: number = 0;
  totalReviews: number = 0;

  private readonly GOOGLE_REVIEW_URL = 'https://www.google.com/maps/search/?api=1&query=Premium+Computadores+sorriso+MT/';

  constructor(private reviewsService: GoogleReviewsService) {}

  ngOnInit() {
    this.loadGoogleReviews();
  }

  private loadGoogleReviews() {
    this.reviewsService.getPlaceDetails().subscribe({
      next: (data) => {
        this.reviews = data.result.reviews;
        this.averageRating = data.result.rating;
        this.totalReviews = data.result.user_ratings_total;
      },
      error: (error) => {
        console.error('Error loading reviews:', error);
        // Fallback to example reviews if API fails
        this.loadExampleReviews();
      }
    });
  }

  private loadExampleReviews() {
    this.reviews = [
      {
        author_name: 'Loana Cristina',
        rating: 5,
        text: 'Atendimento maravilhoso, pessoal muito educado, um trabalho responsável e preciso super indico',
        relative_time_description: 'há mais de 1 mês',
        profile_photo_url: 'https://lh3.googleusercontent.com/a/default-user'
      },
      {
        author_name: 'Marceli Antoni Cotrim Ferro Filho',
        rating: 5,
        text: 'Atendimento excelente, respeitoso, bem humorado. Ambiente ok, realizam orçamentos bem rápido, mesmo quando o problema parece ser complicado.',
        relative_time_description: 'há 2 semanas',
        profile_photo_url: 'https://lh3.googleusercontent.com/a/default-user'
      },
      {
        author_name: 'Germano Ricardi',
        rating: 5,
        text: 'Excelente atendimento e preço bom!',
        relative_time_description: 'há mais de 1 ano',
        profile_photo_url: 'https://lh3.googleusercontent.com/a/default-user'
      }
    ];
    this.averageRating = 4.8;
    this.totalReviews = 14;
  }

  openGoogleReviews() {
    window.open(this.GOOGLE_REVIEW_URL, '_blank');
  }
} 