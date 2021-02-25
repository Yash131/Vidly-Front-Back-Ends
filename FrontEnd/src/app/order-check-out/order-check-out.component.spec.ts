import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCheckOutComponent } from './order-check-out.component';

describe('OrderCheckOutComponent', () => {
  let component: OrderCheckOutComponent;
  let fixture: ComponentFixture<OrderCheckOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderCheckOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCheckOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
