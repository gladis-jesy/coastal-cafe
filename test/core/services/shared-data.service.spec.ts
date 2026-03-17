import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { SharedDataService } from '../../../src/app/core/services/shared-data.service';
import { ApiService } from '../../../src/app/core/services/api.service';
import { Food, Category, Review, ApiResponse } from '../../../src/app/core/models/interfaces';

describe('SharedDataService', () => {
  let service: SharedDataService;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  const mockFoods: Food[] = [{ id: 1, name: 'Burger', price: 100, image: 'burger.jpg', category: 1 }];
  const mockCategories: Category[] = [{ id: 1, name: 'Fast Food' }];
  const mockReviews: Review[] = [{ customer_name: 'John', review_text: 'Great!' }];

  beforeEach(() => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['get']);
    TestBed.configureTestingModule({
      providers: [
        SharedDataService,
        { provide: ApiService, useValue: apiServiceSpy }
      ]
    });
    service = TestBed.inject(SharedDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit empty arrays before loadInitialData is called', () => {
    service.foodData$.subscribe(f => expect(f.length).toBe(0));
    service.categoryData$.subscribe(c => expect(c.length).toBe(0));
    service.googleReviews$.subscribe(r => expect(r.length).toBe(0));
  });

  it('should populate streams when response is a plain array', () => {
    apiServiceSpy.get.and.returnValues(of(mockFoods), of(mockCategories), of(mockReviews));
    service.loadInitialData();
    service.foodData$.subscribe(foods => expect(foods).toEqual(mockFoods));
    service.categoryData$.subscribe(cats => expect(cats).toEqual(mockCategories));
    service.googleReviews$.subscribe(reviews => expect(reviews).toEqual(mockReviews));
  });

  it('should unwrap results[] from a paginated ApiResponse', () => {
    const foodsResp: ApiResponse<Food> = { results: mockFoods, count: 1 };
    const catsResp: ApiResponse<Category> = { results: mockCategories };
    const reviewsResp: ApiResponse<Review> = { results: mockReviews };
    apiServiceSpy.get.and.returnValues(of(foodsResp), of(catsResp), of(reviewsResp));
    service.loadInitialData();
    service.foodData$.subscribe(foods => expect(foods).toEqual(mockFoods));
    service.categoryData$.subscribe(cats => expect(cats).toEqual(mockCategories));
  });

  it('should not throw on API error and leave streams empty', () => {
    apiServiceSpy.get.and.returnValue(throwError(() => new Error('Network error')));
    expect(() => service.loadInitialData()).not.toThrow();
    service.foodData$.subscribe(foods => expect(foods.length).toBe(0));
  });
});
