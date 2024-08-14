import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminloginComponent } from './components/adminlogin/adminlogin.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { authGuard } from '../../auth.guard';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ConferenceRequestsComponent } from './components/conference-requests/conference-requests.component';
import { UserAnalyticsComponent } from './components/user-analytics/user-analytics.component';
import { FinancialReportsComponent } from './components/financial-reports/financial-reports.component';
import { SettingComponent } from './components/setting/setting.component';
import { NewsfeedComponent } from './components/newsfeed/newsfeed.component';
import { AddconferenceComponent } from './components/addconference/addconference.component';

const routes: Routes = [
  { path: '', component: AdminloginComponent },
  {
    path: 'adminhome',
    component: AdminHomeComponent,
    canActivate: [authGuard],
    children:[
      {path:'',component:AdminDashboardComponent},
      {path:'conferencerequest',component:ConferenceRequestsComponent},
      {path:'useranalytics',component:UserAnalyticsComponent},
      {path:'financialreports', component:FinancialReportsComponent},
      {path:'adminsettings',component:SettingComponent},
      {path:'news-feed',component:NewsfeedComponent},
      {path:'add-conference',component:AddconferenceComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
