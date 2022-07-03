import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DmBaseInputComponent } from '../dm-base-input/dm-base-input.component';

@Component({
  selector: 'dm-boolean-input',
  templateUrl: './dm-boolean-input.component.html',
  styleUrls: ['./dm-boolean-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => DmBooleanInputComponent),
    }
  ],
})
export class DmBooleanInputComponent extends DmBaseInputComponent {

  getFormControl(): FormControl {
    return this.abstractControl as FormControl;
  }
}
