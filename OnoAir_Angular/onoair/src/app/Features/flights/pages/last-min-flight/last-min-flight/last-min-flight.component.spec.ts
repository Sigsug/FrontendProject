import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastMinFlightComponent } from './last-min-flight.component';

describe('LastMinFlightComponent', () => {
  let component: LastMinFlightComponent;
  let fixture: ComponentFixture<LastMinFlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastMinFlightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastMinFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
