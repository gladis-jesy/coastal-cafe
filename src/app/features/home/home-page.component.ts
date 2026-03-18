import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
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
  private title = inject(Title);
  private meta = inject(Meta);

  constructor() {
    this.title.setTitle('Coastal Cafe — Seaside Dining in Colachel, Tamil Nadu');
    this.meta.updateTag({ name: 'description', content: 'Coastal Cafe is a modern seaside restaurant in Colachel, Tamil Nadu offering fresh seafood, coastal dishes, and stunning beach views.' });
  }
}
