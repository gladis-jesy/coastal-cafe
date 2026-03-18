import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './main-nav.component.html',
  styleUrl: './main-nav.component.css',
})
export class MainNavComponent {
  menuItem = [
    { label: 'Home', path: '' },
    { label: 'Menu', path: 'menu' },
    { label: 'About Us', path: 'about-us' },
    { label: 'Contact', path: 'contact' }
  ];

  menuOpen = false;
  showNavbar = true;
  private lastScrollTop = 0;

  /**
   * Hides the navbar on downward scroll to reclaim vertical space on smaller screens
   * while keeping it reachable the moment the user reverses direction. The 50px threshold
   * prevents an accidental hide on micro-scrolls at the very top of the page where the
   * hero content is visible and no reclamation is needed.
   *
   * lastScrollTop is clamped to 0 to avoid negative values on iOS rubber-band overscroll,
   * which would otherwise flip the direction check and hide the bar incorrectly.
   */
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
