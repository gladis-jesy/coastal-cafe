import { Component, OnInit, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SharedDataService } from '../../../../core/services/shared-data.service';
import { Review } from '../../../../core/models/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-our-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './our-testimonials.component.html',
  styleUrls: ['./our-testimonials.component.css']
})
export class OurTestimonialsComponent implements OnInit, OnDestroy {
  private sharedDataService = inject(SharedDataService);
  private platformId = inject(PLATFORM_ID);


  currentPage = 0;
  pageSize = 3;
  visibleTestimonials: Review[] = [];
  intervalId: ReturnType<typeof setInterval> | undefined;
  testimonials: Review[] = [];
  reviewSubscription!: Subscription;
  expandedIndexes = new Set<number>();

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
