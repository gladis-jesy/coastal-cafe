import { Injectable, inject } from '@angular/core';
import { forkJoin, BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { Food, Category, Review, ApiResponse } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private apiService = inject(ApiService);


  private foodDataSubject = new BehaviorSubject<Food[]>([]);
  private categoryDataSubject = new BehaviorSubject<Category[]>([]);
  private googleReviewsSubject = new BehaviorSubject<Review[]>([]);

  public foodData$ = this.foodDataSubject.asObservable();
  public categoryData$ = this.categoryDataSubject.asObservable();
  public googleReviews$ = this.googleReviewsSubject.asObservable();

  /**
   * Fires all three API requests in parallel via forkJoin so the app pays one network
   * round-trip latency instead of three sequential ones. forkJoin is preferred over
   * combineLatest here because we only need a single snapshot on startup, not ongoing
   * synchronisation.
   *
   * The dual Array.isArray / .results check normalises two possible shapes the API may
   * return (paginated ApiResponse wrapper vs. raw array) without requiring a separate
   * adapter layer for each endpoint.
   */
  loadInitialData(): void {
    forkJoin([
      this.apiService.get<ApiResponse<Food> | Food[]>('https://coastalcafe.in/api/foods/?all=true'),
      this.apiService.get<ApiResponse<Category> | Category[]>('https://coastalcafe.in/api/food-categories/?all=true'),
      this.apiService.get<ApiResponse<Review> | Review[]>('https://coastalcafe.in/api/google-reviews/?all=true')
    ]).subscribe({
      next: ([foodsResponse, categoriesResponse, reviewsResponse]) => {
        this.foodDataSubject.next(
          Array.isArray(foodsResponse) ? foodsResponse : (foodsResponse as ApiResponse<Food>).results ?? []
        );
        this.categoryDataSubject.next(
          Array.isArray(categoriesResponse) ? categoriesResponse : (categoriesResponse as ApiResponse<Category>).results ?? []
        );
        this.googleReviewsSubject.next(
          Array.isArray(reviewsResponse) ? reviewsResponse : (reviewsResponse as ApiResponse<Review>).results ?? []
        );
      },
      error: (error) => {
        console.error('Error loading initial data', error);
      }
    });
  }
}
