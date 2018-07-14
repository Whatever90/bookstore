import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import 'rxjs/add/operator/switchMap';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  id;
  book = null;
  user = null;
  cur_user = null;
  temp;
  checker = false;
  constructor(private _r: Router, private _taskService: TaskService, private _route: ActivatedRoute) {
    this._route.paramMap.subscribe(params => {
      // console.log(params.get('id'));
      this.id = params.get('id');
      this.getBook(this.id);
    });
  }
  getBook(id) {
    this._taskService.findBook(id, function (data, err) {
      if (data) {
        this.book = data;
        this.getCurrentUser();
      }
      if (err) {
        console.log(err);
        this._r.navigateByUrl(`/`);
      }
    }.bind(this));
  }
  getCurrentUser() {
    this._taskService.retrieve(function (data, err) {
      if (data) {
        // console.log(data);
        this.cur_user = data;
        this.checker = false;
        for (let i = 0; i < this.book.viewers.length; i++) {
          if (this.book.viewers[i].user_id === data._id) {
            this.checker = true;
          }
        }
        if (!this.checker) {
          this.addViewer(this.book._id);
        }
      } else {
        console.log('nobody in the session');
      }
    }.bind(this));
  }
  addViewer(book_id) {
    // console.log(book_id, this.cur_user._id);
    this.temp = {
      book_id: this.book._id,
      book_title: this.book.title,
      book_author: this.book.author,
      user_alias: this.cur_user.alias,
      user_id: this.cur_user._id
    };
    this._taskService.bookViewer(this.temp);
    this.temp = null;
  }
  like() {
    console.log('LOL');
    this.book.raters.push(this.cur_user._id);
    this.book.rating++;
    this.temp = {
      book_id: this.book._id,
      user_id: this.cur_user._id
    };
    this._taskService.likeBook(this.temp, function (data, err) {
      if (data) {
        console.log('+1');
      } else {
        console.log(err);
      }
    }.bind(this));
  }

  ngOnInit() {
  }

}
