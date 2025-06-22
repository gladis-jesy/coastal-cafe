import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-our-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './our-menu.component.html',
  styleUrl: './our-menu.component.css'
})
export class OurMenuComponent {
  categories = ['Snacks', 'Non Veg', 'BurgersVeg', 'BurgersNoodles'];
  activeCategory = 'Snacks';

  menuItems: any = {
    Snacks: [
      { name: 'Crab Lolipop(4pieces)', price: '₹160.00', image: 'crab_lolipop.jpg' },
      { name: 'Fish Fingers(5 Pieces)', price: '₹130.00', image: 'fish_fingers.jpg' },
      { name: 'Chicken Nuggets(6 Pieces)', price: '₹99.00', image: 'chicken-nuggets.jpg' },
      { name: 'Cheese Balls (7 Pieces)', price: '₹90.00', image: 'Cheese-Balls.jpg' },
      { name: 'French Fries', price: '₹70.00', image: 'French-Fries.jpg' },
    ],
    'Non Veg': [
      { name: 'Super Twin Fried Chicken Burger', price: '₹180.00', image: 'super_twin_fried_chicken_burger.jpg' },
      { name: 'Macaroni Chicken Burger', price: '₹150.00', image: 'macaroni_chicken_burger.jpg' },
      { name: 'Special CC Fried Chicken Burger', price: '₹130.00', image: 'special_cc_fried_chicken_burger.jpg' },
      { name: 'kiddy Chicken Burger', price: '₹80.00', image: 'kiddy_chicken-Burger.png' },
      { name: 'Egg Burger', price: '₹99.00', image: 'egg-burger.jpg' },
    ],
    BurgersVeg: [
      { name: 'Fried paneer Burger', price: '₹110.00', image: 'fried_panner_burger.jpg' },
      { name: 'Macaroni Cheese with Mushroom Burger', price: '₹140.00', image: 'macaroni_cheese_with_veg_mushroom_burger.jpg' },
      { name: 'Classic Veg Burger', price: '₹90.00', image: 'classic_veg_burger.png' },
      { name: 'Kiddy Veg Burger', price: '₹60.00', image: 'kiddy_veg_burger.jpg' },
    ],
    BurgersNoodles: [
      { name: 'Mixed Schezwan Noodles', price: '₹230.00', image:'mixed_schezwan_noodles.jpg' },
      { name: 'squid noodles', price: '₹190.00', image: 'squid_noodles.jpg' },
      { name: 'Chicken noodles', price: '₹190.00', image: 'chicken_noodles.jpg' },
      { name: 'Mushroom noodles', price: '₹110.00', image: 'mushroom_noodles.jpg' },
    ]
  };

  setActiveCategory(category: string): void {
    this.activeCategory = category;
  }
}
