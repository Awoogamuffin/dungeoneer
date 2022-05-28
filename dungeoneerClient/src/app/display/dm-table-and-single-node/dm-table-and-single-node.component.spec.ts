import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmTableAndSingleNodeComponent } from './dm-table-and-single-node.component';

describe('DmTableAndSingleNodeComponent', () => {
  let component: DmTableAndSingleNodeComponent;
  let fixture: ComponentFixture<DmTableAndSingleNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmTableAndSingleNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmTableAndSingleNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
