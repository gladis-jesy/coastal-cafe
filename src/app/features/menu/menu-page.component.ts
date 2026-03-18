import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
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
  private title = inject(Title);
  private meta = inject(Meta);
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

  /**
   * Picks a random subset on each signal update so the "latest picks" sidebar feels
   * fresh across sessions without requiring a dedicated API endpoint. Only items with
   * images are eligible to avoid blank cards in the sidebar panel.
   */
  readonly latestItems = computed(() => {
    const withImages = this.foodList().filter(item => item?.image != null);
    return this.getRandomItems(withImages, 5).map(({ name, price, image }) => ({ name, price, image }));
  });

  /**
   * Category filter takes precedence over price filter so the two modes are mutually
   * exclusive — applying both simultaneously would produce confusing results (e.g.,
   * "show only Starters under ₹230"). Callers reset the inactive filter before setting
   * the active one to enforce this invariant.
   */
  readonly filteredProducts = computed(() => {
    const list = this.foodList();
    const catIds = this.selectedCategoryIds();
    if (catIds !== null) return list.filter(p => catIds.includes(p.category));
    if (this.priceFilterEnabled()) return list.filter(p => p.price <= this.priceFilter());
    return list;
  });

  /**
   * Derived from filteredProducts rather than foodList so pagination always operates on
   * the post-filter set — changing filters resets currentPage to 1 (via the effect in
   * the constructor), preventing out-of-bounds page states after the total shrinks.
   */
  readonly paginatedProducts = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage();
    return this.filteredProducts().slice(start, start + this.itemsPerPage());
  });

  readonly totalPages = computed(() =>
    Math.ceil(this.filteredProducts().length / this.itemsPerPage())
  );

  /**
   * Limits the rendered page buttons to 7 to prevent the pagination bar from
   * overflowing on small screens. The window is recentred on the current page and
   * then clamped at both ends so it never shows page numbers beyond the actual total
   * or below 1 — the end-clamp also shifts the start leftward to keep exactly 7 buttons
   * visible when near the last pages.
   */
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
    this.title.setTitle('Menu — Coastal Cafe | Seafood & Coastal Dishes');
    this.meta.updateTag({ name: 'description', content: 'Browse the full menu at Coastal Cafe in Colachel, Tamil Nadu. Fresh seafood, coastal specials, and more — filter by category or price.' });

    /**
     * Resets to page 1 whenever the food list signal changes (search results or initial
     * load) so the user is never left looking at a now-empty page because their previous
     * page number exceeds the new total. foodList() is read here purely to register the
     * dependency — the value itself is not used.
     */
    effect(() => {
      this.foodList();
      this.currentPage.set(1);
    });
  }

  /**
   * Accepts both a single Category and an array to support two call sites: clicking a
   * single category tab and selecting multiple categories from a filter panel. Normalising
   * to an array of IDs here keeps filteredProducts' logic simple and uniform.
   * Price filter is disabled because the two filter modes are mutually exclusive.
   */
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

  /**
   * The addedItemIds set drives a temporary "Added!" visual state on the button.
   * It is stored as a signal containing a Set so Angular's change detection picks up
   * the mutation — a plain Set field would not trigger re-renders. The 1.5 s timeout
   * matches a typical animation duration so the confirmation disappears naturally
   * rather than being manually dismissed by the user.
   */
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

  /**
   * Spreads the array before sorting to avoid mutating the original signal-backed array,
   * which would cause unintended side effects in other computed signals that depend on it.
   */
  private getRandomItems(arr: Food[], count: number): Food[] {
    return [...arr].sort(() => 0.5 - Math.random()).slice(0, count);
  }
}
