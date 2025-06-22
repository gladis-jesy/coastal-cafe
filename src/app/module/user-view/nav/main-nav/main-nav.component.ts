import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './main-nav.component.html',
  styleUrl: './main-nav.component.css'
})
export class MainNavComponent implements OnInit{
  menuItem = [
    { label: 'Home', path: '' },
    { label: 'Menu', path: 'menu' },
    { label: 'About Us', path: 'about-us' },
    { label: 'Contact', path: 'contact' }
  ];

  menuOpen = false;
  showNavbar = true;

  private lastScrollTop = 0;

  ngOnInit() {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > this.lastScrollTop && currentScroll > 50) {
      this.showNavbar = false;
    } else {
      this.showNavbar = true;
    }

    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  selectMenu() {
    this.menuOpen = false;
  }
}
