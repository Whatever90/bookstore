import { Component } from '@angular/core';
import { TaskService } from './task.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  books = []; // this page is index page for all books
  cur_user = null;
  constructor(private _taskService: TaskService, private _r: Router, private _http: Http) {
    this._taskService.test();
    this.getCurrentUser();
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
  onSubmit() {
  }


}
