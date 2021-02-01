import { Component, OnInit } from '@angular/core';
import { Users } from '../users';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService,  private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

   postdata(loginForm){
     this.apiService.usersLogin(loginForm.value.username, loginForm.value.password)
     .pipe(first())
     .subscribe( data => {
       const redirect = this.apiService.redirectUrl ? this.apiService.redirectUrl : '/home';
       this.router.navigate([redirect]);
     },error => {
       Swal.fire(
         'User name or password is incorrect!',
         '',
         'error'
       )
     });
   }
}
