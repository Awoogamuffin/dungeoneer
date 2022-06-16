import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { distinctUntilChanged, takeUntil } from 'rxjs';
import { DmDialogComponent } from 'src/app/display/dialog/dm-dialog/dm-dialog.component';
import { DmFormComponent } from '../dm-form/dm-form.component';
import { DmFormInputData } from '../DmFormInputData';

@Component({
  selector: 'dm-form-dialog',
  templateUrl: './dm-form-dialog.component.html',
  styleUrls: ['./dm-form-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DmFormDialogComponent extends DmFormComponent implements OnInit {

  @Input()
  dmDialog?: DmDialogComponent;

  saveButtonClass: string = 'mat-primary';
  formValid: boolean = false;

  constructor() {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.formGroup.statusChanges.pipe(distinctUntilChanged(),takeUntil(this.unsubscribeAll)).subscribe((data) => {
      this.checkSaveButtonClass();
    });

    this.checkSaveButtonClass();
    
  }

  onCancel() {
    if (this.dmDialog) {
      this.dmDialog.close();
    }
  }

  override onSubmit(): any {

    const toSubmit = super.onSubmit();

    if (toSubmit && this.dmDialog) {
      this.dmDialog.close(toSubmit);
    }

    console.log('TO SUBMIT', toSubmit);
 
    return toSubmit;
  }

  checkSaveButtonClass() {
    setTimeout(() => {
      console.log('checking save button class', this.formGroup.valid, this.formGroup.value, this.formGroup);
      const saveClass: string = this.formGroup.valid ? 'mat-primary' : 'mat-warn';
      if (saveClass !== this.saveButtonClass) {
        console.log('setting save class to', saveClass);
        this.saveButtonClass = saveClass;
        //this.changeDetectorRef.detectChanges();
      }
    });
  }

}
