import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Users } from './users';
import { Events } from './events';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  redirectUrl: string;
  baseUrl: string = "http://localhost/projects-eventsrun/database/project-eventrun";
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

  usersLogin(username, password){
    return this.http.post<any>(this.baseUrl + '/login.php' , {username,password})
    .pipe(map(Users => {
      this.setToken(Users[0].username);
      this.getLoggedInName.emit(true);
    }));
  }

  RegisterUser(username, password,first_name,last_name,email,tel){
    return this.http.post<any>(this.baseUrl + '/register.php' , {username, password,first_name,last_name,email,tel});
  }

  RegisterEvent(id,first_name,last_name,email,tel,package_name,price,number,number_register){
    return this.http.post<any>(this.baseUrl + '/buypackage.php' , {id,first_name,last_name,email,tel,package_name,price,number,number_register});
  }

  getUsersName(username,id){
    return this.http.get<any>(this.baseUrl + '/usersnamedetail.php?username='+ username +'&packageID=' + id);
  }

  getEvents(){
     return this.http.get<Events[]>(this.baseUrl + '/vieweventrun.php');
   }

   getPackage(id:number){
     return this.http.get<Events[]>(this.baseUrl + '/package.php?id=' + id);
   }

   getEventPackage(id:number){
     return this.http.get<any>(this.baseUrl + '/eventselect.php?id=' + id);
   }

   getDetail(id:number){
     return this.http.get<Events[]>(this.baseUrl + '/detail.php?id=' + id);
   }

  //token
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  deleteToken() {
    localStorage.removeItem('token');
  }
  isLoggedIn() {
    const usertoken = this.getToken();
    if (usertoken != null) {
    return true
  }
    return false;
  }
}
