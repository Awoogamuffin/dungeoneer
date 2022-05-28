import { TestBed } from '@angular/core/testing';

import { DmDialogService } from './dm-dialog.service';

describe('DmDialogService', () => {
  let service: DmDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DmDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
