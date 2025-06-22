import { Component } from '@angular/core';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [NgIf],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.css'
})
export class NavMenuComponent {
  isMenuOpen = false;
}
