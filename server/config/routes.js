var mongoose = require('mongoose');
var session = require('express-session');
var express = require('express');
var path = require('path');
var user = require('./../controllers/users.js');
var book = require('./../controllers/books.js');

module.exports = function (app) {
	console.log("ROUTINGS");
	// USERS
	app.get('/test', (req,res,next) => {
		console.log('YES!');
		res.json(true);
	}) 
	app.post('/user/new', (req, res, next) => {
		console.log('recieve, registraion!!!!!!!!!!')
		console.log('----------------------------------')
		user.create(req, res)
	});
	app.post('/user/login', (req, res, next) => {
		console.log('recieve, login!!!!!!!!!!')
		console.log('----------------------------------')
		user.login(req, res)
	});
	app.get("/user/logout", (req, res, next) => {
		user.logout(req, res)
	});
	app.get("/user/all", (req, res, next) => {
		console.log('routes.js: retrieveing all users')
		console.log('----------------------------------')
		user.showAll(req, res)
	});
	app.post("/user/contact", (req, res, next) => {
		// console.log('routes.js: find user', req.body)
		// console.log('----------------------------------')
		user.contact(req, res)
	});
	app.get("/user/retrieve", (req,res,next) => {
		user.retrieve(req,res);
	})
	app.post("/user/viewABook", (req,res,next) => {
		user.viewABook(req,res);
	})

	// BOOKS
	app.post('/book/create', (req, res, next) => {
		console.log('creating a book')
		console.log('----------------------------------')
		book.create(req, res)
	});
	app.get('/book/all', (req, res, next) => {
		console.log('all books')
		console.log('----------------------------------')
		book.all(req, res)
	});
	app.post('/book/find', (req, res, next) => {
		console.log('find a book', req.body)
		console.log('----------------------------------')
		book.find(req, res)
	});
	app.post('/book/filter', (req, res, next) => {
		console.log('filtering books by creator', req.body)
		console.log('----------------------------------')
		book.filter(req, res)
	});
	app.post('/book/update', (req, res, next) => {
		console.log('updating book', req.body._id)
		book.update(req, res)
	});
	app.post('/book/viewer', (req, res, next) => { //adding a viewer
		console.log('a new viewer book', req.body)
		book.viewer(req, res)
	});
	app.post('/book/rate', (req, res, next) => { //adding a rate
		console.log('rate', req.body)
		book.rate(req, res)
	});
	app.post('/book/addALiker', (req, res, next) => { //adding a likere
		console.log('rate', req.body)
		book.addALiker(req, res)
	});
	app.post('/book/remove', (req, res, next) => {
		console.log('removing book', req.body._id)
		book.remove(req, res)
	});
	
};
