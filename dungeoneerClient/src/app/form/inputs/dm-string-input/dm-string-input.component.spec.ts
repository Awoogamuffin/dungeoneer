import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmStringInputComponent } from './dm-string-input.component';

describe('DmStringInputComponent', () => {
  let component: DmStringInputComponent;
  let fixture: ComponentFixture<DmStringInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmStringInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmStringInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
