import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorloginComponent } from './components/vendorlogin/vendorlogin.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [{path:'',component:HomeComponent},{path:'dashboard',component:DashboardComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
