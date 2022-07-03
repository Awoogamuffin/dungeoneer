import { Pipe, PipeTransform } from '@angular/core';
import { CreatureStats } from '../model/creature-stats.model';

@Pipe({
  name: 'dmSkillModifier'
})
export class DmSkillModifierPipe implements PipeTransform {

  transform(abilityModifier: string, characterStats: CreatureStats): string {

    let skillModifier: number = +abilityModifier;

    // TODO: retrieve these properties from the character schema
    const hasExpertise = false;
    const isProficient = false;
    const isJackOfAllTrades = characterStats.character?.character_isJackOfAllTrades;

    if (hasExpertise) {
      skillModifier += characterStats.profiencyBonus * 2;
    }
    else if (isProficient) {
      skillModifier += characterStats.profiencyBonus;
    } else if (isJackOfAllTrades) {
      skillModifier += Math.floor(characterStats.profiencyBonus / 2);
    }

    return `${(skillModifier < 0 ? '' : '+') + skillModifier}`;
  }

}
