import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminloginComponent } from './components/adminlogin/adminlogin.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { authGuard } from '../../auth.guard';

const routes: Routes = [{path:'',component:AdminloginComponent},{path:'adminhome',component:AdminHomeComponent, canActivate:[authGuard]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
