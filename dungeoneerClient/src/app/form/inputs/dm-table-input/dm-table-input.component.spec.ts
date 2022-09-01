import { OverlayModule } from '@angular/cdk/overlay';
import { Component, Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl } from '@angular/forms';
import { DmFetchParams } from 'dungeoneer-common';
import { BehaviorSubject, of } from 'rxjs';
import { DmWebSocketService } from 'src/app/connection/dm-web-socket.service';
import { DmDataObject } from 'src/app/data/dm-data-provider';
import { DmDataStoreService } from 'src/app/data/dm-data-store.service';

import { DmTableInputComponent } from './dm-table-input.component';

@Component({ selector: 'dm-search-card' })
class DmSearchCardComponentStub { }

@Injectable()
class DmWebSocketServiceMock { 
}

@Injectable()
class DmDataStoreServiceMock { 
    getData(name: string): BehaviorSubject<DmDataObject | null> {
        return new BehaviorSubject<DmDataObject | null>(null);
    }
  
  fetchData(fetchParams: DmFetchParams, requestName: string) {
  }
}

describe('DmTableInputComponent', () => {
  let component: DmTableInputComponent;
  let fixture: ComponentFixture<DmTableInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DmTableInputComponent, DmSearchCardComponentStub],
      imports: [OverlayModule],
      providers: [
        { provide: DmWebSocketService, useClass: DmWebSocketServiceMock },
        { provide: DmDataStoreService, useClass: DmDataStoreServiceMock },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmTableInputComponent);
    component = fixture.componentInstance;
    component.inputData = {
      abstractControl: { value: 'test', valueChanges: of('test') } as AbstractControl,
      key: 'test',
      type: 'test',
      config: {
        nodeType: 'character', 
        edgeType: 'item',
        mode: 'single'
      }
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
