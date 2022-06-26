import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DmAbstractCharacterComponent } from '../dm-abstract-character.component';

@Component({
  selector: 'dm-character-magic',
  templateUrl: './dm-character-magic.component.html',
  styleUrls: ['./dm-character-magic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DmCharacterMagicComponent extends DmAbstractCharacterComponent {


}
