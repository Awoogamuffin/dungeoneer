import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DmFormComponent } from './form/dm-form/dm-form.component';
import { DmInputComponent } from './form/dm-input/dm-input.component';
import { DmBaseInputComponent } from './form/inputs/dm-base-input/dm-base-input.component';
import { DmStringInputComponent } from './form/inputs/dm-string-input/dm-string-input.component';

import { OverlayModule } from '@angular/cdk/overlay';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';


import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DmDefaultDialogComponent } from './display/dialog/dm-default-dialog/dm-default-dialog.component';
import { DmDialogComponent } from './display/dialog/dm-dialog/dm-dialog.component';
import { DmSingleNodeDisplayComponent } from './display/dm-single-node-display/dm-single-node-display.component';
import { DmTableAndSingleNodeComponent } from './display/dm-table-and-single-node/dm-table-and-single-node.component';
import { DmTableComponent } from './display/dm-table/dm-table.component';
import { DmFormDialogComponent } from './form/dm-form-dialog/dm-form-dialog.component';
import { DmIntInputDirectiveDirective } from './form/inputs/dm-int-input/dm-int-input-directive.directive';
import { DmIntInputComponent } from './form/inputs/dm-int-input/dm-int-input.component';
import { DmLabelPipe } from './pipes/dm-label.pipe';
import { DmSafeHTMLPipe } from './pipes/dm-safe-html.pipe';
import { DmValuePipe } from './pipes/dm-value.pipe';

import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { DmSearchCardComponent } from './display/dm-search-card/dm-search-card.component';
import { DmCharacterSectionComponent } from './dm-character-sheet/components/dm-character-section/dm-character-section.component';
import { DmNodevarCardComponent } from './dm-character-sheet/components/dm-nodevar-card/dm-nodevar-card.component';
import { DmSimpleCardComponent } from './dm-character-sheet/components/dm-simple-card/dm-simple-card.component';
import { DmCharacterInventoryComponent } from './dm-character-sheet/dm-character-inventory/dm-character-inventory.component';
import { DmCharacterMagicComponent } from './dm-character-sheet/dm-character-magic/dm-character-magic.component';
import { DmCharacterNotesComponent } from './dm-character-sheet/dm-character-notes/dm-character-notes.component';
import { DmCharacterStatisticsComponent } from './dm-character-sheet/dm-character-statistics/dm-character-statistics.component';
import { DmAbilityModifierPipe } from './dm-character-sheet/pipes/dm-ability-modifier.pipe';
import { DmSkillModifierPipe } from './dm-character-sheet/pipes/dm-skill-modifier.pipe';
import { DmBooleanInputComponent } from './form/inputs/dm-boolean-input/dm-boolean-input.component';
import { DmTableInputComponent } from './form/inputs/dm-table-input/dm-table-input.component';
import { DmCharacterSheetComponent } from './routes/dm-character-sheet/dm-character-sheet.component';
import { DmMainComponent } from './routes/dm-main/dm-main.component';
import { DmSavingModifierPipe } from './dm-character-sheet/pipes/dm-saving-modifier.pipe';
import { DmTextInputComponent } from './form/inputs/dm-text-input/dm-text-input.component';

export let AppInjector: Injector;

@NgModule({
  declarations: [
    AppComponent,
    DmInputComponent,
    DmBaseInputComponent,
    DmStringInputComponent,
    DmFormComponent,
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
    DmMainComponent,
    DmCharacterStatisticsComponent,
    DmCharacterInventoryComponent,
    DmCharacterMagicComponent,
    DmCharacterNotesComponent,
    DmAbilityModifierPipe,
    DmSkillModifierPipe,
    DmBooleanInputComponent,
    DmSimpleCardComponent,
    DmNodevarCardComponent,
    DmCharacterSectionComponent,
    DmSavingModifierPipe,
    DmTextInputComponent
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
    MatCardModule,
    MatSelectModule,
    OverlayModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    AppInjector = this.injector;
  }
}
