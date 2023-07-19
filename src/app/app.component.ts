import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  title = 'crm';
  isMenuRequire=false;
  isAdmin=false;
constructor(private router:Router,private service:AuthService  ){}
  ngDoCheck(): void {
    let currenturl=this.router.url
    if(currenturl=='/login' || currenturl=='/register' ){
      this.isMenuRequire=false
    }else{
      this.isMenuRequire=true
    }
   if(this.service.geruserRole()==='admin'){
    this.isAdmin=true;
  
   }else{
    this.isAdmin=false;
   }
  }

 

}
