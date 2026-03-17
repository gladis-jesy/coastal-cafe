import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FoodService } from '../../../src/app/core/services/food.service';
import { ApiService } from '../../../src/app/core/services/api.service';
import { Food } from '../../../src/app/core/models/interfaces';
import { environment } from '../../../src/environment/environment';

describe('FoodService', () => {
  let service: FoodService;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  const mockFoods: Food[] = [
    { id: 1, name: 'Burger', price: 100, image: 'burger.jpg', category: 1 },
    { id: 2, name: 'Pizza', price: 200, image: 'pizza.jpg', category: 2 }
  ];

  beforeEach(() => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['get']);
    TestBed.configureTestingModule({
      providers: [
        FoodService,
        { provide: ApiService, useValue: apiServiceSpy }
      ]
    });
    service = TestBed.inject(FoodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the correct API endpoint', () => {
    apiServiceSpy.get.and.returnValue(of(mockFoods));
    service.getAllFoods().subscribe();
    expect(apiServiceSpy.get).toHaveBeenCalledWith(`${environment.apiBaseUrl}/foods/?all=true`);
  });

  it('should return the list of foods from the API', () => {
    apiServiceSpy.get.and.returnValue(of(mockFoods));
    service.getAllFoods().subscribe(foods => {
      expect(foods).toEqual(mockFoods);
      expect(foods.length).toBe(2);
    });
  });
});
