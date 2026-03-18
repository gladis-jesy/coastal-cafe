import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { FooterComponent } from '../../shared/components/footer/footer.component'

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FooterComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  private title = inject(Title);
  private meta = inject(Meta);

  constructor() {
    this.title.setTitle('Contact Us — Coastal Cafe | Colachel, Tamil Nadu');
    this.meta.updateTag({ name: 'description', content: 'Get in touch with Coastal Cafe in Colachel, Tamil Nadu. Find our location, phone number, and opening hours.' });
  }
}
