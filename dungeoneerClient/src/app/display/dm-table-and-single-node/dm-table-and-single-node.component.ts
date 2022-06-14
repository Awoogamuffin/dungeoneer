import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { dungeoneerSchema } from "dungeoneer-common";
import { NodeType, NodeVar } from 'dungeoneer-common/dist/types/src/schema/schemaTypes';
import { DmFormInputData } from 'src/app/form/DmFormInputData';
import { DmUnsubscriberComponent } from 'src/app/core/dm-unsubscriber/dm-unsubscriber.component';
import { generateInputsFromSchema } from 'src/app/form/DmFormUtils';
import { DmDialogService } from '../dialog/dm-dialog.service';
import { DmFormDialogComponent } from 'src/app/form/dm-form-dialog/dm-form-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { DmWebSocketService } from 'src/app/connection/dm-web-socket.service';
import { nanoid } from 'nanoid';
import { DmFetchParams, DmResponse, DmSetParams } from 'dungeoneer-common/dist/types/src/connection/connectionTypes';
import { DmDataStoreService } from 'src/app/data/dm-data-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dm-table-and-single-node',
  templateUrl: './dm-table-and-single-node.component.html',
  styleUrls: ['./dm-table-and-single-node.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

/**
 * This class takes a Schema object to derive table (columns etc.) search and a single node display for a NodeType as defined in that schema.
 */

export class DmTableAndSingleNodeComponent extends DmUnsubscriberComponent implements OnInit {

  // the node type that this view deals with. It will extract the data it needs from the schema.
  @Input()
  nodeType!: string;

  @Input()
  singleNodeRequestName!: string;
  // search subject is passed into the table to prompt it to fetch data based on changes in the search from group.
  searchSubject: Subject<any> = new Subject();

  // specifically the schema for this node type. Extracted from main schema
  nodeSchema!: NodeType;

  singleNodeValue?: any;

  // when double clicking on the table, we set the row to edit. First we check that the singleNode full search has been completed
  toEdit: any;

  constructor(private dialog: DmDialogService,
    private dmWebsocket: DmWebSocketService,
    private router: Router,
    private dmDataStore: DmDataStoreService) {
    super();
  }

  ngOnInit(): void {
   
    if (!this.nodeType) {
      console.warn('Node type must be defined for table + node view');
      return;
    }

    console.log('node type is', this.nodeType)

    if (!this.singleNodeRequestName) {
      this.singleNodeRequestName = `${this.nodeType}_singleNode_${nanoid()}`
    }
    
    console.log('single node request name is', this.singleNodeRequestName);
    this.nodeSchema = dungeoneerSchema.nodeTypes[this.nodeType];

    if (!this.nodeSchema) {
      console.warn('no node schema found for', this.nodeType);
      return;
    }

    this.dmDataStore.getData(this.singleNodeRequestName).pipe(takeUntil(this.unsubscribeAll)).subscribe((data) => {
      this.singleNodeValue = data?.data[0];
      this.checkDblClickEdit();
    });
  }

  onRowSelected(rows: any[]) {
    if (rows && rows[0] && rows[0].uid) {
      const fetchParams: DmFetchParams = {
        nodeType: this.nodeType,
        search: {
          uid: rows[0].uid
        },
        modality: 'full'
      }
      this.dmDataStore.fetchData(fetchParams, this.singleNodeRequestName);
    }
  }

  onAdd() {
    const inputs: DmFormInputData[] = generateInputsFromSchema(dungeoneerSchema, this.nodeType);

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
        nodeType: this.nodeType,
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

  checkDblClickEdit() {
    if (this.toEdit && this.singleNodeValue && this.toEdit.uid === this.singleNodeValue.uid) {
      this.toEdit = null;
      this.onEdit(this.singleNodeValue);
    }
  }

  onDblClick(row: any) {
    if (row && row.uid) {
      this.toEdit = row;
      this.checkDblClickEdit();
    } else {
      this.toEdit = null;
    }
  }

  onEdit(data: any) {
    console.log('ON EDIT!', data);
    const inputs: DmFormInputData[] = generateInputsFromSchema(dungeoneerSchema, this.nodeType, data);

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
        nodeType: this.nodeType,
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
