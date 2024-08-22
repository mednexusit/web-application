import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowusComponent } from './followus.component';

describe('FollowusComponent', () => {
  let component: FollowusComponent;
  let fixture: ComponentFixture<FollowusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FollowusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FollowusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
