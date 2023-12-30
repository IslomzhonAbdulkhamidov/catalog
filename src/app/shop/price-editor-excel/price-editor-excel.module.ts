import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PriceEditorExcelRoutingModule } from './price-editor-excel-routing.module';
import { PriceEditorComponent } from './price-editor/price-editor.component';
import { HotTableModule } from '@handsontable/angular';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    PriceEditorComponent
  ],
  imports: [
    CommonModule,
    PriceEditorExcelRoutingModule,
    FormsModule,
    HotTableModule.forRoot(),
    SharedModule
  ]
})
export class PriceEditorExcelModule { }
