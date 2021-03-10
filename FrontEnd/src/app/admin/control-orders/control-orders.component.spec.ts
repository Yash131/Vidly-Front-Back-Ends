import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlOrdersComponent } from './control-orders.component';

describe('ControlOrdersComponent', () => {
  let component: ControlOrdersComponent;
  let fixture: ComponentFixture<ControlOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
