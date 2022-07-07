import { ChangeDetectionStrategy, Component } from '@angular/core';
import { dungeoneerSchema } from 'dungeoneer-common';
import { EditEventObject } from 'src/app/form/dm-form-edit/dm-edit-event.model';
import { DmAbstractCharacterComponent } from '../dm-abstract-character.component';

@Component({
  selector: 'dm-character-statistics',
  templateUrl: './dm-character-statistics.component.html',
  styleUrls: ['./dm-character-statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DmCharacterStatisticsComponent extends DmAbstractCharacterComponent {

  // creature attributes are the descriptive elements of a character, e.g. class, race and background
  // also including 
  creatureDescription = ['class', 'level', 'background', 'race', 'alignment', 'experience', 'inspiration'];
  abilities = ['abilityStrength', 'abilityDexterity', 'abilityConstitution', 'abilityIntelligence', 'abilityWisdom', 'abilityCharisma'];
  // abilityModifier = Math.floor((ability - 10) / 2)
  savingThrows = ['savingStrength', 'savingDexterity', 'savingConstitution', 'savingIntelligence', 'savingWisdom', 'savingCharisma'];
  // saving throw values are determined from the corresponding abilities
  // possible modifiers to saving throws: 1) proficient (+PB), 2) has advantage against <attack_type>, 3)DM says so, 4) ??
  skills = new Map<string, string>([
    ['AnimalHandling', 'abilityWisdom'],
    ['Acrobatics', 'abilityDexterity'], 
    ['Arcana', 'abilityIntelligence'],
    ['Athletics', 'abilityStrength'],
    ['Deception', 'abilityCharisma'],
    ['History', 'abilityIntelligence'],
    ['Insight', 'abilityWisdom'],
    ['Intimidation', 'abilityCharisma'],
    ['Investigation', 'abilityIntelligence'],
    ['Medicine', 'abilityWisdom'],
    ['Nature', 'abilityIntelligence'],
    ['Perception', 'abilityWisdom'],
    ['Performance', 'abilityCharisma'],
    ['Persuasion', 'abilityCharisma'],
    ['Religion', 'abilityIntelligence'],
    ['SleightOfHand', 'abilityDexterity'],
    ['Stealth', 'abilityDexterity'],
    ['Survival', 'abilityWisdom']
  ]
  );
  // skill values are determined from the corresponding abilities
  // possible modifiers to skills: 1) proficient (+PB), 2) jack of all trades (+PB/2), 3) expertise (x2), 4) DM says so, 5) ??
  healthState = ['hitPointsMax', 'hitPointsCurrent', 'hitPointsTemp', 'hitDiceTotal', 'hitDiceCurrent', 'deathSuccesses', 'deathFailures'];
  // speed is determined by race + some external effects
  // proficiencyBonus = 1 + Math.ceil(level / 4)
  // initiative = dexterity
  // armourClass = armour AC + Dexterity modifier
  

  onValueEdit(key: string) {
    console.log(`${key}`);
    const editEventObject: EditEventObject = {
      initialData: {
        uid: this.characterID,
        [this.NODE_TYPE + '_' + key]: this.character[this.NODE_TYPE + '_' + key]
      },
      columns: [key]
    }

    this.formEditService.editEvent(dungeoneerSchema, this.NODE_TYPE, editEventObject);
  }

}
