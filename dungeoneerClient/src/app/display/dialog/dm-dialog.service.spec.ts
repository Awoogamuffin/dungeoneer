import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';

import { DmDialogService } from './dm-dialog.service';

@Injectable()
class MatDialogMock { }

describe('DmDialogService', () => {
  let service: DmDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: MatDialog, useClass: MatDialogMock }
      ]
    });
    service = TestBed.inject(DmDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
