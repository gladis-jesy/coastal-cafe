import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../core/services/cart.service';
import { CartItem } from '../../../core/models/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-sidebar.component.html'
})
export class CartSidebarComponent {
  cartItems$: Observable<CartItem[]>;
  cartTotal$: Observable<number>;
  isOpen$: Observable<boolean>;

  constructor(private cartService: CartService) {
    this.cartItems$ = this.cartService.cartItems$;
    this.cartTotal$ = this.cartService.cartTotal$;
    this.isOpen$ = this.cartService.isCartOpen$;
  }

  increment(item: CartItem): void {
    this.cartService.updateQuantity(item.id, item.quantity + 1);
  }

  decrement(item: CartItem): void {
    this.cartService.updateQuantity(item.id, item.quantity - 1);
  }

  remove(id: number): void {
    this.cartService.removeFromCart(id);
  }

  close(): void {
    this.cartService.closeCart();
  }

  confirm_order(){
    this.cartService.closeCart();
  }

  clearAll(): void {
    this.cartService.clearCart();
  }
}
