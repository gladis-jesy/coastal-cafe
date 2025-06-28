import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

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
  testimonials = [
    { name: 'Alice', feedback: 'Amazing coffee and vibe!', image: '/assets/alice.jpg' },
    { name: 'Bob', feedback: 'Perfect for studying and relaxing.', image: '/assets/bob.jpg' },
    { name: 'Charlie', feedback: 'Friendly staff and great food.', image: '/assets/charlie.jpg' },
    { name: 'Diana', feedback: 'Love the decor and ambience!', image: '/assets/diana.jpg' },
    { name: 'Ethan', feedback: 'Top place to chill in town.', image: '/assets/ethan.jpg' },
    { name: 'Fiona', feedback: 'Try their mocha – it’s divine!', image: '/assets/fiona.jpg' },
    { name: 'George', feedback: 'Cool people and cozy space.', image: '/assets/george.jpg' },
    { name: 'Hannah', feedback: 'Highly recommend for meetings.', image: '/assets/hannah.jpg' }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.updateVisible();
    if (isPlatformBrowser(this.platformId)) {
      this.autoSlide();
    }
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
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
}
