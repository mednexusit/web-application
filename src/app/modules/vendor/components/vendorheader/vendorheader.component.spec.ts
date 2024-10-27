import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorheaderComponent } from './vendorheader.component';

describe('VendorheaderComponent', () => {
  let component: VendorheaderComponent;
  let fixture: ComponentFixture<VendorheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendorheaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VendorheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
