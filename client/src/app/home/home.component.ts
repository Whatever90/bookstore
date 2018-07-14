import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import 'rxjs/add/operator/switchMap';
import { TaskService } from '../task.service';
import { User } from '../user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  books = [];
  listOfBooks = [];
  cur_user = null;
  constructor(private _taskService: TaskService, private _r: Router, private _http: Http) {
    this._taskService.showAllbooks(function (data, err) {
      if (data) {
        this.books = data;
      }
      if (err) {
        console.log(err);
      }
    }.bind(this));
    this.getCurrentUser();
  }
  getCurrentUser() {
    this._taskService.retrieve(function (data, err) {
      if (data) {
        // console.log(data);
        this.cur_user = data;
        // console.log(this.cur_user);
        // console.log('tut budet data', data);
      } else {
        console.log(err);
      }
    }.bind(this));
  }
  ngOnInit() {
}
}
