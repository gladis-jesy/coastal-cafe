import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { OurSpecialsComponent } from '../../../../../src/app/features/home/components/our-specials/our-specials.component';
import { SharedDataService } from '../../../../../src/app/core/services/shared-data.service';
import { Food } from '../../../../../src/app/core/models/interfaces';

describe('OurSpecialsComponent', () => {
  let component: OurSpecialsComponent;
  let fixture: ComponentFixture<OurSpecialsComponent>;
  let foodDataSubject: BehaviorSubject<Food[]>;

  const mockFoods: Food[] = [
    { id: 1, name: 'Special Burger', price: 100, image: 'img1.jpg', category: 1, special: true },
    { id: 2, name: 'Regular Item', price: 80, image: 'img2.jpg', category: 1, special: false },
    { id: 3, name: 'Special Pizza', price: 120, image: 'img3.jpg', category: 2, special: true },
  ];

  beforeEach(async () => {
    foodDataSubject = new BehaviorSubject<Food[]>([]);
    await TestBed.configureTestingModule({
      imports: [OurSpecialsComponent],
      providers: [{
        provide: SharedDataService,
        useValue: { foodData$: foodDataSubject.asObservable() }
      }]
    }).compileComponents();
    fixture = TestBed.createComponent(OurSpecialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with empty specials and null selection', () => {
    expect(component.specials.length).toBe(0);
    expect(component.selectedSpecial).toBeNull();
  });

  it('should filter only foods marked as special', () => {
    foodDataSubject.next(mockFoods);
    expect(component.specials.length).toBe(2);
    expect(component.specials.every(f => f.special)).toBeTrue();
  });

  it('should auto-select the first special food', () => {
    foodDataSubject.next(mockFoods);
    expect(component.selectedSpecial).toEqual(mockFoods[0]);
  });

  it('should set selectedSpecial to null when no specials exist', () => {
    foodDataSubject.next([mockFoods[1]]);
    expect(component.selectedSpecial).toBeNull();
  });

  it('selectSpecial() should update selectedSpecial', () => {
    foodDataSubject.next(mockFoods);
    component.selectSpecial(mockFoods[2]);
    expect(component.selectedSpecial).toEqual(mockFoods[2]);
  });

  it('should unsubscribe on destroy', () => {
    spyOn(component['dataSubscription'], 'unsubscribe');
    component.ngOnDestroy();
    expect(component['dataSubscription'].unsubscribe).toHaveBeenCalled();
  });
});
