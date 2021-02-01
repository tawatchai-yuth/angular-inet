import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Packages } from '../packages';
import { Events } from '../events';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { Router, Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css']
})
export class PackageComponent implements OnInit {

  faCalendar = faCalendar;
  faLocationArrow = faLocationArrow;
  packages: Packages[];
  events: Events[];
  _username: any;
  _pId: any;

  constructor(private apiService: ApiService,private router: Router,private routes: ActivatedRoute) { }

  ngOnInit() {
    const routeParams = this.routes.snapshot.params;
    this.apiService.getPackage(routeParams.id)
    .subscribe((data: any) => {
      this.packages = data;
      console.log(data);
    });
    this.apiService.getEventPackage(routeParams.id)
    .subscribe((data: any) => {
      this.events = data;
      console.log(data);
    });
  }

  select(packages: Packages){
    console.log(this._username = this.apiService.getToken());
    this._pId = packages.id;
    this.router.navigate(['register/'+ this._username,this._pId]);
  }

}
