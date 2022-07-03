import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DmAbstractCharacterComponent } from '../dm-abstract-character.component';

@Component({
  selector: 'dm-character-notes',
  templateUrl: './dm-character-notes.component.html',
  styleUrls: ['./dm-character-notes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DmCharacterNotesComponent extends DmAbstractCharacterComponent {

}
