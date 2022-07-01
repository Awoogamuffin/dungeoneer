import { Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DmDialogComponent } from './dm-dialog.component';

@Injectable()
class MatDialogRefMock { }

describe('DmDialogComponent', () => {
  let component: DmDialogComponent;
  let fixture: ComponentFixture<DmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DmDialogComponent],
      providers: [
        { provide: MatDialogRef, useClass: MatDialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
