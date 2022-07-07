import { Component, Injectable, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DmFetchParams } from 'dungeoneer-common/dist/types/src/connection/connectionTypes';
import { Schema } from 'dungeoneer-common/dist/types/src/schema/schemaTypes';
import { BehaviorSubject } from 'rxjs';
import { DmDataObject } from 'src/app/data/dm-data-provider';
import { DmDataStoreService } from 'src/app/data/dm-data-store.service';
import { EditEventObject } from 'src/app/form/dm-form-edit/dm-edit-event.model';
import { DmFormEditService } from 'src/app/form/dm-form-edit/dm-form-edit.service';

import { DmTableAndSingleNodeComponent } from './dm-table-and-single-node.component';

@Injectable()
class DmFormEditServiceMock {
    public addEvent(dungeoneerSchema: Schema, nodeType: string): void { };
  public editEvent(dungeoneerSchema: Schema, nodeType: string, editEventObject: EditEventObject) { }
}
 
@Injectable()
class DmDataStoreServiceMock { 
    getData(name: string): BehaviorSubject<DmDataObject | null> {
        return new BehaviorSubject<DmDataObject | null>(null);
    }
  
  fetchData(fetchParams: DmFetchParams, requestName: string) {
  }
}
@Component({ selector: 'dm-search-card' })
class DmSearchCardComponentStub {
    @Input() nodeType!: string;
 }

@Component({ selector: 'dm-table' })
class DmTableComponentStub {
    @Input() nodeType!: string;
 }

@Component({ selector: 'dm-single-node-display' })
class DmSingleNodeDisplayComponentStub {
    @Input() nodeType!: string;
 }

describe('DmTableAndSingleNodeComponent', () => {
  let component: DmTableAndSingleNodeComponent;
  let fixture: ComponentFixture<DmTableAndSingleNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [DmTableAndSingleNodeComponent, DmSearchCardComponentStub, DmTableComponentStub, DmSingleNodeDisplayComponentStub],
        imports: [RouterTestingModule],
        providers: [
            {
                provide: DmFormEditService, useClass: DmFormEditServiceMock
          },
          { provide: DmDataStoreService, useClass: DmDataStoreServiceMock },
        ]
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
