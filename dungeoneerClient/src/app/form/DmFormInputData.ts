import { AbstractControl } from "@angular/forms";

export interface DmFormInputData {
    // the control that handles this input. Abstract control becasue it could be a FormArray, FormGroup or FormControl.
    abstractControl: AbstractControl,

    // similar to what's happening in the schema
    type: string

    // this is the key for the value of this input. Used in form group and ultimately in the database
    key: string

    // self explanatory I should hope. If not set, key is used
    label?: string,

    // when editing, this is the input's starting value
    valueBeforeEdit?: any
}