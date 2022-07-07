import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dmAbilityModifier'
})
export class DmAbilityModifierPipe implements PipeTransform {

  transform(abilityScore: string, ...args: unknown[]): string {
    const abilityModifier: number = Math.floor((+abilityScore - 10) / 2);

    return `${(abilityModifier < 0 ? '' : '+') + abilityModifier}`;
  }

}
