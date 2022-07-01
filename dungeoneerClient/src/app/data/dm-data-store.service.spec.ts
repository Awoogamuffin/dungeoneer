import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { DmWebSocketService } from '../connection/dm-web-socket.service';

import { DmDataStoreService } from './dm-data-store.service';

@Injectable()
class DmWebSocketServiceMock { 
  connected = new BehaviorSubject<boolean>(false);
  modificationMade = new BehaviorSubject<boolean>(false);
}

describe('DmDataStoreService', () => {
  let service: DmDataStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: DmWebSocketService, useClass: DmWebSocketServiceMock }
      ]
    });
    service = TestBed.inject(DmDataStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
