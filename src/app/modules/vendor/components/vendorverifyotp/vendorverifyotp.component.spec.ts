import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorverifyotpComponent } from './vendorverifyotp.component';

describe('VendorverifyotpComponent', () => {
  let component: VendorverifyotpComponent;
  let fixture: ComponentFixture<VendorverifyotpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendorverifyotpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VendorverifyotpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
