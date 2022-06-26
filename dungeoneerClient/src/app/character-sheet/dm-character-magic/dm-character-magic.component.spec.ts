import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmCharacterMagicComponent } from './dm-character-magic.component';

describe('DmCharacterMagicComponent', () => {
  let component: DmCharacterMagicComponent;
  let fixture: ComponentFixture<DmCharacterMagicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmCharacterMagicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmCharacterMagicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
