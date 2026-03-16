import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchQuerySubject = new BehaviorSubject<string>('');

  searchQuery$: Observable<string> = this.searchQuerySubject.asObservable();

  filteredFoods$: Observable<any[]>;

  constructor(private sharedDataService: SharedDataService) {
    this.filteredFoods$ = combineLatest([
      this.sharedDataService.foodData$,
      this.searchQuery$.pipe(debounceTime(300), distinctUntilChanged())
    ]).pipe(
      map(([foods, query]) => {
        const items = foods.filter(item => item?.image != null);
        if (!query.trim()) return items;
        const lower = query.toLowerCase();
        return items.filter(food =>
          food?.name?.toLowerCase().includes(lower) ||
          food?.description?.toLowerCase().includes(lower)
        );
      })
    );
  }

  setQuery(query: string): void {
    this.searchQuerySubject.next(query);
  }

  clearSearch(): void {
    this.searchQuerySubject.next('');
  }
}
