import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOnEditorComponent } from './add-on-editor.component';

describe('AddOnEditorComponent', () => {
  let component: AddOnEditorComponent;
  let fixture: ComponentFixture<AddOnEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOnEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOnEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
