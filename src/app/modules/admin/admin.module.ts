import { NgxEditorModule } from 'ngx-editor';
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
import { NewsfeedComponent } from './components/newsfeed/newsfeed.component';
import { AddconferenceComponent } from './components/addconference/addconference.component';
import { VendorproposalsComponent } from './components/vendorproposals/vendorproposals.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SubadminsComponent } from './components/subadmins/subadmins.component';
import { AddsubadminComponent } from './components/addsubadmin/addsubadmin.component';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddnewsfeedComponent } from './components/addnewsfeed/addnewsfeed.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SafeUrlPipe } from './safe-url.pipe';

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
    FilterPipe,
    NewsfeedComponent,
    AddconferenceComponent,
    VendorproposalsComponent,
    SidenavComponent,
    SubadminsComponent,
    AddsubadminComponent,
    AddnewsfeedComponent,
    BookingsComponent,
    SafeUrlPipe,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModuleModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    PdfViewerModule,
    NgxEditorModule.forRoot({
      locals: {
        // menu
        bold: 'Bold',
        italic: 'Italic',
        code: 'Code',
        underline: 'Underline',
        strike: 'Strike',
        blockquote: 'Blockquote',
        bullet_list: 'Bullet List',
        ordered_list: 'Ordered List',
        heading: 'Heading',
        h1: 'Header 1',
        h2: 'Header 2',
        h3: 'Header 3',
        h4: 'Header 4',
        h5: 'Header 5',
        h6: 'Header 6',
        align_left: 'Left Align',
        align_center: 'Center Align',
        align_right: 'Right Align',
        align_justify: 'Justify',
        text_color: 'Text Color',
        background_color: 'Background Color',
        horizontal_rule: 'Horizontal rule',
        format_clear: 'Clear Formatting',
        insertLink: 'Insert Link',
        removeLink: 'Remove Link',
        insertImage: 'Insert Image',
        indent: 'Increase Indent',
        outdent: 'Decrease Indent',
        superscript: 'Superscript',
        subscript: 'Subscript',
        undo: 'Undo',
        redo: 'Redo',
        url: 'URL',
        text: 'Text',
        openInNewTab: 'Open in new tab',
        insert: 'Insert',
        altText: 'Alt Text',
        title: 'Title',
        remove: 'Remove',
        enterValidUrl: 'Please enter a valid URL',
      },
    }),
  ],
})
export class AdminModule {}
