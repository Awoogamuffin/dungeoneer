import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { dungeoneerSchema } from 'dungeoneer-common';
import { Schema } from 'dungeoneer-common/dist/types/src/schema/schemaTypes';

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

  schema: Schema = dungeoneerSchema;

  onValueEdit(key: string) {
    this.edit.emit(key);
  }
}
