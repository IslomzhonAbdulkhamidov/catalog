import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PriceEditorComponent } from './price-editor/price-editor.component';


const routes: Routes = [
  {
    path: '',
    component: PriceEditorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PriceEditorExcelRoutingModule { }
