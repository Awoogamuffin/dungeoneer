import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmTableInputComponent } from './dm-table-input.component';

describe('DmTableInputComponent', () => {
  let component: DmTableInputComponent;
  let fixture: ComponentFixture<DmTableInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmTableInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmTableInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
