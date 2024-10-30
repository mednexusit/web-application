import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorregistrantmanagementComponent } from './vendorregistrantmanagement.component';

describe('VendorregistrantmanagementComponent', () => {
  let component: VendorregistrantmanagementComponent;
  let fixture: ComponentFixture<VendorregistrantmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendorregistrantmanagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VendorregistrantmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
