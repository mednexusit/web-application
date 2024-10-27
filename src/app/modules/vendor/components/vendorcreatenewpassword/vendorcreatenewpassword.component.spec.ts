import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorcreatenewpasswordComponent } from './vendorcreatenewpassword.component';

describe('VendorcreatenewpasswordComponent', () => {
  let component: VendorcreatenewpasswordComponent;
  let fixture: ComponentFixture<VendorcreatenewpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendorcreatenewpasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VendorcreatenewpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
