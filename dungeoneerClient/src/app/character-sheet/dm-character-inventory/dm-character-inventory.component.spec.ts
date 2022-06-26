import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmCharacterInventoryComponent } from './dm-character-inventory.component';

describe('DmCharacterInventoryComponent', () => {
  let component: DmCharacterInventoryComponent;
  let fixture: ComponentFixture<DmCharacterInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmCharacterInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmCharacterInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
