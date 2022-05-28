import { Component, OnInit, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DmBaseInputComponent } from '../dm-base-input/dm-base-input.component';

@Component({
  selector: 'dm-string-input',
  templateUrl: './dm-string-input.component.html',
  styleUrls: ['./dm-string-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => DmStringInputComponent),
    }
  ],
})
export class DmStringInputComponent extends DmBaseInputComponent implements OnInit {

  constructor() {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  clearString(): void {
    this.abstractControl.setValue(null);
  }

  getFormControl(): FormControl {
    return this.abstractControl as FormControl;
  }

}
