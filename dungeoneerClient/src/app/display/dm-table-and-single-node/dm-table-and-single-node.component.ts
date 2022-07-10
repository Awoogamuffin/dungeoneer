import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getDungeoneerSchema } from "dungeoneer-common";
import { DmFetchParams } from 'dungeoneer-common/dist/types/src/connection/connectionTypes';
import { NodeType } from 'dungeoneer-common/dist/types/src/schema/schemaTypes';
import { nanoid } from 'nanoid';
import { Subject, takeUntil } from 'rxjs';
import { DmUnsubscriberComponent } from 'src/app/core/dm-unsubscriber/dm-unsubscriber.component';
import { DmDataStoreService } from 'src/app/data/dm-data-store.service';
import { EditEventObject } from 'src/app/form/dm-form-edit/dm-edit-event.model';
import { DmFormEditService } from 'src/app/form/dm-form-edit/dm-form-edit.service';

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

  // Get copy of the dungeoneer schema
  schema = getDungeoneerSchema();

  // specifically the schema for this node type. Extracted from main schema
  nodeSchema!: NodeType;

  singleNodeValue?: any;

  // when double clicking on the table, we set the row to edit. First we check that the singleNode full search has been completed
  toEdit: any;

  constructor(private formEditService: DmFormEditService,
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
    this.nodeSchema = this.schema.nodeTypes[this.nodeType];

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
    this.formEditService.addEvent(this.schema, this.nodeType);
  }

  checkDblClickEdit() {
    if (this.toEdit && this.singleNodeValue && this.toEdit.uid === this.singleNodeValue.uid) {
      this.toEdit = null;
      this.onEdit({
        initialData: this.singleNodeValue
      });
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

  onEdit(editEventObject: EditEventObject) {
    this.formEditService.editEvent(this.schema, this.nodeType, editEventObject);
  }

}
