import { Component, OnInit } from '@angular/core';
import { Users } from '../users';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-registerusers',
  templateUrl: './registerusers.component.html',
  styleUrls: ['./registerusers.component.css']
})
export class RegisterusersComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService,  private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      tel: ['', Validators.required],
    })
  }

  ngOnInit() {

  }

  postdata(registerForm){
    this.apiService.RegisterUser(registerForm.value.username, registerForm.value.password,
      registerForm.value.first_name, registerForm.value.last_name,registerForm.value.email,
      registerForm.value.tel)
    .subscribe( data => {
      Swal.fire(
        'ลงทะเบียนสำเร็จ!',
        '',
        'success'
      )
      const redirect = this.apiService.redirectUrl ? this.apiService.redirectUrl : '/login';
      this.router.navigate([redirect]);
    },error => {
      Swal.fire(
        'ลงทะเบียนไม่สำเร็จ!',
        '',
        'error'
      )
      const redirect = this.apiService.redirectUrl ? this.apiService.redirectUrl : '/login';
      this.router.navigate([redirect]);
    });
  }

}
