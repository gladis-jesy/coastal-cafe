import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutCafeComponent } from './about-cafe.component';

describe('AboutCafeComponent', () => {
  let component: AboutCafeComponent;
  let fixture: ComponentFixture<AboutCafeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutCafeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutCafeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
