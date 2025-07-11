import { Injectable } from '@angular/core';
import { ApiService } from '../core/service/api.service';
import { forkJoin, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private foodDataSubject = new BehaviorSubject<any[]>([]);
  private categoryDataSubject = new BehaviorSubject<any[]>([]);

  public foodData$ = this.foodDataSubject.asObservable();
  public categoryData$ = this.categoryDataSubject.asObservable();
  private googleReviewsSubject = new BehaviorSubject<any[]>([]);
  public googleReviews$ = this.googleReviewsSubject.asObservable();
  constructor(private apiService: ApiService) {}

  loadInitialData(): void {
    forkJoin([
      this.apiService.get<any>('https://coastalcafe.in/api/foods/?all=true'),
      this.apiService.get<any>('https://coastalcafe.in/api/food-categories/?all=true'),
      this.apiService.get<any>('https://coastalcafe.in/api/google-reviews/?all=true')
    ]).subscribe({
      next: ([foodsResponse, categoriesResponse, reviewsResponse]) => {
        const foods = Array.isArray(foodsResponse) ? foodsResponse : foodsResponse.results || [];
        const categories = Array.isArray(categoriesResponse) ? categoriesResponse : categoriesResponse.results || [];
        const reviews = Array.isArray(reviewsResponse) ? reviewsResponse : reviewsResponse.results || [];
  
        this.foodDataSubject.next(foods);
        this.categoryDataSubject.next(categories);
        this.googleReviewsSubject.next(reviews);
      },
      error: (error) => {
        console.error('Error loading initial data', error);
      }
    });
  }
  
}
