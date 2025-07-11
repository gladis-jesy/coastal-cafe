import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { SharedDataService } from '../../../shared/shared-data.service';

@Component({
  selector: 'app-menu-page',
  standalone: true, 
  imports: [CommonModule, FormsModule, FooterComponent],
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.css']
})
export class MenuPageComponent implements OnInit {
  foodList: any[] = [];
  filteredProducts: any[] = [];
  categories: any[] = [];
  latestItems: any[] = [];
  priceFilter = 230;
  currentPage: number = 1;
  itemsPerPage: number = 20;

  constructor(private sharedDataService: SharedDataService) {}

  ngOnInit(): void {
    this.sharedDataService.foodData$.subscribe(data => {
      this.foodList = data.filter(item => item?.image != null);
      this.filteredProducts = [...this.foodList];
 
      const itemsWithImages = this.foodList.filter(item => item?.image != null);
  
      this.latestItems = this.getRandomItems(itemsWithImages, 5).map(item => ({
        name: item?.name,
        price: item?.price,
        image: item?.image
      }));
    });
  
    this.sharedDataService.categoryData$.subscribe(data => {
      this.categories = data;
    });
  }

  getRandomItems(arr: any[], count: number): any[] {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  filterByCategory(categoryInput: any) {
    const categoryArray = Array.isArray(categoryInput) ? categoryInput : [categoryInput];
    const categoryIds = categoryArray.map(cat => cat.id);
    this.filteredProducts = this.foodList.filter(product => categoryIds.includes(product.category));
  }

  showAll() {
    this.filteredProducts = [...this.foodList];
  }

  onPriceChange() {}

  applyFilter() {
    this.filteredProducts = this.foodList.filter(product => product.price <= this.priceFilter);
    this.currentPage = 1;
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
  
  
}
