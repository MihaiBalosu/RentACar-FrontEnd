import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDealerListComponent } from './car-dealer-list.component';

describe('CarDealerListComponent', () => {
  let component: CarDealerListComponent;
  let fixture: ComponentFixture<CarDealerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarDealerListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarDealerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
