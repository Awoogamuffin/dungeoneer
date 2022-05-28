import { TestBed } from '@angular/core/testing';

import { DmDataStoreService } from './dm-data-store.service';

describe('DmDataStoreService', () => {
  let service: DmDataStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DmDataStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
