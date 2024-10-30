import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagenotificationComponent } from './messagenotification.component';

describe('MessagenotificationComponent', () => {
  let component: MessagenotificationComponent;
  let fixture: ComponentFixture<MessagenotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessagenotificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessagenotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
