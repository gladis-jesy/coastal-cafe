import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
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
export class MenuPageComponent implements OnInit, OnDestroy {
  foodList: Food[] = [];
  filteredProducts: Food[] = [];
  categories: Category[] = [];
  latestItems: Pick<Food, 'name' | 'price' | 'image'>[] = [];
  priceFilter = 230;
  currentPage: number = 1;
  itemsPerPage: number = 20;
  addedItemIds = new Set<number>();

  private subscriptions = new Subscription();

  constructor(
    private sharedDataService: SharedDataService,
    private searchService: SearchService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.searchService.filteredFoods$.subscribe(data => {
        this.foodList = data;
        this.filteredProducts = [...data];
        this.currentPage = 1;

        const itemsWithImages = data.filter(item => item?.image != null);
        this.latestItems = this.getRandomItems(itemsWithImages, 5).map(item => ({
          name: item?.name,
          price: item?.price,
          image: item?.image
        }));
      })
    );

    this.subscriptions.add(
      this.sharedDataService.categoryData$.subscribe(data => {
        this.categories = data;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getRandomItems(arr: any[], count: number): any[] {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  filterByCategory(categoryInput: Category | Category[]) {
    const categoryArray = Array.isArray(categoryInput) ? categoryInput : [categoryInput];
    const categoryIds = categoryArray.map(cat => cat.id);
    this.filteredProducts = this.foodList.filter(product => categoryIds.includes(product.category));
    this.currentPage = 1;
  }

  showAll() {
    this.filteredProducts = [...this.foodList];
    this.currentPage = 1;
  }

  onPriceChange() {}

  applyFilter() {
    this.filteredProducts = this.foodList.filter(product => product.price <= this.priceFilter);
    this.currentPage = 1;
  }

  addToCart(product: Food): void {
    this.cartService.addToCart(product);
    this.cartService.openCart();
    this.addedItemIds.add(product.id);
    setTimeout(() => this.addedItemIds.delete(product.id), 1500);
  }

  isAdded(productId: number): boolean {
    return this.addedItemIds.has(productId);
  }

  get paginatedProducts() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredProducts.slice(start, end);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }

  get visiblePageNumbers(): number[] {
    const pagesToShow = 7;
    const pages: number[] = [];
    const half = Math.floor(pagesToShow / 2);

    let start = Math.max(this.currentPage - half, 1);
    let end = start + pagesToShow - 1;

    if (end > this.totalPages) {
      end = this.totalPages;
      start = Math.max(end - pagesToShow + 1, 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }

  onItemsPerPageChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.itemsPerPage = parseInt(selectedValue, 10);
    this.currentPage = 1;
  }
}
