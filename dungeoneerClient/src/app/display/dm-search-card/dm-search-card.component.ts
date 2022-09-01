import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Schema } from 'dungeoneer-common';
import { getDungeoneerSchema } from 'dungeoneer-common'
import { Subject, takeUntil } from 'rxjs';
import { DmUnsubscriberComponent } from 'src/app/core/dm-unsubscriber/dm-unsubscriber.component';
import { DmFormInputData } from 'src/app/form/DmFormInputData';
import { DmFormUtils } from 'src/app/form/DmFormUtils';

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

  constructor(private dmFormUtils: DmFormUtils) {
    super();
  }

  ngOnInit(): void {
    if (!this.schema) {
      this.schema = getDungeoneerSchema();
    }

    if (!this.searchSubject) {
      throw new Error('No search subject provided for search card');
    }

    if (!this.nodeType) {
      throw new Error('no nodeType provided for search card');
    }



    this.searchInputs = this.dmFormUtils.generateInputsFromSchema(this.schema, this.nodeType, this.initialData, 'search');
    this.searchFormGroup = this.dmFormUtils.getFormGroupFromInputData(this.searchInputs);

    this.searchFormGroup.valueChanges.pipe(takeUntil(this.unsubscribeAll)).subscribe((data) => {
      this.searchSubject.next(data);
    });
  }

}
