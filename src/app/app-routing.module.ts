import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseManagementComponent } from './case-management/case-management.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MemberloginComponent } from './memberlogin/memberlogin.component';
import { MockpageComponent } from './mockpage/mockpage.component';
import { NewComplaintComponent } from './new-complaint/new-complaint.component';
import { ManageComplaintsComponent } from './manage-complaints/manage-complaints.component';
import { FormsModule } from '@angular/forms';
import { CaseTypeComponent } from './case-type/case-type.component';
import { NoticeTemplateComponent } from './notice-template/notice-template.component';
import { ViolationsComponent } from './violations/violations.component';
import { FineComponent } from './fine/fine.component';
import { CaseHistoryComponent } from './case-history/case-history.component';
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
const routes: Routes = [
  { path: "", component: MemberloginComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "casemanagement", component: CaseManagementComponent },
  { path: "complaint", component: ComplaintComponent },
  { path: "mockpage", component: MockpageComponent },
  { path: "casetype", component: CaseTypeComponent },
  { path: "noticetemplate", component: NoticeTemplateComponent },
  { path: "violation", component: ViolationComponent },
  { path: "fine", component: FineComponent },
  { path: "action", component: ActionComponent },
  { path: "category", component: CategoryComponent },
  { path: 'casehistory', component: CaseHistoryComponent },
  { path: 'inspectormapping', component: InspectormappingComponent },
  { path: 'usernotifications', component: NotificationComponent },
  { path: 'user', component: UserComponent },
  { path: 'viewallnotification', component: ViewAllNotificationComponent },
  { path: 'aisearch', component: AiSearchComponent },
  { path: 'managesearchprofile', component: ManageSearchProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule],
  exports: [RouterModule],
  declarations: [
    ManageComplaintsComponent
  ]
})
export class AppRoutingModule { }
