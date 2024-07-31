import { TestBed } from '@angular/core/testing';

import { ThememanageService } from './thememanage.service';

describe('ThememanageService', () => {
  let service: ThememanageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThememanageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
