import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurTestimonialsComponent } from './our-testimonials.component';

describe('OurTestimonialsComponent', () => {
  let component: OurTestimonialsComponent;
  let fixture: ComponentFixture<OurTestimonialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurTestimonialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurTestimonialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
