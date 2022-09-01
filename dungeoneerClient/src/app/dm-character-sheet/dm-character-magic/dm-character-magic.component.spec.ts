import { Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Schema } from 'dungeoneer-common';
import { EditEventObject } from 'src/app/form/dm-form-edit/dm-edit-event.model';
import { DmFormEditService } from 'src/app/form/dm-form-edit/dm-form-edit.service';

import { DmCharacterMagicComponent } from './dm-character-magic.component';

@Injectable()
export class DmFormEditServiceMock {
  public addEvent(dungeoneerSchema: Schema, nodeType: string): void { };
  public editEvent(dungeoneerSchema: Schema, nodeType: string, editEventObject: EditEventObject) { }
}

describe('DmCharacterMagicComponent', () => {
  let component: DmCharacterMagicComponent;
  let fixture: ComponentFixture<DmCharacterMagicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DmCharacterMagicComponent],
      providers: [
        { provide: DmFormEditService, useClass: DmFormEditServiceMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmCharacterMagicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
