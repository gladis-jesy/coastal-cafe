import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MainNavComponent } from './main-nav/main-nav.component';
import { SubNavComponent } from './sub-nav/sub-nav.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule, MainNavComponent, SubNavComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent  {
  private router = inject(Router);

  isHomePage = true;

  /**
   * Subscribes in the constructor rather than ngOnInit because isHomePage must be
   * accurate before the first render — a late subscription would cause a flash where
   * the home-specific nav styles are missing on initial load.
   *
   * Router.url already reflects the settled route by the time the subscription callback
   * fires, so reading it directly here is safe without waiting for NavigationEnd.
   */
  constructor() {
    this.router.events.subscribe(() => {
      this.isHomePage = this.router.url === '/' || this.router.url === '/home';
    });
  }
}
