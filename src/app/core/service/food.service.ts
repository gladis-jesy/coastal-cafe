import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private baseUrl = `${environment.apiBaseUrl}/foods`;

  constructor(private apiService: ApiService) {}

  getAllFoods(): Observable<any> {
    return this.apiService.get<any>(`${this.baseUrl}/?all=true`);
  }
}
