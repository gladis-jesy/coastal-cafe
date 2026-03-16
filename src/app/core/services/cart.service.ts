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
