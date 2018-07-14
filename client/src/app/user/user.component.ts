import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import 'rxjs/add/operator/switchMap';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Book } from './../book';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id;
  user = null;
  book = new Book();
  cur_user = null;
  constructor(private _r: Router, private _taskService: TaskService, private _route: ActivatedRoute) {
    this._route.paramMap.subscribe(params => {
      // console.log(params.get('id'));
      this.id = params.get('id');
      this.getUser(this.id);
      this.getCurrentUser();
    });
  }
  getCurrentUser() {
    this._taskService.retrieve(function (data, err) {
      if (data) {
        console.log(data);
        this.cur_user = data;
        console.log(this.cur_user);
        console.log('tut budet data', data);
      } else {
        console.log(err);
      }
    }.bind(this));
  }
  getUser(id) {
    this._taskService.contact(id, function (data, err) {
      if (data) {
        // console.log(data);
        this.user = data;
      }
      if (err) {
        console.log(err);
      }
    }.bind(this));
  }
  ngOnInit() {
  }
  newbook() {
    this.book.creater = this.cur_user._id;
    this._taskService.newbook(this.book, function (data, err) {
      console.log(data, err);
      if (data) {
        console.log(data);
        this.book = new Book();
      }
      if (err) {
        console.log(err);
      }
    }.bind(this));
  }
  Logout() {
    console.log('logouting!!!!!!!!!');
    this._taskService.logout();
    this._r.navigateByUrl(`/`);
  }

}
