import { ComponentType } from '@angular/cdk/portal';
import { Component, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DmDialogComponent } from './dm-dialog/dm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DmDialogService {

  constructor(private dialog: MatDialog) { }

  openDialog(dmDialogConfig: DmDialogConfig, matDialogConfig?: MatDialogConfig): Observable<any> {
    if (!matDialogConfig) {
      matDialogConfig = new MatDialogConfig();
      matDialogConfig.autoFocus = false;
      matDialogConfig.data = dmDialogConfig;
    }

    const dialogRef = this.dialog.open(DmDialogComponent, matDialogConfig)

    return dialogRef.afterClosed();
  }
}

/**
 * config to send to the dialog generator. For now you just specifiy what component type and what data to input.
 */
export interface DmDialogConfig {
  componentType: ComponentType<unknown>,
  componentData?: any
}