import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorfinancialoverviewComponent } from './vendorfinancialoverview.component';

describe('VendorfinancialoverviewComponent', () => {
  let component: VendorfinancialoverviewComponent;
  let fixture: ComponentFixture<VendorfinancialoverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendorfinancialoverviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VendorfinancialoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
