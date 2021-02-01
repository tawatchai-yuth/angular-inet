import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loginbtn: boolean;
  logoutbtn: boolean;

  constructor(private apiService: ApiService, private router: Router) {
    apiService.getLoggedInName.subscribe(username => this.changeName(username));
    if(this.apiService.isLoggedIn()){
      console.log("loggedin");
      this.loginbtn = false;
      this.logoutbtn = true;
    }else{
      this.loginbtn=true;
      this.logoutbtn=false;
    }
  }

  private changeName(username : boolean): void {
    console.log(username);
    this.logoutbtn = username;
    this.loginbtn = !username;
  }

  logout()
  {
    this.apiService.deleteToken();
    this.router.navigate(['login']);
  }

}
