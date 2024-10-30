import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorforgotpasswordComponent } from './vendorforgotpassword.component';

describe('VendorforgotpasswordComponent', () => {
  let component: VendorforgotpasswordComponent;
  let fixture: ComponentFixture<VendorforgotpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendorforgotpasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VendorforgotpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
