import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorconferenceComponent } from './vendorconference.component';

describe('VendorconferenceComponent', () => {
  let component: VendorconferenceComponent;
  let fixture: ComponentFixture<VendorconferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendorconferenceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VendorconferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
