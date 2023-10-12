import { TestBed } from '@angular/core/testing';

import AddpinService from './addpin.service';

describe('AddpinService', () => {
  let service: AddpinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddpinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
