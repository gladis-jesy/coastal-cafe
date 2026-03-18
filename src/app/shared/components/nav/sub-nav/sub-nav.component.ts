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

  /**
   * Clears the search state when leaving the menu route so a query typed on the menu
   * page doesn't silently pre-filter results when the user navigates back later.
   * NavigationEnd is filtered specifically because Router emits several intermediate
   * events (NavigationStart, RoutesRecognized, etc.) per navigation and we only want
   * to act once the destination URL is final.
   */
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

  /**
   * Auto-navigates to /menu when the user types from any other page so the search
   * results are always visible. Without this redirect the query would update the
   * SearchService but the current view wouldn't show the filtered list.
   */
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

  /**
   * Uses an 80px threshold (vs. the main-nav's 50px) because this secondary bar sits
   * lower in the stacking order and needs slightly more scroll distance before hiding
   * to avoid it disappearing before the hero section has cleared the viewport.
   * The upward-scroll reveal keeps filter/search controls accessible without forcing
   * users to scroll all the way back to the top.
   */
  @HostListener('window:scroll')
  onScroll(): void {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    this.showNavbar = scrollTop <= this.lastScrollTop || scrollTop < 80;
    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }
}
