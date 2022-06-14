import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { takeUntil } from 'rxjs';
import { DmUnsubscriberComponent } from 'src/app/core/dm-unsubscriber/dm-unsubscriber.component';
import { DmDataStoreService } from 'src/app/data/dm-data-store.service';

@Component({
  selector: 'dm-character-sheet',
  templateUrl: './dm-character-sheet.component.html',
  styleUrls: ['./dm-character-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DmCharacterSheetComponent extends DmUnsubscriberComponent implements OnInit {

  totalWeight = 0;

  constructor(private dataStore: DmDataStoreService) {
    super();
  }

  ngOnInit(): void {
    this.dataStore.getData('currentCharacter').pipe(takeUntil(this.unsubscribeAll)).subscribe((data) => {
      this.totalWeight = 0;
      if (data && data.data && data.data[0]) {
        const character = data.data[0];
        console.log('CHARACTER DATA!', character);

        if (character.character_items) {
          for (const item of character.character_items) {
            if (item.item_weight && item['character_items|amount']) {
              this.totalWeight += item.item_weight * item['character_items|amount'];
            }
          }
        }
      }
    })
  }

}
