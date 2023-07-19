import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UpdatepopupComponent } from '../updatepopup/updatepopup.component';

@Component({
  selector: 'app-userlisting',
  templateUrl: './userlisting.component.html',
  styleUrls: ['./userlisting.component.css']
})
export class UserlistingComponent implements OnInit{

  constructor (private service:AuthService ,private dialog:MatDialog){


  }
  ngOnInit(): void {
    this.loadUser()
  }
  userList:any;
  dataSource:any;
  @ViewChild(MatPaginator) paginator !:MatPaginator
  @ViewChild(MatSort) sort !:MatSort
  displayedColumns: string[] = ['username', 'name', 'email', 'role', 'status', 'Action'];

  loadUser(){
    this.service.getAll().subscribe((res)=>{
      this.userList=res; 
      this.dataSource=new MatTableDataSource(this.userList)
      this.dataSource.paginator=this.paginator
      this.dataSource.sort=this.sort
    }) 
  
  }
  updateuser(code:any){ 
    this.openDailog('1000ms','600ms',code)
  }
  openDailog(enteranimation:any,exitanimation:any,code:string){
    const popup=this.dialog.open(UpdatepopupComponent,{
      enterAnimationDuration:enteranimation,
  exitAnimationDuration:exitanimation,
  width:'20%',
  data:{
    usercode:code
  }
    })
    popup.afterClosed().subscribe(res=>{
      this.loadUser()
    })
  }


}