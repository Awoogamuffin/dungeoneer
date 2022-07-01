import { Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { DmWebSocketService } from 'src/app/connection/dm-web-socket.service';
import { DmDataObject } from 'src/app/data/dm-data-provider';
import { DmDataStoreService } from 'src/app/data/dm-data-store.service';
import { DmDialogService } from '../dialog/dm-dialog.service';

import { DmSingleNodeDisplayComponent } from './dm-single-node-display.component';

@Injectable()
class DmDataStoreServiceMock { 
    getData(name: string): BehaviorSubject<DmDataObject | null> {
        return new BehaviorSubject<DmDataObject | null>(null);
    }
}

@Injectable()
class DmDialogServiceMock { 
}

@Injectable()
class DmWebSocketServiceMock { 
}

describe('DmSingleNodeDisplayComponent', () => {
  let component: DmSingleNodeDisplayComponent;
  let fixture: ComponentFixture<DmSingleNodeDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [DmSingleNodeDisplayComponent],
        providers: [
            { provide: DmDataStoreService, useClass: DmDataStoreServiceMock },
            { provide: DmDialogService, useClass: DmDialogServiceMock },
            { provide: DmWebSocketService, useClass: DmWebSocketServiceMock }
        ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmSingleNodeDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
