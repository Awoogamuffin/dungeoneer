import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmTextInputComponent } from './dm-text-input.component';

describe('DmTextInputComponent', () => {
  let component: DmTextInputComponent;
  let fixture: ComponentFixture<DmTextInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmTextInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmTextInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
