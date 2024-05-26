import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorloginComponent } from './components/vendorlogin/vendorlogin.component';

const routes: Routes = [{path:'',component:VendorloginComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
