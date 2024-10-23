import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { MemberloginComponent } from './memberlogin/memberlogin.component';
import { DataTablesModule } from 'angular-datatables';
import { MockpageComponent } from './mockpage/mockpage.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CaseManagementComponent } from './case-management/case-management.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { NewComplaintComponent } from './new-complaint/new-complaint.component';
import { CaseTypeComponent } from './case-type/case-type.component';
import { NoticeTemplateComponent } from './notice-template/notice-template.component';
import { ViolationsComponent } from './violations/violations.component';
import { FineComponent } from './fine/fine.component';
import { CaseHistoryComponent } from './case-history/case-history.component';
import { APIURLConstant } from './api.url.constant';
import { ComplaintService } from './services/complaint.service';
import { ComplaintComponent } from './complaint/complaint.component';
import { NotificationComponent } from './notification/notification.component';
import { UserComponent } from './user/user.component';
import { ViewAllNotificationComponent } from './view-all-notification/view-all-notification.component';
import { ViolationComponent } from './violation/violation.component';
import { ActionComponent } from './action/action.component';
import { CategoryComponent } from './category/category.component';
import { InspectormappingComponent } from './inspectormapping/inspectormapping.component';
import { AiSearchComponent } from './ai-search/ai-search.component';
import { ManageSearchProfileComponent } from './manage-search-profile/manage-search-profile.component';
import { NgbCalendar, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    MemberloginComponent,
    MockpageComponent,
    NewComplaintComponent,
    CaseManagementComponent,
    CaseTypeComponent,
    NoticeTemplateComponent,
    ViolationsComponent,
    FineComponent,
    CaseHistoryComponent,
    ComplaintComponent,
    NotificationComponent,
    UserComponent,
    ViewAllNotificationComponent,
    ViolationComponent,
    ActionComponent,
    CategoryComponent,
    InspectormappingComponent,
    AiSearchComponent,
    ManageSearchProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    HttpClientModule,
    FormsModule,
    GoogleMapsModule,
    NgbModule,
  ],
  providers: [APIURLConstant, ComplaintService],
  bootstrap: [AppComponent]
})
export class AppModule { }
