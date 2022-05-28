import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmSingleNodeDisplayComponent } from './dm-single-node-display.component';

describe('DmSingleNodeDisplayComponent', () => {
  let component: DmSingleNodeDisplayComponent;
  let fixture: ComponentFixture<DmSingleNodeDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmSingleNodeDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmSingleNodeDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
