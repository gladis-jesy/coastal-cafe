import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutCafeComponent } from './about-cafe/about-cafe.component';
import { OurMenuComponent } from './our-menu/our-menu.component';
import { OurSpecialsComponent } from './our-specials/our-specials.component';
import { OurGalleryComponent } from './our-gallery/our-gallery.component';
import { FooterComponent } from '../footer/footer.component';
import {OurTestimonialsComponent} from './our-testimonials/our-testimonials.component'

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
