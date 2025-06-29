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

  constructor(private apiService: ApiService) {}

  loadInitialData(): void {
    console.log('Calling loadInitialData...');
    forkJoin([
      this.apiService.get<any>('https://coastalcafe.duckdns.org/api/foods/?all=true'),
      this.apiService.get<any>('https://coastalcafe.duckdns.org/api/food-categories/?all=true')
    ]).subscribe({
      next: ([foodsResponse, categoriesResponse]) => {
        const foods = Array.isArray(foodsResponse) ? foodsResponse : foodsResponse.results || [];
        const categories = Array.isArray(categoriesResponse) ? categoriesResponse : categoriesResponse.results || [];
  
        this.foodDataSubject.next(foods);
        this.categoryDataSubject.next(categories);
  
      },
      error: (error) => {
        console.error('Error loading initial data', error);
      }
    });
  }
  
}
