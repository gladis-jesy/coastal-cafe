import { Component, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { OurTestimonialsComponent } from '../home/components/our-testimonials/our-testimonials.component';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [FooterComponent, OurTestimonialsComponent],
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {
  private title = inject(Title);
  private meta = inject(Meta);

  isMenuOpen = false;

  constructor() {
    this.title.setTitle('About Us — Coastal Cafe | Our Story');
    this.meta.updateTag({ name: 'description', content: 'Learn about Coastal Cafe — a family-run seaside restaurant in Colachel, Tamil Nadu, passionate about fresh coastal cuisine and warm hospitality.' });
  }
}
