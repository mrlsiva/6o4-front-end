import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { APIURLConstant } from '../api.url.constant';
import { ComplaintService } from '../services/complaint.service';
import { AppService } from '../services/app.services';
import { CaseHistoryService } from '../services/casehistory.service';
declare var jQuery: any;
declare var Lobibox: any;
@Component({
  selector: 'app-component',
  templateUrl: './manage-search-profile.component.html',
  styleUrls: ['./manage-search-profile.component.css']
})
export class ManageSearchProfileComponent {
  _userProfileTbl: any;
  _userProfiles: any;
  _user: any;
  _editSearchProfile: any;
  filterDataArray: any;
  constructor(private router: Router,
    private _http: HttpClient,
    private _fb: FormBuilder,
    private _urlConstant: APIURLConstant,
    private _complaintServiceCall: ComplaintService,
    private appservice: AppService,
    private _caseHistoryServiceCall: CaseHistoryService,) {
  }
  ngOnInit() {
    try {
      // let userString = localStorage.getItem('user');
      // this._user = JSON.parse(userString);
      this.appservice.currentList.subscribe(list => {
        this._userProfiles = list;
      });
      console.log('User profile:', this._userProfiles);
    } catch (error: any) {
      // Handle the error
      console.error('An error occurred:', error.message);
      console.error('Error name:', error.name);
      console.error('Stack trace:', error.stack);
    }
  }
  ngAfterViewInit() {
    if (this._userProfileTbl === undefined) {
      this.InitialzeUserProfiles();
    }
    this._userProfileTbl.clear().rows.add(this._userProfiles).draw();
  }
  InitialzeUserProfiles() {
    let self: any = this;
    this._userProfileTbl = jQuery('#userProfileTbl').DataTable({
      columns: [{
        data: "id",
        targets: 0
      }, {
        data: "name",
        targets: 1
      },
      {
        data: "action",
        targets: 2,
        render: function (data: any, type: any, row: any) {
          return '<button id="editSearchProfile"  class="btn custom-btn btn-sm" data-name="' + row.id + '">Edit / View</button> &nbsp &nbsp <button id="deleteSearchProfile" class="btn custom-btn btn-sm" data-name="' + row.id + '">Delete</button>';
        }
      }],
      columnDefs: [{ width: '10%', targets: [0, 2] }]
    });
    this._userProfileTbl.on('click', 'button', function (e: any) {
      console.log(e.target.dataset.name);
      console.log(e.target.id);
      if (e.target.id == "editSearchProfile") {
        self._editSearchProfile = self._userProfiles.find((v: any) => v.id == e.target.dataset.name);
        console.log('Data:', self._editSearchProfile);

        jQuery('#searchName').val(self._editSearchProfile.name).trigger('change');
        jQuery('#saveSearchModal').modal('show');
      } else if (e.target.id == "deleteSearchProfile") {
        self.deleteSearchProfile(e.target.dataset.name);
      }
    });
  }
  deleteSearchProfile(id: string) {
    let url = this._urlConstant.UserDataModule + this._urlConstant.DeleteUserProfile;
    this._caseHistoryServiceCall.removeWithID(url, parseInt(id))
      .subscribe((response) => {
        if (response.status == "SUCCESS") {
          this._user = response.data[0];
          this.saveLocalstore();
          this.appservice.setMessage(this._user.userProfiles);
          this.appservice.currentList.subscribe(list => {
            this._userProfiles = list;
          });
          if ((this._userProfileTbl == undefined) || (this._userProfileTbl == undefined)) {
            this.InitialzeUserProfiles();
          }
          this._userProfileTbl.clear().rows.add(this._userProfiles).draw();
          Lobibox.notify('success', {
            pauseDelayOnHover: true,
            continueDelayOnInactiveTab: false,
            position: 'top right',
            icon: 'bx bx-check-circle',
            msg: 'Search profile deleted successfully'
          });
        } else {
          alert(response.errorMessage);
        }
      }
      );
  }

  saveNewSearch(profileName: string) {
    this._editSearchProfile.name = profileName;
    console.log('Edited Profile:', this._editSearchProfile);
    this._caseHistoryServiceCall.saveByMethodName(this._urlConstant.UserDataModule, "userProfile", this._editSearchProfile)
      .subscribe((response) => {
        if (response.status == "SUCCESS") {
          this._user = response.data[0];
          this.saveLocalstore();
          this.appservice.setMessage(this._user.userProfiles);
          this.appservice.currentList.subscribe(list => {
            this._userProfiles = list;
          });
          if ((this._userProfileTbl == undefined) || (this._userProfileTbl == undefined)) {
            this.InitialzeUserProfiles();
          }
          this._userProfileTbl.clear().rows.add(this._userProfiles).draw();
          Lobibox.notify('success', {
            pauseDelayOnHover: true,
            continueDelayOnInactiveTab: false,
            position: 'top right',
            icon: 'bx bx-check-circle',
            msg: 'Search profile updated.'
          });
          //this.saveLocalstore();
        } else {
          Lobibox.notify('error', {
            pauseDelayOnHover: true,
            continueDelayOnInactiveTab: false,
            position: 'top right',
            icon: 'bx bx-check-circle',
            msg: response.errorMessage
          });
        }
      }
      );
    this.SaveOrUpdateProfile();
  }
  saveLocalstore(): void {
    localStorage.setItem("user", JSON.stringify(this._user));
    this._caseHistoryServiceCall.saveByMethodName(this._urlConstant.UserDataModule, "userProfile", this._editSearchProfile)
      .subscribe((response) => {
        if (response.status == "SUCCESS") {
          this._user = response.data[0];
          //this.saveLocalstore();
          this.appservice.setMessage(this._user.userProfiles);
          this.appservice.currentList.subscribe(list => {
            this._userProfiles = list;
          });
          if ((this._userProfileTbl == undefined) || (this._userProfileTbl == undefined)) {
            this.InitialzeUserProfiles();
          }
          this._userProfileTbl.clear().rows.add(this._userProfiles).draw();
          //this.saveLocalstore();
        } else {
          Lobibox.notify('error', {
            pauseDelayOnHover: true,
            continueDelayOnInactiveTab: false,
            position: 'top right',
            icon: 'bx bx-check-circle',
            msg: response.errorMessage
          });
        }
      }
      );
  }
  SaveOrUpdateProfile() {
    this._caseHistoryServiceCall.saveByMethodName(this._urlConstant.UserDataModule, "userProfile", this._editSearchProfile)
      .subscribe((response) => {
        if (response.status == "SUCCESS") {
          this._user = response.data[0];
          this.saveLocalstore();
          this.appservice.setMessage(this._user.userProfiles);
          this.appservice.currentList.subscribe(list => {
            this._userProfiles = list;
          });
          if ((this._userProfileTbl == undefined) || (this._userProfileTbl == undefined)) {
            this.InitialzeUserProfiles();
          }
          this._userProfileTbl.clear().rows.add(this._userProfiles).draw();
          //this.saveLocalstore();
        } else {
          Lobibox.notify('error', {
            pauseDelayOnHover: true,
            continueDelayOnInactiveTab: false,
            position: 'top right',
            icon: 'bx bx-check-circle',
            msg: response.errorMessage
          });
        }
      }
      );
  }
  updateFilterDataArray(key: any, value: any) {
    this.filterDataArray.push({ key: key, value: value });
  }
}
