import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddconferenceComponent } from './addconference.component';

describe('AddconferenceComponent', () => {
  let component: AddconferenceComponent;
  let fixture: ComponentFixture<AddconferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddconferenceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddconferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
