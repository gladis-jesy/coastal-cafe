import { TestBed } from '@angular/core/testing';
import { CartService } from '../../../src/app/core/services/cart.service';
import { Food } from '../../../src/app/core/models/interfaces';

describe('CartService', () => {
  let service: CartService;

  const mockFood: Food = { id: 1, name: 'Burger', price: 100, image: 'burger.jpg', category: 1 };
  const mockFood2: Food = { id: 2, name: 'Pizza', price: 200, image: 'pizza.jpg', category: 1 };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with an empty cart', () => {
    expect(service.cartItems().length).toBe(0);
  });

  describe('addToCart()', () => {
    it('should add a new item with quantity 1', () => {
      service.addToCart(mockFood);
      expect(service.cartItems().length).toBe(1);
      expect(service.cartItems()[0].quantity).toBe(1);
    });

    it('should increment quantity when the same item is added again', () => {
      service.addToCart(mockFood);
      service.addToCart(mockFood);
      expect(service.cartItems().length).toBe(1);
      expect(service.cartItems()[0].quantity).toBe(2);
    });

    it('should add multiple different items', () => {
      service.addToCart(mockFood);
      service.addToCart(mockFood2);
      expect(service.cartItems().length).toBe(2);
    });
  });

  describe('removeFromCart()', () => {
    it('should remove item by id', () => {
      service.addToCart(mockFood);
      service.removeFromCart(1);
      expect(service.cartItems().length).toBe(0);
    });

    it('should not affect other items', () => {
      service.addToCart(mockFood);
      service.addToCart(mockFood2);
      service.removeFromCart(1);
      expect(service.cartItems().length).toBe(1);
      expect(service.cartItems()[0].id).toBe(2);
    });
  });

  describe('updateQuantity()', () => {
    it('should update the item quantity', () => {
      service.addToCart(mockFood);
      service.updateQuantity(1, 5);
      expect(service.cartItems()[0].quantity).toBe(5);
    });

    it('should remove item when quantity is set to 0', () => {
      service.addToCart(mockFood);
      service.updateQuantity(1, 0);
      expect(service.cartItems().length).toBe(0);
    });

    it('should remove item when quantity is negative', () => {
      service.addToCart(mockFood);
      service.updateQuantity(1, -1);
      expect(service.cartItems().length).toBe(0);
    });
  });

  describe('clearCart()', () => {
    it('should empty the entire cart', () => {
      service.addToCart(mockFood);
      service.addToCart(mockFood2);
      service.clearCart();
      expect(service.cartItems().length).toBe(0);
    });
  });

  describe('cartCount', () => {
    it('should reflect total quantity across all items', () => {
      service.addToCart(mockFood);
      service.addToCart(mockFood);
      service.addToCart(mockFood2);
      expect(service.cartCount()).toBe(3);
    });

    it('should be 0 for an empty cart', () => {
      expect(service.cartCount()).toBe(0);
    });
  });

  describe('cartTotal', () => {
    it('should calculate the correct total price', () => {
      service.addToCart(mockFood);  // 100
      service.addToCart(mockFood);  // 100 * 2 = 200
      service.addToCart(mockFood2); // 200
      expect(service.cartTotal()).toBe(400);
    });

    it('should be 0 for an empty cart', () => {
      expect(service.cartTotal()).toBe(0);
    });
  });

  describe('cart open / close / toggle', () => {
    it('openCart() should set isCartOpen to true', () => {
      service.openCart();
      expect(service.isCartOpen()).toBeTrue();
    });

    it('closeCart() should set isCartOpen to false', () => {
      service.openCart();
      service.closeCart();
      expect(service.isCartOpen()).toBeFalse();
    });

    it('toggleCart() should switch from false to true', () => {
      service.toggleCart();
      expect(service.isCartOpen()).toBeTrue();
    });

    it('toggleCart() should switch from true to false', () => {
      service.openCart();
      service.toggleCart();
      expect(service.isCartOpen()).toBeFalse();
    });
  });
});
