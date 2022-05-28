import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { DmDialogComponent } from '../dm-dialog/dm-dialog.component';

@Component({
  selector: 'dm-default-dialog',
  templateUrl: './dm-default-dialog.component.html',
  styleUrls: ['./dm-default-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DmDefaultDialogComponent implements OnInit {

  @Input()
  title?: string;
  
  constructor() {
  }

  ngOnInit(): void {
  }

}
