import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmDefaultDialogComponent } from './dm-default-dialog.component';

describe('DmDefaultDialogComponent', () => {
  let component: DmDefaultDialogComponent;
  let fixture: ComponentFixture<DmDefaultDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmDefaultDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmDefaultDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
