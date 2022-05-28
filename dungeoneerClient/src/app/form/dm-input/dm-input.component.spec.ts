import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmInputComponent } from './dm-input.component';

describe('DmInputComponent', () => {
  let component: DmInputComponent;
  let fixture: ComponentFixture<DmInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
