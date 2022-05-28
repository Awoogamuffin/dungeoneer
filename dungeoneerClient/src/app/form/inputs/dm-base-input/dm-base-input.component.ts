import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { DmUnsubscriberComponent } from 'src/app/core/dm-unsubscriber/dm-unsubscriber.component';
import { DmFormInputData } from '../../DmFormInputData';

@Component({
  selector: 'app-dm-base-input',
  templateUrl: './dm-base-input.component.html',
  styleUrls: ['./dm-base-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DmBaseInputComponent extends DmUnsubscriberComponent implements OnInit, ControlValueAccessor {

  onTouched: Function = (value: any) => {};
  onChange: Function = (value: any) => {};

  @Input()
  abstractControl!: AbstractControl;

  @Input()
  label: string = 'input';

  @Input()
  inputData!: DmFormInputData;

  constructor() {
    super();
  }

  ngOnInit(): void {

    if (this.inputData) {
      this.label = this.inputData.label || this.inputData.key;
      this.abstractControl = this.inputData.abstractControl;

      if (this.inputData.valueBeforeEdit) {
        this.abstractControl.setValue(this.inputData.valueBeforeEdit, { emitEvent: false })
      }
    }

    if (!this.abstractControl) {
      this.abstractControl = new FormControl();
    }

    // run onChange whenever changes are made to the abstract control
    this.abstractControl.valueChanges.pipe(takeUntil(this.unsubscribeAll)).subscribe((data) => {
      if (this.onChange) {
        this.onChange(data);
      }
    });
  }

  // function to be extended depending on value type
  valueHasChanged(value: any): boolean {
    return value !== this.abstractControl.value;
  }

  /**
   * The following functions are required to implement ControlValueAccessor
   */

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = (value: any) => {

      // because our formcontrol is different from the one created by ngModel, this part is necessary if we're using [(ngModel)]
      if (this.valueHasChanged(value)) {
        this.abstractControl.setValue(value);
      }
      
      fn(value)
    };
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    this.onChange(value);
  }

}
