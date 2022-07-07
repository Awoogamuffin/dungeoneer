import { Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { DmDataObject } from 'src/app/data/dm-data-provider';
import { DmDataStoreService } from 'src/app/data/dm-data-store.service';

import { DmTableComponent } from './dm-table.component';

@Injectable()
class DmDataStoreServiceMock { 
    initialized = new BehaviorSubject<boolean>(true);
    
    getData(name: string): BehaviorSubject<DmDataObject | null> {
        return new BehaviorSubject<DmDataObject | null>(null);
    }
}

describe('DmTableComponent', () => {
  let component: DmTableComponent;
  let fixture: ComponentFixture<DmTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [DmTableComponent],
        imports: [ReactiveFormsModule],
        providers: [
          { provide: DmDataStoreService, useClass: DmDataStoreServiceMock }
        ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmTableComponent);
      component = fixture.componentInstance;
      component.nodeType = 'character';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
