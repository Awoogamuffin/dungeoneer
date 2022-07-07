import { Component, Injectable, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { DmWebSocketService } from 'src/app/connection/dm-web-socket.service';
import { DmDataObject } from 'src/app/data/dm-data-provider';
import { DmDataStoreService } from 'src/app/data/dm-data-store.service';

import { DmMainComponent } from './dm-main.component';

@Component({
    selector: 'dm-table-and-single-node'
})
class DmTableAndSingleNodeStub {    
    @Input()
    nodeType!: string;

    @Input()
    singleNodeRequestName!: string;
}

@Component({
    selector: 'mat-tab-group'
})
class MatTabGroupStub { }

@Component({
    selector: 'mat-tab'
})
class MatTabStub { }

@Injectable()
class DmDataStoreServiceMock { 
    getData(name: string): BehaviorSubject<DmDataObject | null> {
        return new BehaviorSubject<DmDataObject | null>(null);
    }
}

@Injectable()
class DmWebSocketServiceMock { 
}

describe('DmMainComponent', () => {
  let component: DmMainComponent;
  let fixture: ComponentFixture<DmMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [DmMainComponent, DmTableAndSingleNodeStub, MatTabGroupStub, MatTabStub],
        imports: [RouterTestingModule],
        providers: [
          { provide: DmDataStoreService, useClass: DmDataStoreServiceMock },
          { provide: DmWebSocketService, useClass: DmWebSocketServiceMock }
        ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
