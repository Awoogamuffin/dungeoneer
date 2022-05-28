import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmIntInputComponent } from './dm-int-input.component';

describe('DmIntInputComponent', () => {
  let component: DmIntInputComponent;
  let fixture: ComponentFixture<DmIntInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmIntInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmIntInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
