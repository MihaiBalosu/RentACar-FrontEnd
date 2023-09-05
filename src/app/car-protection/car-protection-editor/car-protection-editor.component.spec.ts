import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarProtectionEditorComponent } from './car-protection-editor.component';

describe('CarProtectionEditorComponent', () => {
  let component: CarProtectionEditorComponent;
  let fixture: ComponentFixture<CarProtectionEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarProtectionEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarProtectionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
