import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorRoutingModule } from './vendor-routing.module';
import { VendorloginComponent } from './components/vendorlogin/vendorlogin.component';
import { SharedModuleModule } from '../../common/shared-module/shared-module.module';


@NgModule({
  declarations: [
    VendorloginComponent
  ],
  imports: [
    CommonModule,
    VendorRoutingModule,
    SharedModuleModule
  ]
})
export class VendorModule { }
