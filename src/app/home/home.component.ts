import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Events } from '../events';
import { Router } from '@angular/router';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  events: Events[];
  _id: any;
  faCalendar = faCalendar;
  faLocationArrow = faLocationArrow;

  constructor(private apiService: ApiService,private router: Router) { }

  ngOnInit() {
    this.apiService.getEvents()
    .subscribe((data: Events[]) => {
      this.events = data;
      console.log(this.events);
    });
  }

  select(events: Events){
    console.log(this._id = events.id);
    this.router.navigate(['select/'+ this._id]);
  }

}
