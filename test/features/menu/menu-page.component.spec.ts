import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { RouterModule } from '@angular/router';
import { MenuPageComponent } from '../../../src/app/features/menu/menu-page.component';
import { SharedDataService } from '../../../src/app/core/services/shared-data.service';
import { SearchService } from '../../../src/app/core/services/search.service';
import { CartService } from '../../../src/app/core/services/cart.service';
import { Food, Category } from '../../../src/app/core/models/interfaces';

describe('MenuPageComponent', () => {
  let component: MenuPageComponent;
  let fixture: ComponentFixture<MenuPageComponent>;
  let filteredFoodsSubject: BehaviorSubject<Food[]>;
  let categoryDataSubject: BehaviorSubject<Category[]>;
  let cartServiceSpy: jasmine.SpyObj<CartService>;

  const mockFoods: Food[] = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    name: `Food ${i + 1}`,
    price: 100 + i * 10,
    image: `food${i + 1}.jpg`,
    category: (i % 3) + 1
  }));

  const mockCategories: Category[] = [
    { id: 1, name: 'Starters' },
    { id: 2, name: 'Mains' },
    { id: 3, name: 'Desserts' }
  ];

  beforeEach(async () => {
    filteredFoodsSubject = new BehaviorSubject<Food[]>(mockFoods);
    categoryDataSubject = new BehaviorSubject<Category[]>(mockCategories);
    cartServiceSpy = jasmine.createSpyObj('CartService', ['addToCart', 'openCart']);

    await TestBed.configureTestingModule({
      imports: [MenuPageComponent, RouterModule.forRoot([])],
      providers: [
        { provide: SearchService, useValue: { filteredFoods$: filteredFoodsSubject.asObservable() } },
        { provide: SharedDataService, useValue: { categoryData$: categoryDataSubject.asObservable() } },
        { provide: CartService, useValue: cartServiceSpy }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(MenuPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load food list from SearchService on init', () => {
    expect(component.foodList.length).toBe(25);
    expect(component.filteredProducts.length).toBe(25);
  });

  it('should load categories from SharedDataService on init', () => {
    expect(component.categories.length).toBe(3);
  });

  describe('paginatedProducts', () => {
    it('should return first 20 items by default', () => {
      expect(component.paginatedProducts.length).toBe(20);
    });

    it('should return remaining items on the last page', () => {
      component.currentPage = 2;
      expect(component.paginatedProducts.length).toBe(5);
    });
  });

  describe('totalPages', () => {
    it('should be ceil(total / itemsPerPage)', () => {
      expect(component.totalPages).toBe(2);
    });
  });

  describe('filterByCategory()', () => {
    it('should filter to only the selected category', () => {
      component.filterByCategory(mockCategories[0]);
      expect(component.filteredProducts.every(p => p.category === 1)).toBeTrue();
    });

    it('should reset to page 1', () => {
      component.currentPage = 2;
      component.filterByCategory(mockCategories[0]);
      expect(component.currentPage).toBe(1);
    });

    it('should support an array of categories', () => {
      component.filterByCategory([mockCategories[0], mockCategories[1]]);
      expect(component.filteredProducts.every(p => p.category === 1 || p.category === 2)).toBeTrue();
    });
  });

  describe('showAll()', () => {
    it('should restore all products', () => {
      component.filterByCategory(mockCategories[0]);
      component.showAll();
      expect(component.filteredProducts.length).toBe(25);
    });

    it('should reset to page 1', () => {
      component.currentPage = 2;
      component.showAll();
      expect(component.currentPage).toBe(1);
    });
  });

  describe('applyFilter()', () => {
    it('should filter products by max price', () => {
      component.priceFilter = 150;
      component.applyFilter();
      expect(component.filteredProducts.every(p => p.price <= 150)).toBeTrue();
    });
  });

  describe('onPriceChange()', () => {
    it('should delegate to applyFilter', () => {
      spyOn(component, 'applyFilter');
      component.onPriceChange();
      expect(component.applyFilter).toHaveBeenCalled();
    });
  });

  describe('addToCart()', () => {
    it('should call cartService.addToCart and openCart', () => {
      component.addToCart(mockFoods[0]);
      expect(cartServiceSpy.addToCart).toHaveBeenCalledWith(mockFoods[0]);
      expect(cartServiceSpy.openCart).toHaveBeenCalled();
    });

    it('isAdded() should return true immediately after adding', () => {
      component.addToCart(mockFoods[0]);
      expect(component.isAdded(mockFoods[0].id)).toBeTrue();
    });
  });

  describe('visiblePageNumbers', () => {
    it('should not exceed 7 entries', () => {
      expect(component.visiblePageNumbers.length).toBeLessThanOrEqual(7);
    });

    it('should include currentPage', () => {
      expect(component.visiblePageNumbers).toContain(component.currentPage);
    });
  });

  describe('onItemsPerPageChange()', () => {
    it('should update itemsPerPage and reset to page 1', () => {
      const mockEvent = { target: { value: '6' } } as unknown as Event;
      component.currentPage = 2;
      component.onItemsPerPageChange(mockEvent);
      expect(component.itemsPerPage).toBe(6);
      expect(component.currentPage).toBe(1);
    });
  });
});
