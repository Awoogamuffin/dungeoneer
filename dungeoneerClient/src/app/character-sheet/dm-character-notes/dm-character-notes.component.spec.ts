import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmCharacterNotesComponent } from './dm-character-notes.component';

describe('DmCharacterNotesComponent', () => {
  let component: DmCharacterNotesComponent;
  let fixture: ComponentFixture<DmCharacterNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmCharacterNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmCharacterNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
