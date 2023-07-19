import { Component,Inject,OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css']
})
export class UpdatepopupComponent  implements OnInit {
  rolelist:any;
  editData:any;
  constructor(private builder:FormBuilder,
    private toastr: ToastrService,
     private service:AuthService,
     private route:Router,
     private dialogref :MatDialogRef<UpdatepopupComponent>,
     @Inject(MAT_DIALOG_DATA) public data:any
     ){}
     ngOnInit(): void {
       this.service.getAllRolle().subscribe(res=>{
        this.rolelist=res;
       })
       if(this.data.usercode!=null && this.data.usercode!=''){
        this.loaduserdata()
      }
    }
      registerForm=this.builder.group({
      id:this.builder.control(''),
      name:this.builder.control(''),
      password:this.builder.control(''),
      email:this.builder.control(''),
      gender:this.builder.control('email'),
      role:this.builder.control('',Validators.required),
      isActive:this.builder.control(false)
     })
     loaduserdata(){
      this.service.getById(this.data.usercode).subscribe(res=>{
          this.editData=res;
          console.log(this.editData)
          
            this.registerForm.setValue({
              id:this.editData.id,
              name:this.editData.name,
              password:this.editData.password,
              email:this.editData.email,
              gender:this.editData.gender,
              role:this.editData.role,
              isActive:this.editData.isActive
            })
          })
         
       
   
      }
     
     updateuser(){
       if(this.registerForm.valid){

       
this.service.updateData(this.registerForm.value.id,this.registerForm.value).subscribe(res=>{
  this.toastr.success("user update successful ")
  this.dialogref.close()
})
}else{
  this.toastr.warning("please select the role of user")
}
     }
    
    }
    
