import { Component } from '@angular/core';
import {NavMenuComponent} from '../nav-menu/nav-menu.component'
import { CommonModule } from '@angular/common'; 
import{FooterComponent} from '../footer/footer.component'

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [NavMenuComponent,FooterComponent],
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {
  isMenuOpen = false;
}
