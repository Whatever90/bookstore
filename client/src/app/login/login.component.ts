import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { LoginUser } from '../loginUser';
import { TaskService } from '../task.service';
import { $ } from 'protractor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logreg = 'log'; // switcher for log/reg
  user = new User();
  loginUser = new LoginUser();
  cur_user = null;
  constructor(private _taskService: TaskService, private _r: Router) {
    this.getCurrentUser();
  }

  ngOnInit() {
  }
  getCurrentUser() {
    this._taskService.retrieve(function (data, err) {
      if (data) {
        this._r.navigateByUrl(`/user/` + data._id);
      } else {
        console.log(err);
      }
    }.bind(this));
  }
  login() {
    this._taskService.login(this.loginUser, function (data, err) {
      if (!data) {
        alert('wrong email or password');
      }
      if (data) {
        this._r.navigateByUrl(`/user/` + data._id);
      }
    }.bind(this));
    this.loginUser = new LoginUser;
  }
  register() {
    console.log(this.user);
    this._taskService.createUser(this.user, function (data, err) {
      if (!data) {
        alert('email is already used by another user');
      }
      if (data) {
        this._r.navigateByUrl('/');
      }
    }.bind(this));
  }
  log() {
    this.logreg = 'log';
  }
  reg() {
    this.logreg = 'reg';
  }

}
