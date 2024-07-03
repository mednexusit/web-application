import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from '../../common/shared-module/shared-module.module';
import { AdminloginComponent } from './components/adminlogin/adminlogin.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { AdminFooterComponent } from './components/admin-footer/admin-footer.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ConferenceRequestsComponent } from './components/conference-requests/conference-requests.component';
import { UserAnalyticsComponent } from './components/user-analytics/user-analytics.component';
import { FinancialReportsComponent } from './components/financial-reports/financial-reports.component';
import { SettingComponent } from './components/setting/setting.component';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './pipes/filter.pipe';


@NgModule({
  declarations: [


    AdminloginComponent,
          AdminHomeComponent,
          AdminHeaderComponent,
          AdminFooterComponent,
          AdminDashboardComponent,
          ConferenceRequestsComponent,
          UserAnalyticsComponent,
          FinancialReportsComponent,
          SettingComponent,
          FilterPipe
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModuleModule,
    HttpClientModule,
  ]
})
export class AdminModule { }
