import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarProtectionListComponent } from './car-protection-list.component';

describe('CarProtectionListComponent', () => {
  let component: CarProtectionListComponent;
  let fixture: ComponentFixture<CarProtectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarProtectionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarProtectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
