import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlUpcomingMoviesComponent } from './control-upcoming-movies.component';

describe('ControlUpcomingMoviesComponent', () => {
  let component: ControlUpcomingMoviesComponent;
  let fixture: ComponentFixture<ControlUpcomingMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlUpcomingMoviesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlUpcomingMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
