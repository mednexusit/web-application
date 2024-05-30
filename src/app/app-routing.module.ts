import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from './common/pagenotfound/pagenotfound.component';
import { SignupComponent } from './common/shared-module/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'vendor',
    loadChildren: () =>
      import('./modules/vendor/vendor.module').then((m) => m.VendorModule),
  },
  {path:'signup',component:SignupComponent},
  {path:'**',component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
