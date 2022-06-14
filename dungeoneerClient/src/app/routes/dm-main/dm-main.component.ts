import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { DmDataStoreService } from 'src/app/data/dm-data-store.service';

@Component({
  selector: 'dm-main',
  templateUrl: './dm-main.component.html',
  styleUrls: ['./dm-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DmMainComponent implements OnInit {

  currentCharacter: any;

  constructor(private router: Router, private dataStore: DmDataStoreService) { }

  ngOnInit(): void {
    this.dataStore.getData('currentCharacter').subscribe((data) => {
      console.log('got current character data', data);
      this.currentCharacter = null;
      if (data && data.data && data.data[0]) {
        this.currentCharacter = data.data[0];
      }
    })
  }

  onViewCharacterSheet() {
    this.router.navigate(['characterSheet'])
  }

}
