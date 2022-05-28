import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmFormDialogComponent } from './dm-form-dialog.component';

describe('DmFormDialogComponent', () => {
  let component: DmFormDialogComponent;
  let fixture: ComponentFixture<DmFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmFormDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
