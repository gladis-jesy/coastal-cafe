import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedDataService } from '../../../../core/services/shared-data.service';
import { Food, Category } from '../../../../core/models/interfaces';
import { Subscription, combineLatest } from 'rxjs';

@Component({
  selector: 'app-our-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './our-menu.component.html',
  styleUrl: './our-menu.component.css'
})
export class OurMenuComponent implements OnInit, OnDestroy {
  private sharedDataService = inject(SharedDataService);

  activeCategory = 0;
  categories: Category[] = [];
  menuItemsByCategory: Record<number, Food[]> = {};

  private subscription = new Subscription();

  /**
   * combineLatest is used instead of separate subscriptions so the category map is
   * always rebuilt atomically when either stream emits — avoiding a render where
   * categories arrive but foods haven't yet (or vice versa), which would produce an
   * empty menu list.
   *
   * The >5 item threshold filters out stub or placeholder categories that have too few
   * items to be worth displaying as a full tab on the home page preview.
   *
   * The subscription is added to a Subscription container so ngOnDestroy can unsubscribe
   * in one call regardless of how many streams are composed here in the future.
   */
  ngOnInit(): void {
    const combinedSub = combineLatest([
      this.sharedDataService.categoryData$,
      this.sharedDataService.foodData$
    ]).subscribe(([categories, foods]) => {
      const categoryMap: Record<number, Food[]> = {};
  
      for (const item of foods) {
        if (item.category != null && item.image != null) {
          if (!categoryMap[item.category]) {
            categoryMap[item.category] = [];
          }
          categoryMap[item.category].push(item);
        }
      }
  
      this.categories = categories.filter(cat => categoryMap[cat.id]?.length > 5);
      this.menuItemsByCategory = categoryMap;
  
      if (this.categories.length) {
        this.activeCategory = this.categories[0].id;
      }
    });
  
    this.subscription.add(combinedSub);
  }

  setActiveCategory(category: Category): void {
    this.activeCategory = category.id;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
