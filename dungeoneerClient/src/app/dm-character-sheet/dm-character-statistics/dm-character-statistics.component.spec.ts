import { Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Schema } from 'dungeoneer-common';
import { EditEventObject } from 'src/app/form/dm-form-edit/dm-edit-event.model';
import { DmFormEditService } from 'src/app/form/dm-form-edit/dm-form-edit.service';

import { DmCharacterStatisticsComponent } from './dm-character-statistics.component';

@Injectable()
export class DmFormEditServiceMock {
  public addEvent(dungeoneerSchema: Schema, nodeType: string): void { };
  public editEvent(dungeoneerSchema: Schema, nodeType: string, editEventObject: EditEventObject) { }
}
  
describe('DmCharacterStatisticsComponent', () => {
  let component: DmCharacterStatisticsComponent;
  let fixture: ComponentFixture<DmCharacterStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DmCharacterStatisticsComponent],
      providers: [
        { provide: DmFormEditService, useClass: DmFormEditServiceMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmCharacterStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
