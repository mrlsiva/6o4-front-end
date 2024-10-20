import { Component } from '@angular/core';
import { RejectRequest, Role, UserModel } from './user.viewmodel';
import { HttpClient } from '@angular/common/http';
import { APIURLConstant } from '../api.url.constant';
import { UserService } from '../services/user.service';

declare var jQuery: any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  userTbl:any = null;
  _user:UserModel = null;
  _userList:UserModel[] = [];
  _roleList: Role[]=[];
  _rejectionReason:string = "";
  _inspector:UserModel = new UserModel();
  _allInspectors:UserModel[]=[];
  _showInspector:boolean=false;
  constructor(
    private _http: HttpClient,
    private _apiUrlConstant: APIURLConstant,
    private _userServiceCall: UserService) {
  }
  ngOnInit() {
    jQuery('#approveBtn').hide();
    jQuery('#rejectBtn').hide();
    jQuery('#enableBtn').hide();
    jQuery('#disableBtn').hide();
    
    try {
      let userString = localStorage.getItem('user');

      this._user = JSON.parse(userString);
      this._apiUrlConstant.roleActions(this._user,4);
    } catch {
      
    }
    this.loadUser();
   // jQuery('#selectRoleId').select2();
    this.loadRole();
  }


  ngAfterViewInit() {
    let self = this;
    jQuery(document).ready(function () {
      $('#userTbl thead tr')
        .clone(true)
        .addClass('filters')
        .appendTo('#caseHistoryTbl thead');
      self.initializeDatatable();
    });
  }

  initializeDatatable() {
    let self = this;
    var cols = [ 
      {data: 'name'},
      {data: 'email',
      render: function (data: any, type: any, row: any) {
        
        return `<a href='mailto:${row.email}'>${row.email}</a>`;
      }},
      {data: 'phone',
      render: function (data: any, type: any, row: any) {
        if(row.phone==null || row.phone==undefined){
          return "";
        }
        return `<a href='tel:${row.phone}'>${row.phone}</a>`;
      }},
      {data: 'status',
      render: function (data: any, type: any, row: any) {
        if(row.approveStatus==='I'){
            return "Not approved";
        }
        if(row.approveStatus==='R'){
            return `<span  data-toggle="tooltip" title="${row.rejectReason}">Rejected</span>`;
        }
        if(row.status){
          return "Active";
        }
        return 'Inactive';
      }},
      {data: 'role.rolename',
      render: function (data: any, type: any, row: any) {
        if(row.role==null || row.role==undefined)
          return '';
        return row.role.rolename;
      }},
      {data: 'role.isinspector',
      render: function (data: any, type: any, row: any) {
        if(row.role==null || row.role==undefined)
          return '';
        if(row.role.isinspector){
            return "Yes";
        }
        return '';
      }},
      ];

    this.userTbl = jQuery('#userTbl').DataTable({
      paging: true,
      columns: cols
    });
    this.userTbl.on('click', 'tbody tr', (e: any) => {
      let classList = e.currentTarget.classList;

      if (classList.contains('selected')) {
        classList.remove('selected');
      }
      else {
        self.userTbl.rows('.selected').nodes().each((row: any) => row.classList.remove('selected'));
        classList.add('selected');
      }
      self.enableButtons();
    });
  }
  
  displayInspectors(){
    let data = this.userTbl.rows('.selected');
    if (this._apiUrlConstant.isNull(data) || data.length == 0) {

      return;
    }
    let d = data.data()[0];
    if(d.role.id!= this._apiUrlConstant.SupervisorRole){
      return;
    }
    this._showInspector=false;
    this._inspector=d;
    jQuery('#inspectorModal').modal('show');
  }
  removeInspector(arg0: any) {
    var ins:UserModel[]=[];
    this._inspector.inspectors.forEach((x:UserModel) => {
      if(x.id!=arg0)
        ins.push(x);
    });
    this._inspector.inspectors=ins;
  }
  addInspector() {
    this._allInspectors=this._userList.filter((x:UserModel)=>x.role.isinspector);
    var ins:UserModel[]=[];
    this._allInspectors.forEach((x:UserModel) => {
      var fnd=this._inspector.inspectors.filter((y:UserModel)=>y.id==x.id);
      if(fnd==null || fnd==undefined ||fnd.length==0){
        ins.push(x);
      }
    });
    if(ins.length>0){
      this._showInspector=true;
    }
  }  
  enableButtons(){
    let d = this.userTbl.rows('.selected');
    jQuery('#approveBtn').hide();
    jQuery('#rejectBtn').hide();
    jQuery('#enableBtn').hide();
    jQuery('#disableBtn').hide();
    jQuery('#inspectorsBtn').hide();
    if (this._apiUrlConstant.isNull(d) || d.length == 0) {

      return;
    }
    let data = d.data();
    if(data[0].approveStatus=='I'){
      jQuery('#rejectBtn').show();
    }
    if(data[0].approveStatus=='I' || data[0].approveStatus=='R'){
      jQuery('#approveBtn').show();
    }else if(data[0].status){
      jQuery('#disableBtn').show();
    }else{
      jQuery('#enableBtn').show();
    }
    if(data[0].role.id==this._apiUrlConstant.SupervisorRole){
      jQuery('#inspectorsBtn').show();
    }
  }
  loadUser(){
    this._userServiceCall.getAll(this._apiUrlConstant.UserDataModule).subscribe((response) => {
      
      if (response.status == 'SUCCESS') {
        this._userList=response.data;
        this.displayUsers();
      } else {
        alert(response.errorMessage);
      }
    });
  }
  loadRole(){
    this._userServiceCall.getAll(this._apiUrlConstant.RoleDataModule).subscribe((response) => {
      
      if (response.status == 'SUCCESS') {
        this._roleList=response.data ;
        this.displayUsers();
      } else {
        alert(response.errorMessage);
      }
    });
  }
  displayUsers(){
    this._allInspectors=this._userList.filter((x:UserModel)=>x.role.isinspector);
    this.userTbl.rows().remove().draw();
    this.userTbl.rows.add(this._userList).draw();
  }
  approveUser(){
    jQuery('#selectRoleId').val('-1');
    jQuery('#selectRole').modal('show');
  }
  disableUser(){
    let id=this.getSelectedUser();
    if(id==null)
    {
      alert("Select user");
    }
    this._userServiceCall.get(this._apiUrlConstant.UserDataModule,this._apiUrlConstant.Delete+'?deleted=1&id='+id).subscribe((response)=>{
      if (response.status == 'SUCCESS') {
        this.loadUser();
      } else {
        alert(response.errorMessage);
      }
    });
  }
  enableUser(){
    let id=this.getSelectedUser();
    if(id==null)
    {
      alert("Select user");
    }

    this._userServiceCall.get(this._apiUrlConstant.UserDataModule,this._apiUrlConstant.Delete+'?deleted=0&id='+id).subscribe((response)=>{
      if (response.status == 'SUCCESS') {
        this.loadUser();
      } else {
        alert(response.errorMessage);
      }
    });
  }
getSelectedUser():any {
  let d = this.userTbl.rows('.selected');
  if (this._apiUrlConstant.isNull(d) || d.length == 0) {
    return null;
  }
  let data = d.data();
   return data[0].id;
}
  applyRole() {
    let roleid=jQuery('#selectRoleId').val();  

    if(roleid==''){
      alert('select role');
      return;
    }
 let id:any=this.getSelectedUser();
    if(id==null){
      alert('Select user');
      return;
    }
    this._userServiceCall.get(this._apiUrlConstant.UserDataModule,this._apiUrlConstant.Approve+`?roleid=${roleid}&id=${id}`).subscribe((response)=>{
      if (response.status == 'SUCCESS') {
        this.loadUser();
      jQuery('#selectRole').modal('hide');
      } else {
        alert(response.errorMessage);
      }
    });
  }
rejectUser(){
  this._rejectionReason="";
  jQuery('#rejectUserModal').modal('show');
}
  applyRejectUser(){
    
    if(this._rejectionReason==""){
      alert('Reject reason should be entered');
      return;
    }
    let id:any=this.getSelectedUser();
    let req:RejectRequest={
      id:id,
      rejectReason:this._rejectionReason
    };
    this._userServiceCall.saveByMethodName(this._apiUrlConstant.UserDataModule,this._apiUrlConstant.Reject,req).subscribe((response)=>{
      if (response.status == 'SUCCESS') {
        this.loadUser();
        jQuery('#selectRole').modal('hide');
      } else {
        alert(response.errorMessage);
      }
    });
  }
}
