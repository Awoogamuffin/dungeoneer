import { formatDate } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { NodeType, NodeVar } from 'dungeoneer-common/dist/types/src/schema/schemaTypes';

@Pipe({
  name: 'dmValue'
})
export class DmValuePipe implements PipeTransform {

  constructor(@Inject(LOCALE_ID) private locale: string) {
  }

  transform(fakeKey: string, item: any, schema: any, nodeType: string, itemData?: any): string {
    if (schema.nodeTypes[nodeType]) {
      console.log('fake key', fakeKey);
      const key = `${nodeType}_${fakeKey}`;

      // had to use hasOwnProperty because simply using !item[key] returns flase for numerical 0
      if (!item.hasOwnProperty(key)) {
        return '';
      }

      const nodeSchema: NodeType = schema.nodeTypes[nodeType];

      const varSchema: NodeVar = nodeSchema.nodeVars[fakeKey];

      if (!varSchema) {
        return key;
      }
      switch (varSchema.type) {
        case 'string':
          return item[key];

        case 'child':
        case 'node':
          if (varSchema.nodeType) {
            const edgeSchema = schema.nodeTypes[varSchema.nodeType];
            let labelVar = edgeSchema.labelVar || 'name';
            labelVar = `${varSchema.nodeType}_${labelVar}`;

            if (item[key][labelVar]) {
              return item[key][labelVar];
            }
          }
          return '';

        case 'date':
          return formatDate(new Date(item[key]), 'MMMM dd, yyyy', this.locale);

        case 'datetime':
          return formatDate(new Date(item[key]), 'HH:mm MMMM dd, yyyy', this.locale);
        
        case 'boolean':
          return item[key] ? 'True' : 'False';

        default:
          return item[key];
      }
      
      
    }

    return '';
  }

}
