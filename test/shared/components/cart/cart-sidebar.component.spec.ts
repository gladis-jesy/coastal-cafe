import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { CartSidebarComponent } from '../../../../src/app/shared/components/cart/cart-sidebar.component';
import { CartService } from '../../../../src/app/core/services/cart.service';
import { CartItem } from '../../../../src/app/core/models/interfaces';

describe('CartSidebarComponent', () => {
  let component: CartSidebarComponent;
  let fixture: ComponentFixture<CartSidebarComponent>;
  let cartServiceSpy: jasmine.SpyObj<CartService>;

  const mockItem: CartItem = { id: 1, name: 'Burger', price: 100, image: 'burger.jpg', quantity: 2 };

  beforeEach(async () => {
    cartServiceSpy = jasmine.createSpyObj('CartService', [
      'updateQuantity', 'removeFromCart', 'closeCart', 'clearCart'
    ], {
      cartItems$: new BehaviorSubject<CartItem[]>([mockItem]).asObservable(),
      isCartOpen$: new BehaviorSubject<boolean>(false).asObservable(),
      cartTotal$: new BehaviorSubject<number>(200).asObservable()
    });

    await TestBed.configureTestingModule({
      imports: [CartSidebarComponent],
      providers: [{ provide: CartService, useValue: cartServiceSpy }]
    }).compileComponents();
    fixture = TestBed.createComponent(CartSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose cartItems$, cartTotal$, and isOpen$ from CartService', () => {
    expect(component.cartItems$).toBeTruthy();
    expect(component.cartTotal$).toBeTruthy();
    expect(component.isOpen$).toBeTruthy();
  });

  it('increment() should call updateQuantity with quantity + 1', () => {
    component.increment(mockItem);
    expect(cartServiceSpy.updateQuantity).toHaveBeenCalledWith(1, 3);
  });

  it('decrement() should call updateQuantity with quantity - 1', () => {
    component.decrement(mockItem);
    expect(cartServiceSpy.updateQuantity).toHaveBeenCalledWith(1, 1);
  });

  it('remove() should call removeFromCart with correct id', () => {
    component.remove(1);
    expect(cartServiceSpy.removeFromCart).toHaveBeenCalledWith(1);
  });

  it('close() should call closeCart', () => {
    component.close();
    expect(cartServiceSpy.closeCart).toHaveBeenCalled();
  });

  it('confirm_order() should call closeCart', () => {
    component.confirm_order();
    expect(cartServiceSpy.closeCart).toHaveBeenCalled();
  });

  it('clearAll() should call clearCart', () => {
    component.clearAll();
    expect(cartServiceSpy.clearCart).toHaveBeenCalled();
  });
});
