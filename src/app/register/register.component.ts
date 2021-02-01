import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Packages } from '../packages';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { UsersSelect } from '../users';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  _usname : any;
  userselet: UsersSelect[];
  packages: Packages[];
  _pId: any;
  addForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService,private router: Router,private routes: ActivatedRoute) {

  }

  ngOnInit() {
    const routeParams = this.routes.snapshot.params;
    console.log(routeParams);
    this._usname = this.apiService.getToken();
    this._pId = routeParams.id;

    this.addForm = this.fb.group({
      id: [''],
      email: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      number: ['', Validators.required],
      number_register: ['', Validators.required],
      package_name: ['', Validators.required],
      price: ['', Validators.required],
      tel: ['', Validators.required]
    });

    this.apiService.getUsersName(this._usname,this._pId)
    .subscribe((data: any) => {
      console.log(data);
      this.userselet = data;
      this.addForm.patchValue(data);
    });
  }
  postdata(addForm){
    this.apiService.RegisterEvent(addForm.value.id, addForm.value.first_name, addForm.value.last_name, addForm.value.email,
      addForm.value.tel, addForm.value.package_name, addForm.value.price, addForm.value.number, addForm.value.number_register)
    .subscribe( data => {
      Swal.fire(
        'ลงทะเบียนสำเร็จ!',
        '',
        'success'
      )
      const redirect = this.apiService.redirectUrl ? this.apiService.redirectUrl : '/home';
      this.router.navigate([redirect]);
    },error => {
      Swal.fire(
        'ลงทะเบียนไม่สำเร็จ!',
        'เนื่องจากจำนวนผู้ลงทะเบียนเเต็มแล้ว กรุณาเลือกแพ็กเกจอื่น',
        'error'
      )
      this.router.navigate(['select/'+ this._pId]);
    });
  }
}
