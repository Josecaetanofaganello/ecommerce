import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

export interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
  profile_photo_url: string;
}

export interface GooglePlaceDetails {
  result: {
    rating: number;
    user_ratings_total: number;
    reviews: GoogleReview[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class GoogleReviewsService {
  private readonly PLACE_ID = 'YOUR_GOOGLE_PLACE_ID'; // Replace with your actual Place ID
  private readonly API_KEY = environment.googlePlacesApiKey;
  private readonly API_URL = 'https://maps.googleapis.com/maps/api/place/details/json';

  constructor(private http: HttpClient) {}

  getPlaceDetails(): Observable<GooglePlaceDetails> {
    const params = {
      place_id: this.PLACE_ID,
      key: this.API_KEY,
      fields: 'rating,user_ratings_total,reviews'
    };

    return this.http.get<GooglePlaceDetails>(this.API_URL, { params });
  }
} 