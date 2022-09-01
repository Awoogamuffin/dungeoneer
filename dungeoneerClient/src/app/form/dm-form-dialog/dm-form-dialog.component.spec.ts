import { Component, Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { Schema } from 'dungeoneer-common';
import { DmFormInputData } from '../DmFormInputData';
import { DmFormUtils } from '../DmFormUtils';

import { DmFormDialogComponent } from './dm-form-dialog.component';

@Component({
    selector: 'dm-default-dialog'
})
class DmDefaultDialogComponentStub { }

@Injectable()
class DmFormUtilsMock {
  public generateInputsFromSchema(schema: Schema, nodeType: string, initialData?: any, columns?: 'search' | string[]): DmFormInputData[] {
    return [];
  }

  public getFormGroupFromInputData(inputs: DmFormInputData[]): FormGroup {
    return new FormGroup({});
  }
}

describe('DmFormDialogComponent', () => {
  let component: DmFormDialogComponent;
  let fixture: ComponentFixture<DmFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DmFormDialogComponent, DmDefaultDialogComponentStub],
      providers: [
        { provide: DmFormUtils, useClass: DmFormUtilsMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmFormDialogComponent);
      component = fixture.componentInstance;
      component.formGroup = new FormGroup({});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
