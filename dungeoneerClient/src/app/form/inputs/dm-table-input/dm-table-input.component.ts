import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { getDungeoneerSchema } from 'dungeoneer-common';
import { Facet, Schema } from 'dungeoneer-common/dist/types/src/schema/schemaTypes';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { DmWebSocketService } from 'src/app/connection/dm-web-socket.service';
import { DmDataProvider } from 'src/app/data/dm-data-provider';
import { DmDataStoreService } from 'src/app/data/dm-data-store.service';
import { DmTableInputConfig } from '../../DmFormInputData';
import { DmBaseInputComponent } from '../dm-base-input/dm-base-input.component';

@Component({
  selector: 'dm-table-input',
  templateUrl: './dm-table-input.component.html',
  styleUrls: ['./dm-table-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => DmTableInputComponent),
    }
  ],
})
export class DmTableInputComponent extends DmBaseInputComponent implements OnInit {

  @Input()
  mode: 'single' | 'multi' = 'single';

  @Input()
  parentNodeType?: string;

  @Input()
  edgeType!: string;

  @Input()
  dataProvider!: DmDataProvider;

  @Input()
  returnPolicy: 'uid' | 'value' | 'direct' = 'uid';

  @Input()
  schema?: Schema;

  edgeSchema: any;

  shown = false;
  valueDisplay: string = 'Select';

  selectedSearchFC: FormControl = new FormControl();

  labelVar = 'name';
  toolTipDisplay = '';
  selected: any[] = [];
  filteredSelected: any[] = [];
  selection: any = {
    uids: {},
    onAdd: (row: any) => {
      if (this.edgeFacets) {
        for (const facet of this.edgeFacets) {
          const facetPredicate = this.parentNodeType + '_' + this.inputData.key + '|' + facet.name;
          if (facet.default) {
            row[facetPredicate] = facet.default;
          }
        }
      }
    }
  }

  edgeFacets?: Facet[];

  searchSubject: Subject<any> = new Subject();

  constructor(private dmData: DmDataStoreService,
    protected changeDetectorRef: ChangeDetectorRef,
    protected dmWebSocketClient: DmWebSocketService) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    console.log('GOT TO TABLE INPUT INITIALIZE');

    // Need to specialise the "value before edit" value for edit tables (they contain the label var, which shouldn't be there)

    this.selectedSearchFC.valueChanges.pipe(distinctUntilChanged(), takeUntil(this.unsubscribeAll)).subscribe(() => {
      this.deriveFilteredSelected();
    });

    if (!this.inputData) {
      throw new Error('Table inputs must have an inputData value');
    }

    if (this.inputData.config) {
      console.log('table config is', this.inputData.config);
      // unnecessary type assertion here for now, but in the future config can be of other types
      const config: DmTableInputConfig = this.inputData.config as DmTableInputConfig;
      this.edgeType = config.edgeType;
      this.parentNodeType = config.nodeType;
      this.edgeFacets = config.facets;
      this.mode = config.mode || 'single';
    }

    if (!this.edgeType) {
      throw new Error('Edge type not defined for table input');
    }

    if (!this.schema) {
      this.schema = getDungeoneerSchema();
    }

    console.log('getting edgeSchema', this.edgeType);
    this.edgeSchema = this.schema.nodeTypes[this.edgeType];

    this.labelVar = this.edgeSchema.labelVar || 'name';

    if (this.abstractControl.value) {

      const value = this.abstractControl.value;
      if (Array.isArray(value)) {
        for (const preSelected of value) {
          this.selection.uids[preSelected.uid] = preSelected;
        }

        this.selected = value;
      } else this.selected = [value];


      this.deriveFilteredSelected();
      this.deriveDisplayValues();
    }
  }

  onRowChange(selected: any) {
    // timeout necessary for value changes to show up for the return policy
    setTimeout(() => {
      this.selected = Array.isArray(selected) ? selected : [selected];
      this.deriveFilteredSelected();
      this.deriveDisplayValues();

      let toSet: any

      switch (this.returnPolicy) {
        case 'uid':
          toSet = this.selected.map((a) => {
            const toReturn: any = { uid: a.uid };
            if (this.edgeFacets) {
              for (const facet of this.edgeFacets) {
                const facetPredicate = this.parentNodeType + '_' + this.inputData.key + '|' + facet.name;
                if (a[facetPredicate]) {
                  switch (facet.type) {
                    case 'int':
                      toReturn[facetPredicate] = Number(a[facetPredicate]);
                      break;

                    default:
                      toReturn[facetPredicate] = a[facetPredicate];
                  }
                }
              } 
            } 

            return toReturn;
          });
          break;

        case 'value':
          toSet = this.selected.map((a) => { return a.value })
      }

      console.log('AFTER THAT!', toSet);

      this.abstractControl.setValue(this.mode === 'multi' ? toSet : toSet[0]);

      if (this.mode === 'single') {
        this.onClose();
      }

      this.changeDetectorRef.detectChanges();
    });
  }

  deselectAll() {
    this.selected = [];
    this.abstractControl.setValue(null);
    this.deriveFilteredSelected();
    this.deriveDisplayValues();

    this.changeDetectorRef.detectChanges();
  }

  deriveDisplayValues() {
    if (this.selected.length === 0) {
      this.valueDisplay = 'Select';
    } else {
      this.valueDisplay = this.selected.slice(0, 3).map((a) => {
        return a[this.edgeType + '_' + this.labelVar]
      }).join(', ');
      if (this.selected.length > 3) {
        this.valueDisplay += `... (${this.selected.length} total)`;
      }

      // this.valueDisplay = this.selected.length + ' seleccionado' + (this.selected.length === 1 ? '' : 's');
      this.toolTipDisplay = this.selected.map((a) => {
        return a[this.edgeType + '_' + this.labelVar]
      }).join('\n');
    }
  }

  deriveFilteredSelected() {
    if (this.selectedSearchFC.value && this.selectedSearchFC.value !== '') {
      this.filteredSelected = this.selected.filter((a: any) => {
        const toTest: any = a[this.edgeType + '_' + this.labelVar];
        return new RegExp(this.selectedSearchFC.value, "i").test(toTest);
      })
    } else {
      this.filteredSelected = [...this.selected];
    }
  }

  onLabelClick() {
    if (!this.shown) {
      this.shown = true;
      return;
    }

    this.onClose();
  }

  onClose() {
    this.abstractControl.markAsTouched();
    this.abstractControl.updateValueAndValidity({ onlySelf: true, emitEvent: true })
    this.shown = false;
  }

}
