import { Injectable } from '@angular/core';
import { forkJoin, BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { Food, Category, Review, ApiResponse } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private foodDataSubject = new BehaviorSubject<Food[]>([]);
  private categoryDataSubject = new BehaviorSubject<Category[]>([]);
  private googleReviewsSubject = new BehaviorSubject<Review[]>([]);

  public foodData$ = this.foodDataSubject.asObservable();
  public categoryData$ = this.categoryDataSubject.asObservable();
  public googleReviews$ = this.googleReviewsSubject.asObservable();

  constructor(private apiService: ApiService) {}

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
