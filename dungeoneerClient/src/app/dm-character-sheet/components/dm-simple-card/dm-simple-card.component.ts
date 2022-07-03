import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'dm-simple-card',
  templateUrl: './dm-simple-card.component.html',
  styleUrls: ['./dm-simple-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DmSimpleCardComponent {

  @Input() label!: string;
  @Input() value!: any;

}
