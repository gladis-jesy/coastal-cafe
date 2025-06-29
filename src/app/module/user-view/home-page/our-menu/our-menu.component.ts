import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedDataService } from '../../../../shared/shared-data.service';
import { Subscription ,combineLatest} from 'rxjs';

@Component({
  selector: 'app-our-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './our-menu.component.html',
  styleUrl: './our-menu.component.css'
})
export class OurMenuComponent implements OnInit, OnDestroy {
  activeCategory = '';
  categories: any[] = [];
  menuItemsByCategory: { [key: string]: any[] } = {};

  private subscription = new Subscription();

  constructor(private sharedDataService: SharedDataService) {}

  ngOnInit(): void {
    const combinedSub = combineLatest([
      this.sharedDataService.categoryData$,
      this.sharedDataService.foodData$
    ]).subscribe(([categories, foods]) => {
      const categoryMap: { [key: number]: any[] } = {};
  
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

  setActiveCategory(category: any): void {
    this.activeCategory = category.id;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
