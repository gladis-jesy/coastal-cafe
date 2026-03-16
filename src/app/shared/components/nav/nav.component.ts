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

  constructor() {
    this.router.events.subscribe(() => {
      this.isHomePage = this.router.url === '/' || this.router.url === '/home';
    });
  }
}
