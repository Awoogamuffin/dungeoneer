import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'dm-character-section',
  templateUrl: './dm-character-section.component.html',
  styleUrls: ['./dm-character-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DmCharacterSectionComponent {

  @Input() sectionTitle = 'Section';

}
