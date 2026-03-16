import { Component } from '@angular/core';
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
  isMenuOpen = false;
}
