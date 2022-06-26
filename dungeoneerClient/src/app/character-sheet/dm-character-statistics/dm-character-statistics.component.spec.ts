import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmCharacterStatisticsComponent } from './dm-character-statistics.component';

describe('DmCharacterStatisticsComponent', () => {
  let component: DmCharacterStatisticsComponent;
  let fixture: ComponentFixture<DmCharacterStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmCharacterStatisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmCharacterStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
