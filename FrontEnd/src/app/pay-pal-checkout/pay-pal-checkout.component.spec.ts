import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayPalCheckoutComponent } from './pay-pal-checkout.component';

describe('PayPalCheckoutComponent', () => {
  let component: PayPalCheckoutComponent;
  let fixture: ComponentFixture<PayPalCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayPalCheckoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayPalCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
