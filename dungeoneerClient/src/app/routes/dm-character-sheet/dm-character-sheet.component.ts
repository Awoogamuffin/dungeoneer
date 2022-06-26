import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { DmAbstractCharacterComponent } from 'src/app/character-sheet/dm-abstract-character.component';
import { DmUnsubscriberComponent } from 'src/app/core/dm-unsubscriber/dm-unsubscriber.component';
import { DmDataStoreService } from 'src/app/data/dm-data-store.service';

@Component({
  selector: 'dm-character-sheet',
  templateUrl: './dm-character-sheet.component.html',
  styleUrls: ['./dm-character-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DmCharacterSheetComponent extends DmUnsubscriberComponent implements OnInit {

  private readonly NODE_TYPE = 'character';

  @ViewChildren('characterPage') characterPages!: QueryList<DmAbstractCharacterComponent>;

  characterID!: string | null;
  character!: any;

  constructor(private dataStore: DmDataStoreService,
    private router: Router,
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
      nodeType: this.NODE_TYPE,
      search: {
        uid: this.characterID
      },
      modality: 'full'
    }, 'characterSheetData');

    this.dataStore.getData('characterSheetData').pipe(takeUntil(this.unsubscribeAll)).subscribe((data) => {

      if (data && data.data && data.data[0]) {
        this.character = data.data[0];
        console.log('CHARACTER DATA!', this.character);
        this.characterPages?.forEach((c) => c.onCharacterChange(this.characterID, this.character));

        this.changeDetectorRef.detectChanges();
      }
    })
  }

  returnToMainPage(): void {
    this.router.navigate(['/']);
  }
}
