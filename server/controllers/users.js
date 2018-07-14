var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs')


var User = mongoose.model('User');
module.exports = {
  showAll: function (req, res) {
    User.find({})
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        console.log(err);
      });
  },

  create: function (req, res) {
    User.findOne({ email: req.body.email })
      .then(data => {
        if (data) {
          res.json(false)
        } else {
          var user = new User({
            alias: req.body.alias,
            email: req.body.email,
            password: req.body.password,
            booksVisited: []
          });
          user.save()
            .then(saved => {
              req.session.user = user;
              res.json(saved)
            })
            .catch(err => {
              res.json(err)
            })
        }
      })
  },

  login: function (req, res) {
    User.findOne({ email: req.body.email })
      .then(data => {
        if (data) {
          if (data.password == req.body.password) {
            req.session.user = data;
            res.json(data)
          } else {
            res.json(false)
          }
        } else {
          res.json(false)
        }
      })
  },
  contact: function (req, res) {
    User.findOne({ _id: req.body.user_id })
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  retrieve: function (req,res){
    if(!req.session.user){
      res.json(false);
    }else{
      res.json(req.session.user);
    }
  },
  viewABook: function (req, res) {
    var temp = {
      book_id: req.body.book_id,
      book_title: req.body.book_title,
      book_author: req.body.book_author
    }
    User.update({ _id: req.body.user_id }, { $push: { booksVisited: temp} })
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  logout: (req, res) => {
    req.session.destroy();
    res.status(200).send();
  },
}
