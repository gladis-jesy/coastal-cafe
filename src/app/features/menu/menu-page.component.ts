import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { SharedDataService } from '../../core/services/shared-data.service';
import { SearchService } from '../../core/services/search.service';
import { CartService } from '../../core/services/cart.service';
import { Food, Category } from '../../core/models/interfaces';

@Component({
  selector: 'app-menu-page',
  standalone: true,
  imports: [CommonModule, FormsModule, FooterComponent],
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.css']
})
export class MenuPageComponent {
  private sharedDataService = inject(SharedDataService);
  private searchService = inject(SearchService);
  private cartService = inject(CartService);

 
  private readonly foodList = toSignal(this.searchService.filteredFoods$, { initialValue: [] as Food[] });
  readonly categories = toSignal(this.sharedDataService.categoryData$, { initialValue: [] as Category[] });

  readonly priceFilter = signal(230);
  readonly currentPage = signal(1);
  readonly itemsPerPage = signal(20);
  private readonly addedItemIds = signal(new Set<number>());
  private readonly selectedCategoryIds = signal<number[] | null>(null);
  private readonly priceFilterEnabled = signal(false);

  readonly latestItems = computed(() => {
    const withImages = this.foodList().filter(item => item?.image != null);
    return this.getRandomItems(withImages, 5).map(({ name, price, image }) => ({ name, price, image }));
  });

  readonly filteredProducts = computed(() => {
    const list = this.foodList();
    const catIds = this.selectedCategoryIds();
    if (catIds !== null) return list.filter(p => catIds.includes(p.category));
    if (this.priceFilterEnabled()) return list.filter(p => p.price <= this.priceFilter());
    return list;
  });

  readonly paginatedProducts = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage();
    return this.filteredProducts().slice(start, start + this.itemsPerPage());
  });

  readonly totalPages = computed(() =>
    Math.ceil(this.filteredProducts().length / this.itemsPerPage())
  );

  readonly visiblePageNumbers = computed(() => {
    const pagesToShow = 7;
    const half = Math.floor(pagesToShow / 2);
    const total = this.totalPages();
    const current = this.currentPage();

    let start = Math.max(current - half, 1);
    let end = start + pagesToShow - 1;
    if (end > total) { end = total; start = Math.max(end - pagesToShow + 1, 1); }

    const pages: number[] = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  });

  constructor() {
    effect(() => {
      this.foodList();       
      this.currentPage.set(1);
    });
  }

  filterByCategory(categoryInput: Category | Category[]): void {
    const ids = (Array.isArray(categoryInput) ? categoryInput : [categoryInput]).map(c => c.id);
    this.selectedCategoryIds.set(ids);
    this.priceFilterEnabled.set(false);
    this.currentPage.set(1);
  }

  showAll(): void {
    this.selectedCategoryIds.set(null);
    this.priceFilterEnabled.set(false);
    this.currentPage.set(1);
  }

  onPriceChange(): void {
    this.applyFilter();
  }

  applyFilter(): void {
    this.selectedCategoryIds.set(null);
    this.priceFilterEnabled.set(true);
    this.currentPage.set(1);
  }

  addToCart(product: Food): void {
    this.cartService.addToCart(product);
    this.cartService.openCart();
    this.addedItemIds.update(set => new Set(set).add(product.id));
    setTimeout(() => {
      this.addedItemIds.update(set => { const next = new Set(set); next.delete(product.id); return next; });
    }, 1500);
  }

  isAdded(productId: number): boolean {
    return this.addedItemIds().has(productId);
  }

  onItemsPerPageChange(event: Event): void {
    this.itemsPerPage.set(parseInt((event.target as HTMLSelectElement).value, 10));
    this.currentPage.set(1);
  }

  private getRandomItems(arr: Food[], count: number): Food[] {
    return [...arr].sort(() => 0.5 - Math.random()).slice(0, count);
  }
}
