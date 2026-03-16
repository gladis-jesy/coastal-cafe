import { Component, HostListener, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SearchService } from '../../../../core/services/search.service';
import { CartService } from '../../../../core/services/cart.service';

@Component({
  selector: 'app-sub-nav',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './sub-nav.component.html',
  styleUrl: './sub-nav.component.css'
})
export class SubNavComponent implements OnInit {
  private router = inject(Router);
  private searchService = inject(SearchService);
  private cartService = inject(CartService);

  isMenuOpen = false;
  showNavbar = true;
  private lastScrollTop = 0;
  currentUrl = '';
  searchQuery = '';
  cartCount$: Observable<number>;

  menuItem = [
    { label: 'Home', path: '' },
    { label: 'Menu', path: 'menu' },
    { label: 'About Us', path: 'about-us' },
    { label: 'Contact', path: 'contact' }
  ];

  constructor() {
    this.cartCount$ = this.cartService.cartCount$;
  }

  ngOnInit(): void {
    this.currentUrl = this.router.url;

    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = event.url;
        if (!event.url.startsWith('/menu')) {
          this.searchQuery = '';
          this.searchService.clearSearch();
        }
      });
  }

  toggleCart(): void {
    this.cartService.toggleCart();
  }

  onSearchInput(): void {
    this.searchService.setQuery(this.searchQuery);
    if (this.searchQuery.trim() && !this.currentUrl.startsWith('/menu')) {
      this.router.navigate(['/menu']);
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  selectMenu(): void {
    this.isMenuOpen = false;
  }

  isMenuPage(): boolean {
    return this.currentUrl.startsWith('/menu');
  }

  isAboutPage(): boolean {
    return this.currentUrl.startsWith('/about-us');
  }

  isContactPage(): boolean {
    return this.currentUrl.startsWith('/contact');
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    this.showNavbar = scrollTop <= this.lastScrollTop || scrollTop < 80;
    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }
}
