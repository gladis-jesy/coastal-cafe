import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../core/services/cart.service';
import { CartItem } from '../../../core/models/interfaces';

@Component({
  selector: 'app-cart-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-sidebar.component.html'
})
export class CartSidebarComponent {
  private cartService = inject(CartService);

  readonly cartItems = this.cartService.cartItems;
  readonly cartTotal = this.cartService.cartTotal;
  readonly isOpen = this.cartService.isCartOpen;

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

  confirm_order(): void {
    this.cartService.closeCart();
  }

  clearAll(): void {
    this.cartService.clearCart();
  }
}
