import { Component, EventEmitter, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef, Output } from '@angular/core';
import { dungeoneerSchema } from 'dungeoneer-common';
import { DmSetParams } from 'dungeoneer-common/dist/types/src/connection/connectionTypes';
import { NodeType, NodeVar, Schema } from 'dungeoneer-common/dist/types/src/schema/schemaTypes';
import { takeUntil } from 'rxjs';
import { DmWebSocketService } from 'src/app/connection/dm-web-socket.service';
import { DmUnsubscriberComponent } from 'src/app/core/dm-unsubscriber/dm-unsubscriber.component';
import { DmDataStoreService } from 'src/app/data/dm-data-store.service';
import { DmDialogService } from '../dialog/dm-dialog.service';

@Component({
  selector: 'dm-single-node-display',
  templateUrl: './dm-single-node-display.component.html',
  styleUrls: ['./dm-single-node-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DmSingleNodeDisplayComponent extends DmUnsubscriberComponent implements OnInit {

  @Input()
  requestName!: string;

  @Input()
  nodeType!: string;

  nodeSchema!: NodeType;

  itemData!: any;
  itemKeys!: string[];

  schema: Schema = dungeoneerSchema;

  @Output()
  edit: EventEmitter<editEventObject> = new EventEmitter();

  constructor(private dmDataStore: DmDataStoreService,
    private dialog: DmDialogService,
    private dmWebsocket: DmWebSocketService,
    private changeDetectorRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    if (!(this.nodeType && this.requestName)) {
      console.warn('Node type and request name must be defined for single node view', this.nodeType, this.requestName);
      return;
    }

    this.nodeSchema = dungeoneerSchema.nodeTypes[this.nodeType];

    if (!this.nodeSchema) {
      console.warn('no node schema found for', this.nodeType);
      return;
    }

    this.dmDataStore.getData(this.requestName).pipe(takeUntil(this.unsubscribeAll)).subscribe((data) => {

      if (data && data.data && Array.isArray(data.data) && data.data[0]) {
        this.itemData = data.data[0];
        this.loadData();
      } else {
        this.itemData = null;
      }
    })
  }

  loadData() {
    if (this.itemData && this.nodeSchema) {
      this.itemKeys = Object.keys(this.itemData).filter(val => val.split('_').length > 1).map(val => val.split('_')[1]);

      if (this.nodeSchema.edit && Array.isArray(this.nodeSchema.edit)) {
        const toSort = this.itemKeys.slice().sort((a, b) => {
          return (this.nodeSchema.edit?.indexOf(a) || -1) - (this.nodeSchema.edit?.indexOf(b) || -1);
        })
        this.itemKeys = toSort;
      }
    }

    this.changeDetectorRef.detectChanges();
  }

  getEdgeNodeType(key: string): string | undefined {
    let nodeType = dungeoneerSchema.nodeTypes[this.nodeType].nodeVars[key].nodeType;
    return nodeType;
  }

  getEdgeLabelVar(key: string): string {
    const edgeType = this.getEdgeNodeType(key);
    if (edgeType) {
      const labelVar = dungeoneerSchema.nodeTypes[edgeType].labelVar || 'name';
      return edgeType + '_' + labelVar;
    }

    return '';
  }

  getEdgeFacets(node: any, key: string): string {
    let toReturn = '';

    const varSchema: NodeVar = dungeoneerSchema.nodeTypes[this.nodeType].nodeVars[key];
    if (varSchema.facets) {
      for (const facet of varSchema.facets) {
        // a bit hacky for now. I could formalise how facets are displayed, but for now I'm hacking it
        if (facet.name === 'amount') {
          toReturn += ` x${node[this.nodeType + '_' + key + '|' + facet.name]}`;
        }
      }
    }

    return toReturn;
  }

  getKeyType(key: string): string {
    const valSchema: any = this.nodeSchema.nodeVars[key];
    return valSchema.type;
  }

  onEdit() {
    this.edit.emit({
      initialData: this.itemData
    });
  }

  onValueEdit(key: string) {
    this.edit.emit({
      initialData: {
        uid: this.itemData.uid,
        [this.nodeType + '_' + key]: this.itemData[this.nodeType + '_' + key]
      },
      columns: [key]
    });
  }
}

export interface editEventObject {
  initialData?: any,
  columns?: string[]
}