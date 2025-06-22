import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import{FooterComponent} from '../footer/footer.component'

@Component({
  selector: 'app-menu-page',
  standalone: true, 
  imports: [CommonModule,FormsModule,FooterComponent],
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.css']
})
export class MenuPageComponent {
  categories = [
    'Cold Coffee', 'Desserts', 'Falooda', 'Fresh Juice', 'Hot Drinks', 'Ice Cream', 'Ice Tea', 'Lassi',
    'Milk Shake', 'Mojito', 'Momos', 'Non Veg Burgers', 'Non Veg Fried Rice', 'Non Veg Pasta',
    'Non Veg Sandwich', 'Non Veg Wrap', 'Noodles', 'Non Veg Noodles', 'Veg Noodles', 'Pizza',
    'Non Veg Pizza', 'Veg Pizza', 'Shawarma', 'Snacks', 'Soup', 'Starter', 'Uncategorized',
    'Veg Burgers', 'Veg Fried Rice', 'Veg Pasta', 'Veg Sandwich', 'Veg Wrap'
  ];

  allProducts = [
    { name: 'Delicious Pizza', price: 120, image: 'chicken_pani_puri_shawarma.png', category: 'Non Veg Pizza' },
    { name: 'Veg Burger', price: 80, image: 'chicken_pani_puri_shawarma.png', category: 'Veg Burgers' },
    { name: 'Cold Coffee', price: 90, image: 'chicken_pani_puri_shawarma.png', category: 'Cold Coffee' },
    { name: 'Ice Cream Cone', price: 60, image: 'chicken_pani_puri_shawarma.png', category: 'Ice Cream' },
    { name: 'Veg Wrap', price: 70, image: 'chicken_pani_puri_shawarma.png', category: 'Veg Wrap' },
    { name: 'Lassi Special', price: 50, image: 'chicken_pani_puri_shawarma.png', category: 'Lassi' }
  ];


  latestItems = [
    {
      name: 'Wireless Earbuds',
      price: 1999,
      image: 'kiddy_veg_burger.jpg'
    },
    {
      name: 'Gaming Mouse',
      price: 1499,
      image: 'kiddy_veg_burger.jpg'
    },
    {
      name: 'Bluetooth Speaker',
      price: 2499,
      image: 'kiddy_veg_burger.jpg'
    },
    {
      name: 'Smart Watch',
      price: 3999,
      image: 'kiddy_veg_burger.jpg'
    },
    {
      name: 'USB-C Charger',
      price: 899,
      image: 'https://example.com/images/charger.jpg'
    },
    {
      name: 'Laptop Stand',
      price: 1199,
      image: 'https://example.com/images/stand.jpg'
    }
  ];
  

  products = [...this.allProducts]; // Shown products

  priceFilter = 230;

  filterByCategory(category: string) {
    this.products = this.allProducts.filter(p => p.category === category);
  }

  showAll() {
    this.products = [...this.allProducts];
  }

  onPriceChange() {
    // Optionally live preview price filter
  }

  applyFilter() {
    this.products = this.allProducts.filter(p => p.price <= this.priceFilter);
  }
}

