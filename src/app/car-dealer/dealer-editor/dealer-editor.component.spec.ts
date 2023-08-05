import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerEditorComponent } from './dealer-editor.component';

describe('DealerEditorComponent', () => {
  let component: DealerEditorComponent;
  let fixture: ComponentFixture<DealerEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealerEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
