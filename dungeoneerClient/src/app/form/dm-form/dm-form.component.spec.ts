import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmFormComponent } from './dm-form.component';

describe('DmFormComponent', () => {
  let component: DmFormComponent;
  let fixture: ComponentFixture<DmFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
