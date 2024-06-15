import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorRoutingModule } from './vendor-routing.module';
import { VendorloginComponent } from './components/vendorlogin/vendorlogin.component';
import { SharedModuleModule } from '../../common/shared-module/shared-module.module';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    VendorloginComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    VendorRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule,
    FormsModule
    ]
})
export class VendorModule { }
