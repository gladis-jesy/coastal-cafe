import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './shared/components/nav/nav.component';
import { CommonModule } from '@angular/common';
import { SharedDataService } from './core/services/shared-data.service';
import { CartSidebarComponent } from './shared/components/cart/cart-sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavComponent,
    CartSidebarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private sharedDataService = inject(SharedDataService);


  ngOnInit(): void {
    this.sharedDataService.loadInitialData();
  }
}
