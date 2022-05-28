import { AbstractControl, FormControl, ValidatorFn, Validators } from "@angular/forms";
import { NodeType, NodeVar, Schema } from "dungeoneer-common/dist/types/src/schema/schemaTypes";
import { DmFormInputData } from "./DmFormInputData";

export function generateInputsFromSchema(schema: Schema, nodeType: string, initialData?: any): DmFormInputData[] {
    if (!schema.nodeTypes[nodeType]) {
        throw new Error(`Schema doesn't contain nodetype ${nodeType}`);
    }

    const nodeSchema: NodeType = schema.nodeTypes[nodeType];
    
    if (!nodeSchema.edit) {
        throw new Error(`Node type ${nodeType} does not have an edit value saved`);
    }

    const toReturn: DmFormInputData[] = [];

    for (const varName of nodeSchema.edit) {

        // we assume this exists, because I will eventually write a test suite for schemas.
        const varSchema: NodeVar = nodeSchema.nodeVars[varName];

        // in the future this will depend on the var type
        let abstractControl: AbstractControl = new FormControl();

        if (varSchema.validation) {
            const validators: ValidatorFn[] = [];

            if (varSchema.validation.required) {
                validators.push(Validators.required);
            }

            abstractControl.addValidators(validators);
        }

        const toPush: DmFormInputData = {
            key: varName,
            label: varSchema.label,
            abstractControl: abstractControl,
            type: varSchema.type
        };

        if (initialData && initialData[nodeType + '_' + varName]) {
            toPush.valueBeforeEdit = initialData[nodeType + '_' + varName];
        }

        toReturn.push(toPush);
    }

    return toReturn;
}