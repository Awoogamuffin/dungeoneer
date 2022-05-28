import { ComponentType } from '@angular/cdk/portal';
import { Component, OnInit, ChangeDetectionStrategy, Input, ViewContainerRef, Inject, ComponentRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DmDialogConfig } from '../dm-dialog.service';

/**
 * 
 * This is just a wrapper for creating dialogs, so that you can make components intended to be a dialog but not have to inject the data, or add
 * the component as a provider etc.
 * 
 * A dialog is created with this component, then the actual component you want is added via viewContainerRef.createComponent. 
 * 
 */

@Component({
  selector: 'dm-empty-dialog',
  templateUrl: './dm-dialog.component.html',
  styleUrls: ['./dm-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DmDialogComponent implements OnInit {

  constructor(public viewContainerRef: ViewContainerRef,
    private dialogRef: MatDialogRef<DmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dmDialogConfig: DmDialogConfig) {
  }

  ngOnInit(): void {
    if (!(this.dmDialogConfig && this.dmDialogConfig.componentType)) {
      console.warn('no data sent to dialog component');
      return;
    }

    // first generate the component
    const componentRef: ComponentRef<unknown> = this.viewContainerRef.createComponent(this.dmDialogConfig.componentType);

    if (this.dmDialogConfig.componentData) {
      const containerInstance: any = componentRef.instance;
      if (!containerInstance) {
        return;
      }

      // generally speaking components will want access to this component to handle close events etc.
      // to do this, add a "dmDialog" property to said component
      try {
        containerInstance.dmDialog = this;
      } catch(e) {
        console.warn('unable to load dm Dialog into created component', this.dmDialogConfig.componentType, e);
      }
      

      // if component data has been provided, input it into the component instance
      // there's no easy check to see if the component can g
      for (const key of Object.keys(this.dmDialogConfig.componentData)) {
        try {
          containerInstance[key] = this.dmDialogConfig.componentData[key];
        } catch(e) {
          console.warn('unable to load property', key, 'into component type', this.dmDialogConfig.componentType, e);
        }
        
      }
    }
  }

  close(response?: any) {
    this.dialogRef.close(response);
  }

}
