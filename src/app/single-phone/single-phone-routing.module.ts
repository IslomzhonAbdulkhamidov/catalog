import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SinglePhoneComponent } from './single-phone.component';


const routes: Routes = [
  {
    path: "",
    component: SinglePhoneComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SinglePhoneRoutingModule { }
