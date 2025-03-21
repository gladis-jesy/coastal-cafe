import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{

  menuItem = ['Home', 'Menu', 'About Us', 'Contact'];
  menuOpen = false;

  ngOnInit(){

  }



  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  selectMenu() {
    this.menuOpen = false; // Close menu after selecting an item (for mobile)
  }

}
