import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaofinterestsubsubjectComponent } from './areaofinterestsubsubject.component';

describe('AreaofinterestsubsubjectComponent', () => {
  let component: AreaofinterestsubsubjectComponent;
  let fixture: ComponentFixture<AreaofinterestsubsubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AreaofinterestsubsubjectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AreaofinterestsubsubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
