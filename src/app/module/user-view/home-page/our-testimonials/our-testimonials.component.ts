import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SharedDataService } from '../../../../shared/shared-data.service'; // adjust path as needed
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-our-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './our-testimonials.component.html',
  styleUrls: ['./our-testimonials.component.css']
})
export class OurTestimonialsComponent implements OnInit, OnDestroy {

  currentPage = 0;
  pageSize = 3;
  visibleTestimonials: any[] = [];
  intervalId: any;
  testimonials: any[] = [];
  reviewSubscription!: Subscription;
  expandedIndexes: Set<number> = new Set();
  constructor(
    private sharedDataService: SharedDataService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.reviewSubscription = this.sharedDataService.googleReviews$.subscribe(reviews => {
      this.testimonials = reviews;
      this.updateVisible();
    });

    if (isPlatformBrowser(this.platformId)) {
      this.autoSlide();
    }
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    this.reviewSubscription.unsubscribe();
  }

  get totalPages(): number {
    return Math.ceil(this.testimonials.length / this.pageSize);
  }

  updateVisible() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.visibleTestimonials = this.testimonials.slice(start, end);
  }

  next() {
    this.currentPage = (this.currentPage + 1) % this.totalPages;
    this.updateVisible();
  }

  prev() {
    this.currentPage = (this.currentPage - 1 + this.totalPages) % this.totalPages;
    this.updateVisible();
  }

  autoSlide() {
    this.intervalId = setInterval(() => {
      this.next();
    }, 2000);
  }

  goTo(index: number): void {
    this.currentPage = index;
    this.updateVisible();
  }

  toggleExpand(index: number): void {
    if (this.expandedIndexes.has(index)) {
      this.expandedIndexes.delete(index);
    } else {
      this.expandedIndexes.add(index);
    }
  }

}
