import { Injectable, signal, computed } from '@angular/core';
import { CartItem, Food } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly _cartItems = signal<CartItem[]>([]);
  private readonly _isCartOpen = signal(false);

  readonly cartItems = this._cartItems.asReadonly();
  readonly isCartOpen = this._isCartOpen.asReadonly();

  readonly cartCount = computed(() =>
    this._cartItems().reduce((sum, item) => sum + item.quantity, 0)
  );

  readonly cartTotal = computed(() =>
    this._cartItems().reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  /**
   * Mutates cart state immutably — avoids direct array mutation so all consumers
   * automatically receive a fresh reference, enabling OnPush change detection compatibility.
   * Incrementing quantity on an existing item keeps a single cart entry per product
   * rather than duplicate rows, which simplifies totalling and UI rendering.
   */
  addToCart(product: Food): void {
    const current = this._cartItems();
    const existing = current.find(item => item.id === product.id);
    if (existing) {
      this._cartItems.set(
        current.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      this._cartItems.set([
        ...current,
        { id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 }
      ]);
    }
  }

  removeFromCart(id: number): void {
    this._cartItems.update(items => items.filter(item => item.id !== id));
  }

  /**
   * Delegates to removeFromCart when quantity reaches zero so callers don't need to
   * know the deletion rule — the cart can never be left with a zero-quantity ghost entry
   * that would inflate the item count badge.
   */
  updateQuantity(id: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(id);
      return;
    }
    this._cartItems.update(items =>
      items.map(item => item.id === id ? { ...item, quantity } : item)
    );
  }

  clearCart(): void {
    this._cartItems.set([]);
  }

  openCart(): void {
    this._isCartOpen.set(true);
  }

  closeCart(): void {
    this._isCartOpen.set(false);
  }

  toggleCart(): void {
    this._isCartOpen.update(open => !open);
  }
}
