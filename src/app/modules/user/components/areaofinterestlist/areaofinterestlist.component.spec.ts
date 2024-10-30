import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaofinterestlistComponent } from './areaofinterestlist.component';

describe('AreaofinterestlistComponent', () => {
  let component: AreaofinterestlistComponent;
  let fixture: ComponentFixture<AreaofinterestlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AreaofinterestlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AreaofinterestlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
