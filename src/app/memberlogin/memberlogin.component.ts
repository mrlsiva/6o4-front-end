import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { APIURLConstant } from '../api.url.constant';
import { UserService } from '../services/user.service';
import { UserModel } from '../user/user.viewmodel';
declare var jQuery: any;
@Component({
  selector: 'app-memberlogin',
  templateUrl: './memberlogin.component.html',
  styleUrls: ['./memberlogin.component.css']
})
export class MemberloginComponent {

  constructor(private router: Router, private _http: HttpClient,
    private _apiUrlConstant: APIURLConstant,
    private _userServiceCall: UserService) {

  }

  _user: UserModel = null;
  ngOnInit() {
    jQuery(".sidebar-wrapper").hide();
    jQuery("#nav-bar-header").hide();
    jQuery(".page-footer").hide();
    jQuery("header").hide();
    jQuery(".page-wrapper").addClass("page-wrapper-none");
    jQuery(".page-wrapper-none").removeClass("page-wrapper");
  }

  signIn() {
    localStorage.setItem("login", "yes");

    this.getUser();
  }
  getUser() {
    let email = jQuery('#inputEmailAddress').val();
  //  this.router.navigateByUrl('dashboard');
    this._userServiceCall.get(this._apiUrlConstant.UserDataModule, this._apiUrlConstant.Get + "?userid=" + email).subscribe((response: any) => {
      if (response.status == "SUCCESS") {
        this._user = response.data[0];

        localStorage.setItem("user", JSON.stringify(this._user));
        localStorage.setItem("username", this._user.email);
        this.router.navigateByUrl('dashboard');
      } else {
        alert('login failed');
      }
    })
  }

}
