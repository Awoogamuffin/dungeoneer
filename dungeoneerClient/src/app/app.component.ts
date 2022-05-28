import { Component } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { DmWebSocketService } from './connection/dm-web-socket.service';
import { DmDataStoreService } from './data/dm-data-store.service';
import { DmDialogService } from './display/dialog/dm-dialog.service';
import { DmFormDialogComponent } from './form/dm-form-dialog/dm-form-dialog.component';
import { DmFormInputData } from './form/DmFormInputData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dungeoneerClient';

  constructor(private dataStore: DmDataStoreService,
    private websocket: DmWebSocketService,
    private dialog: DmDialogService) {
  }
}
