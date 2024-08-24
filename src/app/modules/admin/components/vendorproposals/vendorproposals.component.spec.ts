import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorproposalsComponent } from './vendorproposals.component';

describe('VendorproposalsComponent', () => {
  let component: VendorproposalsComponent;
  let fixture: ComponentFixture<VendorproposalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendorproposalsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VendorproposalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
