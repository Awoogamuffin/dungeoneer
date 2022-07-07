import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DmLabelPipe } from 'src/app/pipes/dm-label.pipe';
import { DmSafeHTMLPipe } from 'src/app/pipes/dm-safe-html.pipe';
import { DmValuePipe } from 'src/app/pipes/dm-value.pipe';

import { DmNodevarCardComponent } from './dm-nodevar-card.component';

describe('DmNodevarCardComponent', () => {
  let component: DmNodevarCardComponent;
  let fixture: ComponentFixture<DmNodevarCardComponent>;

  beforeEach(async () => {
    // Technically the pipes should be mocked too, but I haven't...
    await TestBed.configureTestingModule({
      declarations: [ DmNodevarCardComponent, DmLabelPipe, DmValuePipe, DmSafeHTMLPipe ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmNodevarCardComponent);
    component = fixture.componentInstance;
    
    // Mock the necessary Input variables
    // nodevarObj must match a nodevar in the schema, e.g. name for character_name
    component.nodevarObj = 'name';
    component.character = {
      character_name: 'tester'
    }

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
