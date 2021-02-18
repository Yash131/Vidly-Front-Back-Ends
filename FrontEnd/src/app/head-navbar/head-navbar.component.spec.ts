import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadNavbarComponent } from './head-navbar.component';

describe('HeadNavbarComponent', () => {
  let component: HeadNavbarComponent;
  let fixture: ComponentFixture<HeadNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
