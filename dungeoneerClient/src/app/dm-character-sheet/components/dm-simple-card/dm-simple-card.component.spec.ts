import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmSimpleCardComponent } from './dm-simple-card.component';

describe('DmSimpleCardComponent', () => {
  let component: DmSimpleCardComponent;
  let fixture: ComponentFixture<DmSimpleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmSimpleCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmSimpleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
