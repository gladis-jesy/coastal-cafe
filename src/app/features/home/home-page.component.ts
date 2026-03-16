import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutCafeComponent } from './components/about-cafe/about-cafe.component';
import { OurMenuComponent } from './components/our-menu/our-menu.component';
import { OurSpecialsComponent } from './components/our-specials/our-specials.component';
import { OurGalleryComponent } from './components/our-gallery/our-gallery.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { OurTestimonialsComponent } from './components/our-testimonials/our-testimonials.component'

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule, 
    AboutCafeComponent,
    OurMenuComponent,
    OurSpecialsComponent,
    OurGalleryComponent,
    FooterComponent,
    OurTestimonialsComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  
}
