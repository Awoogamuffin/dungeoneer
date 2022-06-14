import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DmInputComponent } from './form/dm-input/dm-input.component';
import { DmBaseInputComponent } from './form/inputs/dm-base-input/dm-base-input.component';
import { DmStringInputComponent } from './form/inputs/dm-string-input/dm-string-input.component';
import { DmFormComponent } from './form/dm-form/dm-form.component';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { OverlayModule } from '@angular/cdk/overlay';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DmUnsubscriberComponent } from './core/dm-unsubscriber/dm-unsubscriber.component';
import { DmTableComponent } from './display/dm-table/dm-table.component';
import { DmDialogComponent } from './display/dialog/dm-dialog/dm-dialog.component';
import { DmFormDialogComponent } from './form/dm-form-dialog/dm-form-dialog.component';
import { DmDefaultDialogComponent } from './display/dialog/dm-default-dialog/dm-default-dialog.component';
import { DmSingleNodeDisplayComponent } from './display/dm-single-node-display/dm-single-node-display.component';
import { DmTableAndSingleNodeComponent } from './display/dm-table-and-single-node/dm-table-and-single-node.component';
import { DmValuePipe } from './pipes/dm-value.pipe';
import { DmLabelPipe } from './pipes/dm-label.pipe';
import { DmSafeHTMLPipe } from './pipes/dm-safe-html.pipe';
import { DmIntInputComponent } from './form/inputs/dm-int-input/dm-int-input.component';
import { DmIntInputDirectiveDirective } from './form/inputs/dm-int-input/dm-int-input-directive.directive';

import { MatTabsModule } from '@angular/material/tabs';
import { DmTableInputComponent } from './form/inputs/dm-table-input/dm-table-input.component';
import { DmSearchCardComponent } from './display/dm-search-card/dm-search-card.component';
import { DmCharacterSheetComponent } from './routes/dm-character-sheet/dm-character-sheet.component';
import { DmMainComponent } from './routes/dm-main/dm-main.component';



@NgModule({
  declarations: [
    AppComponent,
    DmInputComponent,
    DmBaseInputComponent,
    DmStringInputComponent,
    DmFormComponent,
    DmUnsubscriberComponent,
    DmTableComponent,
    DmDialogComponent,
    DmFormDialogComponent,
    DmDefaultDialogComponent,
    DmSingleNodeDisplayComponent,
    DmTableAndSingleNodeComponent,
    DmValuePipe,
    DmLabelPipe,
    DmSafeHTMLPipe,
    DmIntInputComponent,
    DmIntInputDirectiveDirective,
    DmTableInputComponent,
    DmSearchCardComponent,
    DmCharacterSheetComponent,
    DmMainComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatDialogModule,
    MatTabsModule,
    OverlayModule
  ],
  providers: [DmDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
