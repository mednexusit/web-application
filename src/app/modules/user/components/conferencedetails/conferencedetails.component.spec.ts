import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConferencedetailsComponent } from './conferencedetails.component';

describe('ConferencedetailsComponent', () => {
  let component: ConferencedetailsComponent;
  let fixture: ComponentFixture<ConferencedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConferencedetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConferencedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
