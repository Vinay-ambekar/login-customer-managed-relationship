import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseAPI=' http://localhost:3000/user'
  constructor( private http:HttpClient) {}
  
  //return all data via get method
  getAll(){
    return this.http.get(this.baseAPI)
  }
  //get all role data
  getAllRolle(){
    return this.http.get('http://localhost:3000/role')
  }
  //to get specific id
  getById(id:any){
    return this.http.get(this.baseAPI+'/'+id)
  }
  //to save data to server using post method
  registerData(inputdata:any){
 return this.http.post(this.baseAPI, inputdata)
  }
  // to update data we are using put method
  updateData(id:any,inputdata:any){
return this.http.put(this.baseAPI+'/'+id,inputdata)
  }
  //get user name
  isloggedin(){
    return sessionStorage.getItem('username')!=null;
  }
  //get user role
  geruserRole(){
    return sessionStorage.getItem('role')!=null?sessionStorage.getItem('role')?.toString():'';
  }
}
