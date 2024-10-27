import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorcreateconferenceComponent } from './vendorcreateconference.component';

describe('VendorcreateconferenceComponent', () => {
  let component: VendorcreateconferenceComponent;
  let fixture: ComponentFixture<VendorcreateconferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendorcreateconferenceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VendorcreateconferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
