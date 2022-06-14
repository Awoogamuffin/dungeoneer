import { AbstractControl } from "@angular/forms";
import { Facet, Schema } from "dungeoneer-common/dist/types/src/schema/schemaTypes";

export interface DmFormInputData {
    // the control that handles this input. Abstract control becasue it could be a FormArray, FormGroup or FormControl.
    abstractControl: AbstractControl,

    // similar to what's happening in the schema
    type: string

    // this is the key for the value of this input. Used in form group and ultimately in the database
    key: string

    // self explanatory I should hope. If not set, key is used
    label?: string

    // when editing, this is the input's starting value
    valueBeforeEdit?: any

    // additional config which varies depending on input type (for now only table input)
    config?: DmTableInputConfig
}

export interface DmTableInputConfig {
    // if this is not set, dungeoneerSchema is used
    schema?: Schema

    // the "parent" node type
    nodeType: string

    // the "child" nodetype – the one this table input searches from (as opposed to the nodeType being edited)
    edgeType: string

    // facets are extra variables slapped onto the link itself
    facets?: Facet[]

    // the difference between tpyes node / child and node[] / child[]
    mode: 'single' | 'multi'
}