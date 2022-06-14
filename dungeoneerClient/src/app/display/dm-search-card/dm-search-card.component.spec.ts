import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmSearchCardComponent } from './dm-search-card.component';

describe('DmSearchCardComponent', () => {
  let component: DmSearchCardComponent;
  let fixture: ComponentFixture<DmSearchCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmSearchCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmSearchCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
