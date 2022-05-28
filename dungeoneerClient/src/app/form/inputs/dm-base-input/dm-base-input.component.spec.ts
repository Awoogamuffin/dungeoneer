import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmBaseInputComponent } from './dm-base-input.component';

describe('DmBaseInputComponent', () => {
  let component: DmBaseInputComponent;
  let fixture: ComponentFixture<DmBaseInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmBaseInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmBaseInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
