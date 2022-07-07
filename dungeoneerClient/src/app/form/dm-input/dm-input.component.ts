import { ChangeDetectionStrategy, Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { DmFormInputData } from '../DmFormInputData';
import { DmBooleanInputComponent } from '../inputs/dm-boolean-input/dm-boolean-input.component';
import { DmIntInputComponent } from '../inputs/dm-int-input/dm-int-input.component';
import { DmStringInputComponent } from '../inputs/dm-string-input/dm-string-input.component';
import { DmTableInputComponent } from '../inputs/dm-table-input/dm-table-input.component';

@Component({
  selector: 'dm-input',
  templateUrl: './dm-input.component.html',
  styleUrls: ['./dm-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DmInputComponent implements OnInit {

  @Input()
  inputData!: DmFormInputData

  constructor(public viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void {
    if (!this.inputData) {
      console.warn('input data required for DmInputComponent');
      return;
    }

    switch(this.inputData.type) {
      case 'string':
        this.viewContainerRef.createComponent(DmStringInputComponent).instance.inputData = this.inputData;
        break;

      case 'int':
        this.viewContainerRef.createComponent(DmIntInputComponent).instance.inputData = this.inputData;
        break;
      
      case 'boolean':
        this.viewContainerRef.createComponent(DmBooleanInputComponent).instance.inputData = this.inputData;
        break;

      case 'node[]':
        this.viewContainerRef.createComponent(DmTableInputComponent).instance.inputData = this.inputData;
        break;

      default:
        console.warn('No input found for type', this.inputData.type);
    }
  }

}
