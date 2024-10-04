import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubadminsComponent } from './subadmins.component';

describe('SubadminsComponent', () => {
  let component: SubadminsComponent;
  let fixture: ComponentFixture<SubadminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubadminsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubadminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
