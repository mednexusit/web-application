import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaofinterestComponent } from './areaofinterest.component';

describe('AreaofinterestComponent', () => {
  let component: AreaofinterestComponent;
  let fixture: ComponentFixture<AreaofinterestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AreaofinterestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AreaofinterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
