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

  /**
   * autoSlide is guarded by isPlatformBrowser to prevent setInterval from running
   * during server-side rendering, where it would never be cleared and would cause
   * a memory leak in the Node process.
   */
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

  /**
   * Slices the full testimonials array rather than fetching a new page from the API
   * because all reviews are loaded upfront. This keeps navigation instant and avoids
   * flickering that would result from async page fetches.
   */
  updateVisible() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.visibleTestimonials = this.testimonials.slice(start, end);
  }

  /**
   * Modulo wrapping makes the carousel loop indefinitely, which is intentional for
   * the auto-slide use case — reaching the last page should silently cycle back to
   * the first rather than stopping.
   */
  next() {
    this.currentPage = (this.currentPage + 1) % this.totalPages;
    this.updateVisible();
  }

  /**
   * totalPages is added before the modulo to prevent a negative remainder when
   * currentPage is 0 — JS % does not guarantee a positive result for negative operands.
   */
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

  /**
   * A Set is used instead of a boolean array so arbitrary indices can be toggled
   * in O(1) without needing to pre-allocate an array sized to the testimonial count.
   * This also makes it trivial to check expansion state in the template with .has().
   */
  toggleExpand(index: number): void {
    if (this.expandedIndexes.has(index)) {
      this.expandedIndexes.delete(index);
    } else {
      this.expandedIndexes.add(index);
    }
  }

}
