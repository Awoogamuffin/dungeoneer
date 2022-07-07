import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dmLabel'
})
export class DmLabelPipe implements PipeTransform {

  // if schema is provided, extract the label
  transform(key: string, schema: any, nodeType: string): string {
    if (schema && schema.nodeTypes[nodeType]) {
      const nodeTypeSchema = schema.nodeTypes[nodeType];
      const nodeVarSchema = nodeTypeSchema.nodeVars[key];
      if (nodeVarSchema?.label) {
        return nodeVarSchema.label;
      }
    }

    return key;
  }

}
