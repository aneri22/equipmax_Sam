import { TestBed } from '@angular/core/testing';

import { SwReportsService } from './sw-reports.service';

describe('SwReportsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SwReportsService = TestBed.get(SwReportsService);
    expect(service).toBeTruthy();
  });
});
