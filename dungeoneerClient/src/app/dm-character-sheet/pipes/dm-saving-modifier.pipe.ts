import { Pipe, PipeTransform } from '@angular/core';
import { CreatureStats } from '../model/creature-stats.model';

@Pipe({
  name: 'dmSavingModifier'
})
export class DmSavingModifierPipe implements PipeTransform {

  transform(abilityModifier: string, abilityName: string, characterStats: CreatureStats): string {

    let saveModifier: number = +abilityModifier;

    const savingProficiencies: string = characterStats.character?.character_savingProficiencies?.toLowerCase();

    const isProficient = savingProficiencies?.includes(abilityName.toLowerCase()) || 
      savingProficiencies?.includes(abilityName.toLowerCase().replace('ability', ''));
    
    if (isProficient) {
      saveModifier += characterStats.profiencyBonus;
    }

    return `${(saveModifier < 0 ? '' : '+') + saveModifier}`;
  }

}
