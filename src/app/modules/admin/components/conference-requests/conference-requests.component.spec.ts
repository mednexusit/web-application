import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConferenceRequestsComponent } from './conference-requests.component';

describe('ConferenceRequestsComponent', () => {
  let component: ConferenceRequestsComponent;
  let fixture: ComponentFixture<ConferenceRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConferenceRequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConferenceRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
