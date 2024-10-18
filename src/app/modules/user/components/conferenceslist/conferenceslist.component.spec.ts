import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConferenceslistComponent } from './conferenceslist.component';

describe('ConferenceslistComponent', () => {
  let component: ConferenceslistComponent;
  let fixture: ComponentFixture<ConferenceslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConferenceslistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConferenceslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
