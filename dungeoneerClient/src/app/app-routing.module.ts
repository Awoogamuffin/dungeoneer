import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DmCharacterSheetComponent } from './routes/dm-character-sheet/dm-character-sheet.component';
import { DmMainComponent } from './routes/dm-main/dm-main.component';

const routes: Routes = [
  { path: '', component: DmMainComponent },
  { path: 'characterSheet', component: DmCharacterSheetComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }