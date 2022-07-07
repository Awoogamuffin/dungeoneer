import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmCharacterSectionComponent } from './dm-character-section.component';

describe('DmCharacterSectionComponent', () => {
  let component: DmCharacterSectionComponent;
  let fixture: ComponentFixture<DmCharacterSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmCharacterSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmCharacterSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
