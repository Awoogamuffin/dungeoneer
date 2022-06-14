import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { DmUnsubscriberComponent } from 'src/app/core/dm-unsubscriber/dm-unsubscriber.component';
import { DmFormInputData } from '../DmFormInputData';
import { getFormChangedValues } from '../DmFormUtils';

@Component({
  selector: 'dm-form',
  templateUrl: './dm-form.component.html',
  styleUrls: ['./dm-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DmFormComponent extends DmUnsubscriberComponent implements OnInit {

  @Input()
  inputs!: DmFormInputData[];

  @Input()
  valuesBeforeEdit?: any;

  @Input()
  onlySubmitChanges: boolean = true;

  @Output()
  submit: EventEmitter<any> = new EventEmitter();

  public formGroup!: FormGroup;

  constructor() {
    super();
  }

  ngOnInit(): void {
    if (!this.inputs) {
      console.warn('No inputs provided');
      return;
    }

    const controls: any = {};

    for (const input of this.inputs) {
      console.log('input value before edit!', input.valueBeforeEdit);
      if (input.valueBeforeEdit === undefined) {
        input.valueBeforeEdit = null;
      }
      controls[input.key] = input.abstractControl;
      if (this.valuesBeforeEdit && this.valuesBeforeEdit[input.key]) {
        console.log('assigning from this.valuesBeforeEdit');
        input.valueBeforeEdit = this.valuesBeforeEdit[input.key];
      }
    }

    this.formGroup = new FormGroup(controls);
  }

  /**
   * 
   * @returns the values to set if successful. Null if not
   */

  onSubmit(): any {


    if (!this.formGroup.valid) {
      this.markAllAsTouchedAndUpdateValidity();
      return null;
    }

    if (this.onlySubmitChanges) {
      return getFormChangedValues(this.inputs);
    }

    // I think all forms will only submit changes, but if at some point we want to submit everything, do that here
    return null;
  }

  markAllAsTouchedAndUpdateValidity() {
    this.formGroup.markAllAsTouched()

    // the following is necessary to make the inputs display any errors if there are any

    const checkControl = (control: AbstractControl) => {
      if (control instanceof FormControl) {
        control.updateValueAndValidity();
      } else if (control instanceof FormArray) {
        for (const arrayControl of control.controls) {
          checkControl(arrayControl)
        }
      } else if (control instanceof FormGroup) {
        for (const controlKey of Object.keys(control.controls)) {
          const groupControl: AbstractControl = control.controls[controlKey];
          checkControl(groupControl);
        }
      }
    }

    checkControl(this.formGroup);
  }

}
