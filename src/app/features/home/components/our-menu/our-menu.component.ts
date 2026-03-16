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
