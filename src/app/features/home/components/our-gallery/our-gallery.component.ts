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
  
  lightboxOpen = false;
  currentIndex = 0;
  
  openLightbox(index: number): void {
    this.currentIndex = index;
    this.lightboxOpen = true;
  }
  
  closeLightbox(): void {
    this.lightboxOpen = false;
  }
  
  /**
   * stopPropagation prevents the click from bubbling to the lightbox backdrop, which
   * would immediately close the overlay the moment the user tries to advance to the
   * next image. Modulo wrapping creates an infinite loop without boundary checks.
   */
  nextImage(event: Event): void {
    event.stopPropagation();
    this.currentIndex = (this.currentIndex + 1) % this.galleryImages.length;
  }
  
  /**
   * Adding galleryImages.length before taking the modulo handles the negative index
   * that would result from decrementing past zero — JavaScript's % operator can return
   * negative values for negative operands, so this offset is required for correct wrap.
   */
  prevImage(event: Event): void {
    event.stopPropagation();
    this.currentIndex =
      (this.currentIndex - 1 + this.galleryImages.length) % this.galleryImages.length;
  }
  
}
