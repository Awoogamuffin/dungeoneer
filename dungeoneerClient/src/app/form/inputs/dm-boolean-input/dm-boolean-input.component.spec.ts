import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmBooleanInputComponent } from './dm-boolean-input.component';

describe('DmBooleanInputComponent', () => {
  let component: DmBooleanInputComponent;
  let fixture: ComponentFixture<DmBooleanInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmBooleanInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmBooleanInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
