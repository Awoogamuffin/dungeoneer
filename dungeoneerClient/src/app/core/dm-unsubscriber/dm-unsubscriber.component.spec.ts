import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmUnsubscriberComponent } from './dm-unsubscriber.component';

describe('DmUnsubscriberComponent', () => {
  let component: DmUnsubscriberComponent;
  let fixture: ComponentFixture<DmUnsubscriberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmUnsubscriberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmUnsubscriberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
