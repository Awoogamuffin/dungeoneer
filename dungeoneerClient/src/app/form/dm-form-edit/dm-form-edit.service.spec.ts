import { TestBed } from '@angular/core/testing';

import { DmFormEditService } from './dm-form-edit.service';

describe('DmFormEditService', () => {
  let service: DmFormEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DmFormEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
