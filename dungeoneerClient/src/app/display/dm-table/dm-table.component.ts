import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { getDungeoneerSchema } from 'dungeoneer-common';
import { DmFetchParams } from 'dungeoneer-common';
import { NodeType, Schema } from 'dungeoneer-common';
import { nanoid } from 'nanoid';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { DmUnsubscriberComponent } from 'src/app/core/dm-unsubscriber/dm-unsubscriber.component';
import { DmDataObject, DmDataProvider } from 'src/app/data/dm-data-provider';
import { DmDataStoreService } from 'src/app/data/dm-data-store.service';
import { DmDatabaseProvider } from 'src/app/data/providers/dm-data-store-provider';


@Component({
  selector: 'dm-table',
  templateUrl: './dm-table.component.html',
  styleUrls: ['./dm-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DmTableComponent extends DmUnsubscriberComponent implements OnInit {

  @Input()
  nodeType!: string

  @Input()
  nodeSchema!: NodeType

  @Input()
  schema!: Schema

  @Input()
  columns!: string[];

  @Input()
  selected: any;

  @Input()
  searchSubject!: Subject<any>;

  @Input()
  modality: 'minimal' | 'table' = 'table';

  @Input()
  multiSelect = false;

  @Input()
  selection: any;

  @Input()
  dataProvider!: DmDataProvider;

  @Input()
  searchMask: any;

  @ViewChild(MatPaginator) public paginator!: MatPaginator;

  dataSource: BehaviorSubject<any> = new BehaviorSubject(null);

  requestName!: string;

  total = 0;

  search: any;

  @Output()
  selectedRows: EventEmitter<any> = new EventEmitter();

  @Output()
  dblClick: EventEmitter<any> = new EventEmitter();

  constructor(
    private dmData: DmDataStoreService,
    private changeDetectorRef: ChangeDetectorRef) {
      super();
  }

  ngOnInit(): void {

    if (!this.schema) {
      this.schema = getDungeoneerSchema();
    }

    if (!this.nodeType) {
      console.warn('Nodetype must be defined for table');
      return;
    }

    if (!this.nodeSchema) {
      if (this.schema && this.nodeType) {
        this.nodeSchema = this.schema.nodeTypes[this.nodeType];
      }
    }

    if (!this.nodeSchema) {
      console.warn('Unabled to extract node schema for node type', this.nodeType);
      return;
    }

    if (!this.dataProvider) {
      console.log('new dm database provider');
      this.dataProvider = new DmDatabaseProvider(this.dmData);
    }

    console.log('on table init', this.selected);
    if (this.selected) {
      
    }

    if (!this.selection) {
      this.selection = {
        uids: {},
      }
    }

    this.selection.isSelected = (row: any): boolean => {
      return this.selection.uids[row.uid]
    }

    this.selection.getSelection = (): any[] => {
      return Object.values(this.selection.uids);
    };

    this.selection.select = (item: any) => {
      this.selection.uids[item.uid] = item;
    };

    this.selection.deselect = (item: any) => {
      delete this.selection.uids[item.uid];
    };

    this.selection.toggle = (row: any) => {
      if (this.selection.uids[row.uid]) {
        delete this.selection.uids[row.uid];
      } else {
        this.selection.uids[row.uid] = row;
        if (this.selection.onAdd) {
          this.selection.onAdd(row);
        }
      }


      this.selectedRows.emit(this.selection.getSelection());
    };
  }

  ngAfterViewInit() {
    this.dataProvider.initialized.pipe(takeUntil(this.unsubscribeAll)).subscribe((initialized: boolean) => {
      if (initialized) {
        this.initialize();
      }
    });
  }

  initialize() {

    this.deriveColumns();

    this.requestName = `${this.nodeType}_table_${nanoid()}`
    this.dataProvider.getData(this.requestName).pipe(takeUntil(this.unsubscribeAll)).subscribe((dataObj: DmDataObject | null) => {
      if (dataObj) {
        this.dataSource.next(dataObj.data);
        this.total = dataObj.total || 0;
        return;
      }

      this.dataSource.next(null);
      this.total = 0;
      
    });



    if (this.paginator) {
      this.paginator.page.pipe(takeUntil(this.unsubscribeAll)).subscribe(() => {
        this.fetchData();
      });
    }

    if (this.searchSubject) {
      this.searchSubject.pipe(takeUntil(this.unsubscribeAll)).subscribe((search) => {
        this.search = search;
        this.fetchData();
      });
    }
    
    this.fetchData();
  }

  fetchData() {
    const fetchParams: DmFetchParams = {
      nodeType: this.nodeType,
      modality: this.modality
    }

    if (this.paginator) {
      fetchParams.pagination = {
        offset: this.paginator.pageIndex * this.paginator.pageSize,
        first: this.paginator.pageSize
      }
    }

    if (this.search) {
      fetchParams.search = this.search;
    }

    if (this.searchMask) {
      if (fetchParams.search) {
        fetchParams.search = {
          ...fetchParams.search,
          ...this.searchMask
        }
      } else {
        fetchParams.search = this.searchMask;
      }
    }

    console.log('table fetching with params:', fetchParams);

    this.dataProvider.fetchData(fetchParams, this.requestName)
  }

  deriveColumns() {
    if (!this.schema && this.nodeSchema) {
      console.warn('cannot derive columns without schema');
      return;
    }

    if (!this.columns) {
      if (this.modality === 'minimal') {
        this.columns = [ this.nodeSchema.labelVar || 'name' ];
      } else if (this.nodeSchema.columns) {
        this.columns = this.nodeSchema.columns;
      } else {
        // default to showing all nodeVars
        this.columns = Object.keys(this.nodeSchema.nodeVars)
      }  
    }

    if (this.multiSelect) {
      if (!(this.columns.indexOf('multiSelect') > -1)) {
        this.columns.unshift('multiSelect');
      }
    }

    this.changeDetectorRef.detectChanges();
  }

  onRowClick(row: any) {
    if (this.multiSelect) {
      this.selection.toggle(row);
      return;
    }

    // the following is for single select tables

    if (row.uid && !(this.selected && this.selected.uid === row.uid)) {
      this.selected = row;

      this.selectedRows.emit([row]);
    }
  }

  onRowEnter(row: any) {
    
  }

  onRowLeave() {

  }

  getColumnClass(col: string): string {

    switch (col) {
      case('multiSelect'):
        return `dm-tiny-col`;
      default: 
        return `dm-${col}-column`;
    }
  }

  checkFocus(): void {
    if (this.changeDetectorRef) {
      this.changeDetectorRef.detectChanges();
    }
  }
}

