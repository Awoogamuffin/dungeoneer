import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DmAbstractCharacterComponent } from '../dm-abstract-character.component';

@Component({
  selector: 'dm-character-inventory',
  templateUrl: './dm-character-inventory.component.html',
  styleUrls: ['./dm-character-inventory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DmCharacterInventoryComponent extends DmAbstractCharacterComponent {

  totalWeight = 0;

  public override onCharacterChange(characterID: string, character: any): void {
    super.onCharacterChange(characterID, character);

    this.calculateTotalCarriedWeight();
  }

  calculateTotalCarriedWeight(): void {
    if (this.character.character_items) {
      console.log('have items');
      for (const item of this.character.character_items) {
        console.log('item', item, item.item_weight, item['character_items|amount']);
        if (item.item_weight && item['character_items|amount']) {
          this.totalWeight += item.item_weight * item['character_items|amount'];
        }
      }
    }
  }
}
