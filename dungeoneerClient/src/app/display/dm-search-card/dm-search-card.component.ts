import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { dungeoneerSchema } from 'dungeoneer-common';
import { NodeType, Schema } from 'dungeoneer-common/dist/types/src/schema/schemaTypes';
import { Subject, takeUntil } from 'rxjs';
import { DmUnsubscriberComponent } from 'src/app/core/dm-unsubscriber/dm-unsubscriber.component';
import { DmFormInputData } from 'src/app/form/DmFormInputData';
import { generateInputsFromSchema, getFormGroupFromInputData } from 'src/app/form/DmFormUtils';

@Component({
  selector: 'dm-search-card',
  templateUrl: './dm-search-card.component.html',
  styleUrls: ['./dm-search-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DmSearchCardComponent extends DmUnsubscriberComponent implements OnInit {

  @Input()
  searchSubject!: Subject<any>;

  @Input()
  nodeType!: string;

  @Input()
  schema?: Schema;

  @Input()
  initialData?: any;

  searchFormGroup!: FormGroup;
  searchInputs!: DmFormInputData[];

  constructor() {
    super();
  }

  ngOnInit(): void {
    if (!this.schema) {
      this.schema = dungeoneerSchema;
    }

    if (!this.searchSubject) {
      throw new Error('No search subject provided for search card');
    }

    if (!this.nodeType) {
      throw new Error('no nodeType provided for search card');
    }

    this.searchInputs = generateInputsFromSchema(this.schema, this.nodeType, this.initialData, 'search');
    this.searchFormGroup = getFormGroupFromInputData(this.searchInputs);

    this.searchFormGroup.valueChanges.pipe(takeUntil(this.unsubscribeAll)).subscribe((data) => {
      this.searchSubject.next(data);
    });
  }

}
