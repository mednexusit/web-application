import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Education1Component } from './education1.component';

describe('Education1Component', () => {
  let component: Education1Component;
  let fixture: ComponentFixture<Education1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Education1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Education1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
