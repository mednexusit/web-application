import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from '../../common/shared-module/shared-module.module';
import { AdminloginComponent } from './components/adminlogin/adminlogin.component';


@NgModule({
  declarations: [

  
    AdminloginComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModuleModule
  ]
})
export class AdminModule { }
