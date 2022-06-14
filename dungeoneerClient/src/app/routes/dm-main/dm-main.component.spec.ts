import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmMainComponent } from './dm-main.component';

describe('DmMainComponent', () => {
  let component: DmMainComponent;
  let fixture: ComponentFixture<DmMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
