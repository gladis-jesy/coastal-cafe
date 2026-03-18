import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { SharedDataService } from './shared-data.service';
import { Food } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private sharedDataService = inject(SharedDataService);

  private searchQuerySubject = new BehaviorSubject<string>('');

  searchQuery$: Observable<string> = this.searchQuerySubject.asObservable();

  filteredFoods$: Observable<Food[]>;

  /**
   * Builds the filtered foods observable here rather than in ngOnInit because this is a
   * root-level service with no lifecycle hooks. combineLatest ensures the filter re-runs
   * whenever either the food catalog or the search query changes, so downstream components
   * never need to manually trigger a refresh.
   *
   * debounceTime(300) prevents a new filter pass on every keystroke, reducing CPU churn
   * for large food lists. distinctUntilChanged avoids re-filtering when the query string
   * hasn't actually changed (e.g. focus/blur without typing).
   *
   * Items without an image are stripped here rather than in each component to ensure
   * incomplete API data never surfaces in the UI regardless of where results are rendered.
   */
  constructor() {
    this.filteredFoods$ = combineLatest([
      this.sharedDataService.foodData$,
      this.searchQuery$.pipe(debounceTime(300), distinctUntilChanged())
    ]).pipe(
      map(([foods, query]) => {
        const items = foods.filter(item => item.image != null);
        if (!query.trim()) return items;
        const lower = query.toLowerCase();
        return items.filter(food =>
          food.name.toLowerCase().includes(lower) ||
          food.description?.toLowerCase().includes(lower)
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
