import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { DmLinkSetParams } from "dungeoneer-common/dist/types/src/connection/connectionTypes";
import { NodeType, NodeVar, Schema } from "dungeoneer-common/dist/types/src/schema/schemaTypes";
import { DmFormInputData, DmTableInputConfig } from "./DmFormInputData";

export function generateInputsFromSchema(schema: Schema, nodeType: string, initialData?: any, columns?: 'search' | string[]): DmFormInputData[] {
    if (!schema.nodeTypes[nodeType]) {
        throw new Error(`Schema doesn't contain nodetype ${nodeType}`);
    }

    const nodeSchema: NodeType = schema.nodeTypes[nodeType];
    
    let inputNameArray = nodeSchema.edit;

    if (columns) {
        inputNameArray = columns === 'search' ? nodeSchema.search : columns;
    }

    if (!inputNameArray) {
        throw new Error(`Unable to derive input name array. Columns value was ${columns}`);
    }

    const toReturn: DmFormInputData[] = [];

    for (const varName of inputNameArray) {

        const toPush: DmFormInputData = getFormInputData(nodeSchema, nodeType, varName, !(columns === 'search'), initialData);

        toReturn.push(toPush);
    }

    return toReturn;
}

export function getFormGroupFromInputData(inputs: DmFormInputData[]): FormGroup {
    const controls: any = {}
    
    for (const input of inputs) {
        controls[input.key] = input.abstractControl;
    }

    return new FormGroup(controls);
}

export function getFormChangedValues(inputs: DmFormInputData[]): any {
    const toSubmit: any = {};

    for (const input of inputs) {
        console.log('getting form changes', input.valueBeforeEdit, input.abstractControl.value, JSON.stringify(input.valueBeforeEdit) !== JSON.stringify(input.abstractControl.value));
    }
    // maybe not the most optimised filter to check for change using stringify. Potentially could be optimised according to input type
    for (const input of inputs.filter(input => JSON.stringify(input.valueBeforeEdit) !== JSON.stringify(input.abstractControl.value))) {

        

        switch(input.type) {
            case 'node[]':
                // first make map of uids for each value
                const beforeEditByUid: any = {};
                const editByUid: any = {};

                if (Array.isArray(input.valueBeforeEdit)) {
                    for (const node of input.valueBeforeEdit) {
                        beforeEditByUid[node.uid] = node;
                    }
                }
                if (Array.isArray(input.abstractControl.value)) {
                    for (const node of input.abstractControl.value) {
                        editByUid[node.uid] = node;
                    }
                }

                const toDelete: any = [];
                const toModify: any = [];
                const toAdd: any = [];

                for (const uid of Object.keys(beforeEditByUid)) {
                    // if this uid value is nolonger in the edited list, the link needs to be removed
                    if (!editByUid[uid]) {
                        toDelete.push(beforeEditByUid[uid]);
                    } else {
                        // for node[] type, we just need to check if facets have been modified
                        if (JSON.stringify(beforeEditByUid[uid]) !== JSON.stringify(editByUid[uid])) {
                            toModify.push(editByUid[uid]);
                        }

                        // we now delete this from the editByUid obj because any remaining items will be added to the toAdd array
                        delete editByUid[uid]
                    }
                }

                for (const uid of Object.keys(editByUid)) {
                    toAdd.push(editByUid[uid]);
                }

                const linkSetParams: DmLinkSetParams =  {
                    toDelete: toDelete,
                    toModify: toModify,
                    toAdd: toAdd
                }

                toSubmit[input.key] = linkSetParams;
                break;

            default:
                toSubmit[input.key] = input.abstractControl.value;
        }
    }
    return toSubmit;
}

function getFormInputData(nodeSchema: NodeType, nodeType: string, varName: string, withValidation = true, initialData?: any): DmFormInputData {
    // we assume this exists, because I will eventually write a test suite for schemas.
    const varSchema: NodeVar = nodeSchema.nodeVars[varName];

    // in the future this will depend on the var type
    let abstractControl: AbstractControl = new FormControl();

    if (varSchema.validation && withValidation) {
        const validators: ValidatorFn[] = [];

        if (varSchema.validation.required) {
            validators.push(Validators.required);
        }

        abstractControl.addValidators(validators);
    }

    const formInputData: DmFormInputData = {
        key: varName,
        label: varSchema.label,
        abstractControl: abstractControl,
        type: varSchema.type
    };

    switch(varSchema.type) {
        case 'node[]':
            if (!varSchema.nodeType) {
                throw new Error('nodeType must be set for node[] type nodeVars');
            }
            const tableConfig: DmTableInputConfig = {
                nodeType: nodeType,
                edgeType: varSchema.nodeType,
                mode: 'multi',
                facets: varSchema.facets
            }
            formInputData.config = tableConfig;
    }

    if (initialData && initialData[nodeType + '_' + varName]) {
        console.log('assigning value before edit', nodeType + '_' + varName, initialData[nodeType + '_' + varName], typeof initialData[nodeType + '_' + varName], typeof initialData[nodeType + '_' + varName] === 'object');
        formInputData.valueBeforeEdit = typeof initialData[nodeType + '_' + varName] === 'object' ?
        JSON.parse(JSON.stringify(initialData[nodeType + '_' + varName])) :
        initialData[nodeType + '_' + varName];
    }

    return formInputData;
}