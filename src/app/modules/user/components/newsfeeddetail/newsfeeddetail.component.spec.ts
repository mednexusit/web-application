import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsfeeddetailComponent } from './newsfeeddetail.component';

describe('NewsfeeddetailComponent', () => {
  let component: NewsfeeddetailComponent;
  let fixture: ComponentFixture<NewsfeeddetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsfeeddetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewsfeeddetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
