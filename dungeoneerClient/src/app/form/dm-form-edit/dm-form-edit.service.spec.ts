import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { Schema } from 'dungeoneer-common/dist/types/src/schema/schemaTypes';
import { DmWebSocketService } from 'src/app/connection/dm-web-socket.service';
import { DmDialogService } from 'src/app/display/dialog/dm-dialog.service';
import { DmFormInputData } from '../DmFormInputData';
import { DmFormUtils } from '../DmFormUtils';

import { DmFormEditService } from './dm-form-edit.service';

@Injectable()
class DmWebSocketServiceMock { }

@Injectable()
class DmDialogServiceMock { }

@Injectable()
class DmFormUtilsMock {
  public generateInputsFromSchema(schema: Schema, nodeType: string, initialData?: any, columns?: 'search' | string[]): DmFormInputData[] {
    return [];
  }

  public getFormGroupFromInputData(inputs: DmFormInputData[]): FormGroup {
    return new FormGroup({});
  }
}

describe('DmFormEditService', () => {
  let service: DmFormEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: DmWebSocketService, useClass: DmWebSocketServiceMock },
        { provide: DmDialogService, useClass: DmDialogServiceMock },
        { provide: DmFormUtils, useClass: DmFormUtilsMock }
      ]
    });
    service = TestBed.inject(DmFormEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
