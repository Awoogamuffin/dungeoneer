import { Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { Schema } from 'dungeoneer-common';
import { Subject } from 'rxjs';
import { DmFormInputData } from 'src/app/form/DmFormInputData';
import { DmFormUtils } from 'src/app/form/DmFormUtils';

import { DmSearchCardComponent } from './dm-search-card.component';

@Injectable()
class DmFormUtilsMock {
  public generateInputsFromSchema(schema: Schema, nodeType: string, initialData?: any, columns?: 'search' | string[]): DmFormInputData[] {
    return [];
  }

  public getFormGroupFromInputData(inputs: DmFormInputData[]): FormGroup {
    return new FormGroup({});
  }
 }

describe('DmSearchCardComponent', () => {
  let component: DmSearchCardComponent;
  let fixture: ComponentFixture<DmSearchCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DmSearchCardComponent],
      providers: [
        { provide: DmFormUtils, useClass: DmFormUtilsMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmSearchCardComponent);
      component = fixture.componentInstance;
      component.searchSubject = new Subject<any>();
      component.nodeType = 'character';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
