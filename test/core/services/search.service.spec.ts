import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { SearchService } from '../../../src/app/core/services/search.service';
import { SharedDataService } from '../../../src/app/core/services/shared-data.service';
import { Food } from '../../../src/app/core/models/interfaces';

describe('SearchService', () => {
  let service: SearchService;
  let foodDataSubject: BehaviorSubject<Food[]>;

  const mockFoods: Food[] = [
    { id: 1, name: 'Chicken Burger', price: 100, image: 'burger.jpg', category: 1, description: 'Tasty burger' },
    { id: 2, name: 'Veg Pizza', price: 200, image: 'pizza.jpg', category: 2 },
    { id: 3, name: 'Fish Fry', price: 150, image: 'fish.jpg', category: 3, description: 'Crispy fish' },
    { id: 4, name: 'No Image Item', price: 50, image: null as unknown as string, category: 1 },
  ];

  beforeEach(() => {
    foodDataSubject = new BehaviorSubject<Food[]>(mockFoods);
    TestBed.configureTestingModule({
      providers: [
        SearchService,
        { provide: SharedDataService, useValue: { foodData$: foodDataSubject.asObservable() } }
      ]
    });
    service = TestBed.inject(SearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should exclude foods without images when query is empty', fakeAsync(() => {
    let result: Food[] = [];
    service.filteredFoods$.subscribe(foods => result = foods);
    tick(300);
    expect(result.length).toBe(3);
    expect(result.every(f => f.image != null)).toBeTrue();
  }));

  it('should filter foods by name', fakeAsync(() => {
    let result: Food[] = [];
    service.setQuery('burger');
    service.filteredFoods$.subscribe(foods => result = foods);
    tick(300);
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Chicken Burger');
  }));

  it('should filter foods by description', fakeAsync(() => {
    let result: Food[] = [];
    service.setQuery('crispy');
    service.filteredFoods$.subscribe(foods => result = foods);
    tick(300);
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Fish Fry');
  }));

  it('should be case-insensitive', fakeAsync(() => {
    let result: Food[] = [];
    service.setQuery('PIZZA');
    service.filteredFoods$.subscribe(foods => result = foods);
    tick(300);
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Veg Pizza');
  }));

  it('should return all (with images) when query is whitespace', fakeAsync(() => {
    let result: Food[] = [];
    service.setQuery('   ');
    service.filteredFoods$.subscribe(foods => result = foods);
    tick(300);
    expect(result.length).toBe(3);
  }));

  it('clearSearch() should reset to show all foods with images', fakeAsync(() => {
    service.setQuery('pizza');
    tick(300);
    service.clearSearch();
    let result: Food[] = [];
    service.filteredFoods$.subscribe(foods => result = foods);
    tick(300);
    expect(result.length).toBe(3);
  }));

  it('setQuery() should update searchQuery$', fakeAsync(() => {
    service.setQuery('test');
    service.searchQuery$.subscribe(q => expect(q).toBe('test'));
  }));
});
