import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { PLATFORM_ID } from '@angular/core';
import { OurTestimonialsComponent } from '../../../../../src/app/features/home/components/our-testimonials/our-testimonials.component';
import { SharedDataService } from '../../../../../src/app/core/services/shared-data.service';
import { Review } from '../../../../../src/app/core/models/interfaces';

describe('OurTestimonialsComponent', () => {
  let component: OurTestimonialsComponent;
  let fixture: ComponentFixture<OurTestimonialsComponent>;
  let googleReviewsSubject: BehaviorSubject<Review[]>;

  const mockReviews: Review[] = [
    { customer_name: 'Alice', review_text: 'Excellent food!' },
    { customer_name: 'Bob', review_text: 'Very good.' },
    { customer_name: 'Charlie', review_text: 'Amazing experience.' },
    { customer_name: 'Diana', review_text: 'Loved it.' },
    { customer_name: 'Eve', review_text: 'Will come back.' },
    { customer_name: 'Frank', review_text: 'Great ambiance.' },
  ];

  beforeEach(async () => {
    googleReviewsSubject = new BehaviorSubject<Review[]>([]);
    await TestBed.configureTestingModule({
      imports: [OurTestimonialsComponent],
      providers: [
        { provide: SharedDataService, useValue: { googleReviews$: googleReviewsSubject.asObservable() } },
        { provide: PLATFORM_ID, useValue: 'server' }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(OurTestimonialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => clearInterval(component.intervalId));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load reviews from SharedDataService', () => {
    googleReviewsSubject.next(mockReviews);
    expect(component.testimonials.length).toBe(6);
  });

  it('totalPages should be ceil(total / pageSize)', () => {
    googleReviewsSubject.next(mockReviews);
    expect(component.totalPages).toBe(2);
  });

  it('updateVisible() should return the correct page slice', () => {
    googleReviewsSubject.next(mockReviews);
    component.currentPage = 0;
    component.updateVisible();
    expect(component.visibleTestimonials[0].customer_name).toBe('Alice');
    expect(component.visibleTestimonials.length).toBe(3);
  });

  it('updateVisible() should show the second page correctly', () => {
    googleReviewsSubject.next(mockReviews);
    component.currentPage = 1;
    component.updateVisible();
    expect(component.visibleTestimonials[0].customer_name).toBe('Diana');
  });

  it('next() should advance to the next page', () => {
    googleReviewsSubject.next(mockReviews);
    component.next();
    expect(component.currentPage).toBe(1);
  });

  it('next() should wrap to page 0 from the last page', () => {
    googleReviewsSubject.next(mockReviews);
    component.currentPage = 1;
    component.next();
    expect(component.currentPage).toBe(0);
  });

  it('prev() should go to the previous page', () => {
    googleReviewsSubject.next(mockReviews);
    component.currentPage = 1;
    component.prev();
    expect(component.currentPage).toBe(0);
  });

  it('prev() should wrap to the last page from page 0', () => {
    googleReviewsSubject.next(mockReviews);
    component.currentPage = 0;
    component.prev();
    expect(component.currentPage).toBe(1);
  });

  it('goTo() should set currentPage directly', () => {
    googleReviewsSubject.next(mockReviews);
    component.goTo(1);
    expect(component.currentPage).toBe(1);
  });

  it('toggleExpand() should add index to expandedIndexes', () => {
    component.toggleExpand(0);
    expect(component.expandedIndexes.has(0)).toBeTrue();
  });

  it('toggleExpand() should remove index if already expanded', () => {
    component.toggleExpand(0);
    component.toggleExpand(0);
    expect(component.expandedIndexes.has(0)).toBeFalse();
  });
});
