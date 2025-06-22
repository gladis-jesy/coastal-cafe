import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './module/user-view/nav/nav.component'; // ✅ Add this
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavComponent // ✅ Add nav to app root
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}
