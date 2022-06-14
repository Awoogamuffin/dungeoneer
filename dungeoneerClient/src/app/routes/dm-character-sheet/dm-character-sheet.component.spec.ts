import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmCharacterSheetComponent } from './dm-character-sheet.component';

describe('DmCharacterSheetComponent', () => {
  let component: DmCharacterSheetComponent;
  let fixture: ComponentFixture<DmCharacterSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmCharacterSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmCharacterSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
