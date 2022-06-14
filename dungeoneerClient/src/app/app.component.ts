import { Component } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private dataStore: DmDataStoreService,
    private websocket: DmWebSocketService,
    private dialog: DmDialogService) {
  }
}
