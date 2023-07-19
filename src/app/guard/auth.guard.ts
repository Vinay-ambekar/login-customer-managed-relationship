import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private toastr: ToastrService,
    private service:AuthService,
    private router:Router
   ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.service.isloggedin()){
        if(next.url.length > 0){
           let menu =next.url[0].path;
           if(menu=='user'){
            if(this.service.geruserRole()=='admin'){
              return true
            }else{
              this.toastr.warning('you are not admin and you don not have access to data ')
              this.router.navigate([''])
              return false
            }
           }else{
            return true
           }
        }else{
          return true
        }
      }else{
    this.router.navigate(['login'])
    return false;
      } 
      
  }
}
