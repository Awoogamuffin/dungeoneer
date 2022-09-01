import { Injectable } from '@angular/core';
import { DmSetParams } from 'dungeoneer-common';
import { Schema } from 'dungeoneer-common';
import { takeUntil } from 'rxjs';
import { DmWebSocketService } from 'src/app/connection/dm-web-socket.service';
import { DmUnsubscriberComponent } from 'src/app/core/dm-unsubscriber/dm-unsubscriber.component';
import { DmDialogService } from 'src/app/display/dialog/dm-dialog.service';
import { DmFormDialogComponent } from '../dm-form-dialog/dm-form-dialog.component';
import { DmFormInputData } from '../DmFormInputData';
import { DmFormUtils } from '../DmFormUtils';
import { EditEventObject } from './dm-edit-event.model';

@Injectable({
  providedIn: 'root'
})
export class DmFormEditService extends DmUnsubscriberComponent {

  constructor(private dmWebsocket: DmWebSocketService,
    private dialog: DmDialogService,
    private dmFormUtils: DmFormUtils) {
      super();    
  }

  /**
   * Opens a dialog to add data for the specified node.
   * 
   * @param dungeoneerSchema 
   * @param nodeType 
   */
  public addEvent(dungeoneerSchema: Schema, nodeType: string): void {
    const inputs: DmFormInputData[] = this.dmFormUtils.generateInputsFromSchema(dungeoneerSchema, nodeType);

    this.dialog.openDialog({
      componentType: DmFormDialogComponent,
      componentData: {
        inputs: inputs
      }
    }).pipe(takeUntil(this.unsubscribeAll)).subscribe((toSet) => {

      if (!(toSet && Object.keys(toSet).length > 0)) {
        return;
      }
      console.log('TO SET ADD', toSet);
      const setParams: DmSetParams = {
        nodeType: nodeType,
        values: toSet
      };

      this.dmWebsocket.sendRequest({
        method: 'set',
        params: {
          set: setParams
        }
      });
    })
  }

  /**
   * Opens a dialog to edit the value of the specified node.
   * 
   * @param dungeoneerSchema 
   * @param nodeType 
   * @param editEventObject 
   */
  public editEvent(dungeoneerSchema: Schema, nodeType: string, editEventObject: EditEventObject) {
    const data: any = editEventObject.initialData;
    console.log('ON EDIT!', editEventObject);
    const inputs: DmFormInputData[] = this.dmFormUtils.generateInputsFromSchema(dungeoneerSchema, nodeType, data, editEventObject.columns);

    this.dialog.openDialog({
      componentType: DmFormDialogComponent,
      componentData: {
        inputs: inputs
      }
    }).pipe(takeUntil(this.unsubscribeAll)).subscribe((toSet) => {

      if (!(toSet && Object.keys(toSet).length > 0)) {
        return;
      }

      console.log('TO SET EDIT', toSet);
      const setParams: DmSetParams = {
        nodeType: nodeType,
        values: {
          ...toSet,
          uid: data.uid
        }
      };

      this.dmWebsocket.sendRequest({
        method: 'set',
        params: {
          set: setParams
        }
      });
    })
  }
}
