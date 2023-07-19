import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userData:any;
  constructor(private builder:FormBuilder,
    private toastr: ToastrService,
     private service:AuthService,
     private route:Router
     ){
      sessionStorage.clear();
     }
     loginForm=this.builder.group({
      username:this.builder.control('',Validators.required),
      password:this.builder.control('',Validators.required)
    })
    
     /* login(){
      if(this.loginForm.valid){
        this.service.getById(this.loginForm.value.username).subscribe((res)=>{

          this.userData=res;
          console.log(this.userData)
          if(this.userData.password === this.loginForm.value.password){
            if(this.userData.isActive){
              sessionStorage.setItem('username',this.userData.id)
              sessionStorage.setItem('role',this.userData.role)
              this.route.navigate([''])
            }else{
              this.toastr.error("please contact to admin in active user!")

            }
          }else{
            this.toastr.error('Invalid Credentials')
           }
        })
      }else{
              
        this.toastr.warning('please Enter valid data')
      }

      } */
      login() {
        if (this.loginForm.valid) {
          this.service.getById(this.loginForm.value.username).subscribe(
            (res) => {
              this.userData = res;
              console.log(this.userData);
              if (this.userData.password === this.loginForm.value.password) {
                if (this.userData.isActive) {
                  sessionStorage.setItem('username', this.userData.id);
                  sessionStorage.setItem('role', this.userData.role);
                  this.route.navigate(['']);
                } else {
                  this.toastr.error('Please contact the admin', 'Inactive user!');
                }
              } else {
                this.toastr.error('Invalid Credentials');
              }
            },
            (error: HttpErrorResponse) => {
              if (error.status === 400) {
                this.toastr.error('Invalid username');
              } else if (error.status === 401) {
                this.toastr.error('Invalid password');
              } else {
                this.toastr.error('An error occurred. Please try again later.');
              }
            }
          );
        } else {
          this.toastr.warning('Please enter valid data');
        }
      }
      

     }
