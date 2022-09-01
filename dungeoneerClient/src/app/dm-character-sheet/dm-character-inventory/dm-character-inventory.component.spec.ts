import { Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Schema } from 'dungeoneer-common';
import { EditEventObject } from 'src/app/form/dm-form-edit/dm-edit-event.model';
import { DmFormEditService } from 'src/app/form/dm-form-edit/dm-form-edit.service';

import { DmCharacterInventoryComponent } from './dm-character-inventory.component';

@Injectable()
export class DmFormEditServiceMock {
  public addEvent(dungeoneerSchema: Schema, nodeType: string): void { };
  public editEvent(dungeoneerSchema: Schema, nodeType: string, editEventObject: EditEventObject) { }
}

describe('DmCharacterInventoryComponent', () => {
  let component: DmCharacterInventoryComponent;
  let fixture: ComponentFixture<DmCharacterInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DmCharacterInventoryComponent],
      providers: [
        { provide: DmFormEditService, useClass: DmFormEditServiceMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmCharacterInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
