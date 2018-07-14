import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
@Injectable()
export class TaskService {
  user = null;
  users;
  book;
  constructor(private _r: Router, private _http: Http) { }
  test() {
    this._http.get('/test').subscribe(
      (data) => (console.log(data)),
      (err) => (console.log(err))
    );
  }
  // user functions
  createUser(user, callback) {
    console.log('second step of storing');
    this._http.post('/user/new', user)
      .map(data => data.json()) //
      .subscribe(data => callback(data));
  }
  login(user, callback) {
    this._http.post('/user/login', user)
      .map(data => data.json()) //
      .subscribe(data => callback(data));
  }
  showAllUsers(callback) {
    console.log('show all!');
    this._http.get('/user/all').subscribe(
      (data) => callback(data.json()),
      (err) => callback(err)
    );
  }
  contact(id, callback) {
    id = {
      user_id: id
    };
    this._http.post('/user/contact', id)
      .map(data => data.json()) //
      .subscribe(data => callback(data));
  }
  retrieve(callback) {
    this._http.get('/user/retrieve').subscribe(
      (data) => callback(data.json()),
      (err) => callback(err)
    );
  }
  viewABook(send) {
    console.log(send);
    this._http.post('/user/viewABook', send)
      .map(data => data.json())
      .subscribe(data => console.log(data));
  }
  logout() {
    this._http.get('/user/logout').subscribe(
      (data) => console.log('logOut'),
      (err) => console.log(err)
    );
  }
  // books functions
  newbook(book, callback) {
    this._http.post('/book/create', book)
      .map(data => data.json()) //
      .subscribe(data => callback(data));
  }
  showAllbooks(callback) {
    this._http.get('/book/all').subscribe(
      (data) => callback(data.json()),
      (err) => callback(err)
    );
  }
  findBook(id, callback) {
    id = {
      id: id
    };
    this._http.post('/book/find', id)
      .map(data => data.json())
      .subscribe(data => callback(data));
  }
  likeBook(send, callback) {
    this._http.post('/book/rate', send)
      .map(data => data.json())
      .subscribe(data => callback(data));
    this.bookAddALiker(send);
  }
  bookAddALiker(send) {
    this._http.post('/book/addALiker', send)
      .map(data => data.json())
      .subscribe(data => console.log(data));
  }
  filterBook(id) {
    id = {
      id: id
    };
    this._http.post('/book/filter', id)
      .map(data => data.json())
      .subscribe(data => console.log(data));
  }
  bookUpdate(book) {
    console.log(book);
    this._http.post('/book/update', book)
      .map(data => data.json())
      .subscribe(data => console.log(data));
  }
  deletebook(id) {
    id = {
      id: id
    };
    this._http.post('/book/remove', id)
      .map(data => data.json())
      .subscribe(data => console.log(data));
  }
  bookViewer(send) {
    console.log(send);
    this._http.post('/book/viewer', send)
      .map(data => data.json())
      .subscribe(data => console.log(data));
    this.viewABook(send);
  }
 }


