import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem, Food } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  private isCartOpenSubject = new BehaviorSubject<boolean>(false);

  cartItems$: Observable<CartItem[]> = this.cartItemsSubject.asObservable();
  isCartOpen$: Observable<boolean> = this.isCartOpenSubject.asObservable();

  cartCount$: Observable<number> = this.cartItems$.pipe(
    map(items => items.reduce((sum, item) => sum + item.quantity, 0))
  );

  cartTotal$: Observable<number> = this.cartItems$.pipe(
    map(items => items.reduce((sum, item) => sum + item.price * item.quantity, 0))
  );

  /**
   * Mutates cart state immutably — avoids direct array mutation so all subscribers
   * automatically receive a fresh reference, enabling OnPush change detection compatibility.
   * Incrementing quantity on an existing item keeps a single cart entry per product
   * rather than duplicate rows, which simplifies totalling and UI rendering.
   */
  addToCart(product: Food): void {
    const current = this.cartItemsSubject.getValue();
    const existing = current.find(item => item.id === product.id);
    if (existing) {
      this.cartItemsSubject.next(
        current.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      this.cartItemsSubject.next([
        ...current,
        { id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 }
      ]);
    }
  }

  removeFromCart(id: number): void {
    const current = this.cartItemsSubject.getValue();
    this.cartItemsSubject.next(current.filter(item => item.id !== id));
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
    const current = this.cartItemsSubject.getValue();
    this.cartItemsSubject.next(
      current.map(item => item.id === id ? { ...item, quantity } : item)
    );
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
  }

  openCart(): void {
    this.isCartOpenSubject.next(true);
  }

  closeCart(): void {
    this.isCartOpenSubject.next(false);
  }

  toggleCart(): void {
    this.isCartOpenSubject.next(!this.isCartOpenSubject.getValue());
  }
}
