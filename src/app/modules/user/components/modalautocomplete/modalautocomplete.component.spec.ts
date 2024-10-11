import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalautocompleteComponent } from './modalautocomplete.component';

describe('ModalautocompleteComponent', () => {
  let component: ModalautocompleteComponent;
  let fixture: ComponentFixture<ModalautocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalautocompleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalautocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
