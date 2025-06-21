import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sub-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sub-nav.component.html',
  styleUrl: './sub-nav.component.css'
})
export class SubNavComponent implements OnInit {
  isMenuOpen = false;
  showNavbar = true;
  private lastScrollTop = 0;
  currentUrl = '';

  menuItem = [
    { label: 'Home', path: '' },
    { label: 'Menu', path: 'menu' },
    { label: 'About Us', path: 'about-us' },
    { label: 'Contact', path: 'contact' }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.currentUrl = this.router.url;

    // Update URL on route change
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentUrl = event.url;
      });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  selectMenu(): void {
    this.isMenuOpen = false;
  }

  isMenuPage(): boolean {
    return this.currentUrl.includes('/menu');
  }
}
