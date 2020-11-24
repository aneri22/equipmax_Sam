import { TestBed } from '@angular/core/testing';

import { SwDetailsService } from './sw-details.service';

describe('SwDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SwDetailsService = TestBed.get(SwDetailsService);
    expect(service).toBeTruthy();
  });
});
