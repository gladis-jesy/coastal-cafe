import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { OurMenuComponent } from '../../../../../src/app/features/home/components/our-menu/our-menu.component';
import { SharedDataService } from '../../../../../src/app/core/services/shared-data.service';
import { Food, Category } from '../../../../../src/app/core/models/interfaces';

describe('OurMenuComponent', () => {
  let component: OurMenuComponent;
  let fixture: ComponentFixture<OurMenuComponent>;

  const mockCategories: Category[] = [
    { id: 1, name: 'Starters' },
    { id: 2, name: 'Mains' }
  ];

  const mockFoods: Food[] = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Food ${i + 1}`,
    price: 100 + i * 10,
    image: `food${i + 1}.jpg`,
    category: (i % 2) + 1
  }));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurMenuComponent],
      providers: [
        {
          provide: SharedDataService,
          useValue: {
            categoryData$: new BehaviorSubject<Category[]>(mockCategories).asObservable(),
            foodData$: new BehaviorSubject<Food[]>(mockFoods).asObservable()
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OurMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set activeCategory to the first category with > 5 items', () => {
    expect(component.activeCategory).toBe(1);
  });

  it('should populate menuItemsByCategory', () => {
    expect(Object.keys(component.menuItemsByCategory).length).toBeGreaterThan(0);
  });

  it('setActiveCategory() should update activeCategory', () => {
    component.setActiveCategory(mockCategories[1]);
    expect(component.activeCategory).toBe(2);
  });
});
