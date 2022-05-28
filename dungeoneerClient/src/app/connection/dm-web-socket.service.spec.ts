import { TestBed } from '@angular/core/testing';

import { DmWebSocketService } from './dm-web-socket.service';

describe('DMWebSocketService', () => {
  let service: DmWebSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DmWebSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
