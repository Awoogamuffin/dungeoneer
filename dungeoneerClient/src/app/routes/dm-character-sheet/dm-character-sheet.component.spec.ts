import { Component, Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DmFetchParams } from 'dungeoneer-common';
import { BehaviorSubject } from 'rxjs';
import { DmDataObject } from 'src/app/data/dm-data-provider';
import { DmDataStoreService } from 'src/app/data/dm-data-store.service';

import { DmCharacterSheetComponent } from './dm-character-sheet.component';

@Component({
  selector: 'dm-character-statistics'
})
class DmCharacterStatisticsStubComponent { }

@Component({
  selector: 'dm-character-inventory'
})
class DmCharacterInventoryStubComponent { }

@Component({
  selector: 'dm-character-magic'
})
class DmCharacterMagicStubComponent { }

@Component({
  selector: 'dm-character-notes'
})
class DmCharacterNotesStubComponent { }

@Injectable()
class DmDataStoreServiceMock { 
    getData(name: string): BehaviorSubject<DmDataObject | null> {
        return new BehaviorSubject<DmDataObject | null>(null);
    }
  
  fetchData(fetchParams: DmFetchParams, requestName: string) {
  }
}

describe('DmCharacterSheetComponent', () => {
  let component: DmCharacterSheetComponent;
  let fixture: ComponentFixture<DmCharacterSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DmCharacterSheetComponent, DmCharacterStatisticsStubComponent,
      DmCharacterInventoryStubComponent, DmCharacterMagicStubComponent, DmCharacterNotesStubComponent],
      imports: [RouterTestingModule],
      providers: [
        {provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                uid: '0x01'
              })
            }
          }
        },
        { provide: DmDataStoreService, useClass: DmDataStoreServiceMock },
      ]
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
