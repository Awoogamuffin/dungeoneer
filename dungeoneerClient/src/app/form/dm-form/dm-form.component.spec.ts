import { Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { Schema } from 'dungeoneer-common/dist/types/src/schema/schemaTypes';
import { DmFormInputData } from '../DmFormInputData';
import { DmFormUtils } from '../DmFormUtils';

import { DmFormComponent } from './dm-form.component';

@Injectable()
class DmFormUtilsMock {
  public generateInputsFromSchema(schema: Schema, nodeType: string, initialData?: any, columns?: 'search' | string[]): DmFormInputData[] {
    return [];
  }

  public getFormGroupFromInputData(inputs: DmFormInputData[]): FormGroup {
    return new FormGroup({});
  }
}
 
describe('DmFormComponent', () => {
  let component: DmFormComponent;
  let fixture: ComponentFixture<DmFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DmFormComponent],
      providers: [
        { provide: DmFormUtils, useClass: DmFormUtilsMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
