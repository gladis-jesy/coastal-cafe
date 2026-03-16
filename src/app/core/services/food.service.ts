import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';
import { Food } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private apiService = inject(ApiService);

  private baseUrl = `${environment.apiBaseUrl}/foods`;

  getAllFoods(): Observable<Food[]> {
    return this.apiService.get<Food[]>(`${this.baseUrl}/?all=true`);
  }
}
