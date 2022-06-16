import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  characterID!: string | null;
  character!: any;

  constructor(private dataStore: DmDataStoreService,
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {

    this.characterID = this.activatedRoute.snapshot.paramMap.get('uid');

    if (!this.characterID) {
      throw new Error('No character id was retrieved from url');
    }

    console.log('fetching character data for uid', this.characterID);
    this.dataStore.fetchData({
      nodeType: 'character',
      search: {
        uid: this.characterID
      },
      modality: 'full'
    }, 'characterSheetData');

    this.dataStore.getData('characterSheetData').pipe(takeUntil(this.unsubscribeAll)).subscribe((data) => {
      this.totalWeight = 0;
      if (data && data.data && data.data[0]) {
        this.character = data.data[0];
        console.log('CHARACTER DATA!', this.character);

        if (this.character.character_items) {
          console.log('have items');
          for (const item of this.character.character_items) {
            console.log('item', item, item.item_weight, item['character_items|amount']);
            if (item.item_weight && item['character_items|amount']) {
              this.totalWeight += item.item_weight * item['character_items|amount'];
            }
          }
        }

        this.changeDetectorRef.detectChanges();
      }
    })
  }

}
