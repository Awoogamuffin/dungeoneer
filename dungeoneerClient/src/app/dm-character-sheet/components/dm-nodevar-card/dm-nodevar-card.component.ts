import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { getDungeoneerSchema } from 'dungeoneer-common';
import { Schema } from 'dungeoneer-common';

@Component({
  selector: 'dm-nodevar-card',
  templateUrl: './dm-nodevar-card.component.html',
  styleUrls: ['./dm-nodevar-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DmNodevarCardComponent {

  @Input() nodevarObj!: any;
  @Input() character!: any;

  @Input() customContent: boolean = false;

  @Output() edit: EventEmitter<string> = new EventEmitter<string>();

  schema: Schema = getDungeoneerSchema();

  onValueEdit(key: string) {
    this.edit.emit(key);
  }
}
