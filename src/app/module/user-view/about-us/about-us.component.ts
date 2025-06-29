import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { OurTestimonialsComponent } from '../../user-view/home-page/our-testimonials/our-testimonials.component';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [FooterComponent, OurTestimonialsComponent],
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {
  isMenuOpen = false;
}
