import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorsidenavComponent } from './vendorsidenav.component';

describe('VendorsidenavComponent', () => {
  let component: VendorsidenavComponent;
  let fixture: ComponentFixture<VendorsidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendorsidenavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VendorsidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
