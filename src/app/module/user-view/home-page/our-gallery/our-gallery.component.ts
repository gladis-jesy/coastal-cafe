import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-our-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './our-gallery.component.html',
  styleUrl: './our-gallery.component.css'
})
export class OurGalleryComponent {
  galleryImages: string[] = [
    'cafe-pic-1.jpg',
    'cafe-pic-2.jpg',
    'cafe-pic-3.jpg',
    'cafe-pic-4.jpg'
  ];
  
  lightboxOpen: boolean = false;
  currentIndex: number = 0;
  
  openLightbox(index: number): void {
    this.currentIndex = index;
    this.lightboxOpen = true;
  }
  
  closeLightbox(): void {
    this.lightboxOpen = false;
  }
  
  nextImage(event: Event): void {
    event.stopPropagation();
    this.currentIndex = (this.currentIndex + 1) % this.galleryImages.length;
  }
  
  prevImage(event: Event): void {
    event.stopPropagation();
    this.currentIndex =
      (this.currentIndex - 1 + this.galleryImages.length) % this.galleryImages.length;
  }
  
}
