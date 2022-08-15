import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, NgZone } from '@angular/core';
import { FormControl } from '@angular/forms';
import { take } from 'rxjs';
import { DmBaseInputComponent } from '../dm-base-input/dm-base-input.component';

@Component({
  selector: 'dm-text-input',
  templateUrl: './dm-text-input.component.html',
  styleUrls: ['./dm-text-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DmTextInputComponent extends DmBaseInputComponent implements OnInit {

  // taken straight from the mat-angular auto resizing example https://material.angular.io/cdk/text-field/overview

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  constructor(private _ngZone: NgZone) {
    super();
  }

  getFormControl(): FormControl {
    return this.abstractControl as FormControl;
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }
}
