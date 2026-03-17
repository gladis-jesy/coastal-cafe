import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { RouterModule } from '@angular/router';
import { SubNavComponent } from '../../../../../src/app/shared/components/nav/sub-nav/sub-nav.component';
import { SearchService } from '../../../../../src/app/core/services/search.service';
import { CartService } from '../../../../../src/app/core/services/cart.service';

describe('SubNavComponent', () => {
  let component: SubNavComponent;
  let fixture: ComponentFixture<SubNavComponent>;
  let searchServiceSpy: jasmine.SpyObj<SearchService>;
  let cartServiceSpy: jasmine.SpyObj<CartService>;

  beforeEach(async () => {
    searchServiceSpy = jasmine.createSpyObj('SearchService', ['setQuery', 'clearSearch']);
    cartServiceSpy = jasmine.createSpyObj('CartService', ['toggleCart'], {
      cartCount$: new BehaviorSubject(0).asObservable()
    });

    await TestBed.configureTestingModule({
      imports: [SubNavComponent, RouterModule.forRoot([])],
      providers: [
        { provide: SearchService, useValue: searchServiceSpy },
        { provide: CartService, useValue: cartServiceSpy }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(SubNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 4 menu items', () => {
    expect(component.menuItem.length).toBe(4);
  });

  describe('toggleMenu()', () => {
    it('should open the menu when closed', () => {
      component.toggleMenu();
      expect(component.isMenuOpen).toBeTrue();
    });

    it('should close the menu when open', () => {
      component.isMenuOpen = true;
      component.toggleMenu();
      expect(component.isMenuOpen).toBeFalse();
    });
  });

  describe('selectMenu()', () => {
    it('should close the mobile menu', () => {
      component.isMenuOpen = true;
      component.selectMenu();
      expect(component.isMenuOpen).toBeFalse();
    });
  });

  describe('URL helper methods', () => {
    it('isMenuPage() returns true for /menu', () => {
      component.currentUrl = '/menu';
      expect(component.isMenuPage()).toBeTrue();
    });

    it('isMenuPage() returns false for other URLs', () => {
      component.currentUrl = '/about-us';
      expect(component.isMenuPage()).toBeFalse();
    });

    it('isAboutPage() returns true for /about-us', () => {
      component.currentUrl = '/about-us';
      expect(component.isAboutPage()).toBeTrue();
    });

    it('isContactPage() returns true for /contact', () => {
      component.currentUrl = '/contact';
      expect(component.isContactPage()).toBeTrue();
    });
  });

  describe('toggleCart()', () => {
    it('should call cartService.toggleCart', () => {
      component.toggleCart();
      expect(cartServiceSpy.toggleCart).toHaveBeenCalled();
    });
  });

  describe('onSearchInput()', () => {
    it('should call searchService.setQuery with the current query', () => {
      component.searchQuery = 'burger';
      component.currentUrl = '/menu';
      component.onSearchInput();
      expect(searchServiceSpy.setQuery).toHaveBeenCalledWith('burger');
    });
  });

  describe('onScroll()', () => {
    it('should hide navbar when scrolling down past 80px', () => {
      component['lastScrollTop'] = 0;
      spyOnProperty(window, 'scrollY', 'get').and.returnValue(100);
      component.onScroll();
      expect(component.showNavbar).toBeFalse();
    });

    it('should show navbar when scrolling up', () => {
      component['lastScrollTop'] = 200;
      spyOnProperty(window, 'scrollY', 'get').and.returnValue(100);
      component.onScroll();
      expect(component.showNavbar).toBeTrue();
    });
  });
});
