import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewsfeedComponent } from './addnewsfeed.component';

describe('AddnewsfeedComponent', () => {
  let component: AddnewsfeedComponent;
  let fixture: ComponentFixture<AddnewsfeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddnewsfeedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddnewsfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
