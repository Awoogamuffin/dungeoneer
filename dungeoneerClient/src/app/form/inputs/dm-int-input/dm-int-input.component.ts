import { Component, OnInit, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DmBaseInputComponent } from '../dm-base-input/dm-base-input.component';

@Component({
  selector: 'dm-int-input',
  templateUrl: './dm-int-input.component.html',
  styleUrls: ['./dm-int-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => DmIntInputComponent),
    }
  ],
})
export class DmIntInputComponent extends DmBaseInputComponent implements OnInit {

  constructor() {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit()
  }

  getFormControl(): FormControl {
    return this.abstractControl as FormControl;
  }

}
