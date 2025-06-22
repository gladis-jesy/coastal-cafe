import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-our-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './our-testimonials.component.html',
  styleUrls: ['./our-testimonials.component.css']
})
export class OurTestimonialsComponent implements OnInit, OnDestroy {


  currentIndex = 0;
  visibleTestimonials :any[]= [];
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


  ngOnInit() {
    this.updateVisible();
    this.autoSlide();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  updateVisible() {
    const start = this.currentIndex;
    const end = start + 4;
    this.visibleTestimonials = this.testimonials.slice(start, end);
  }

  next() {
    this.currentIndex = (this.currentIndex + 4) % this.testimonials.length;
    this.updateVisible();
  }

  prev() {
    this.currentIndex = (this.currentIndex - 4 + this.testimonials.length) % this.testimonials.length;
    this.updateVisible();
  }

  autoSlide() {
    this.intervalId = setInterval(() => {
      this.next();
    }, 5000);
  }



}
