var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs')


var Book = mongoose.model('Book');
//console.log(User)
module.exports = {
  all: function (req, res) {
    Book.find({})
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        console.log(err);
      })
  },

  create: function (req, res) {
    console.log(req.body);
    Book.findOne({ title: req.body.title, author: req.body.author })
      .then(data => {
        if (data) {
          console.log(data)
          console.log('Book is here!')
          res.json(false)
        } else {
          console.log('creating')
          var book = new Book({
            title: req.body.title,
            author: req.body.author,
            rating: 0,
            description: req.body.description,
            photo: req.body.photo,
            viewers: [],
            raters: [],
            creater: req.body.creater
          });
          book.save()
            .then(saved => {
              console.log('saved!')
              res.json(saved)
            })
            .catch(err => {
              console.log('saving failed')
              res.json(err)
            })
        }
      })
  },
  find: function (req, res) {
    console.log("SEARCHING FOR A BOOK", req.body);
    Book.findOne({ _id: req.body.id }, function (data, err) {
      if (data) {
        res.json(data);
      } else {
        res.json(err);
      }
    })
  },
  filter: function (req, res) {
    Book.find({ $and: [{ creator: req.body.user_id }] })
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  update: function (req, res) {
    Book.update({ _id: req.body._id }, {
      $set:
      {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        photo: req.body.photo
      }
    })
      .then(data => {
        res.json(data);
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  viewer: function (req, res) {
    var temp = {
      user_id: req.body.user_id,
      user_alias: req.body.user_alias
    }
    Book.update({ _id: req.body.book_id }, { $push: { viewers:  temp } })
      .then(data => {
        res.json(data);
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  rate: function (req, res) {
    Book.update({ _id: req.body.book_id }, 
      {$inc: {rating: 1} } //incrementing rating by 1
     )
      .then(data => {
        res.json(data);
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  addALiker: function (req,res) {
    Book.update({ _id: req.body.book_id},
      { $push: { raters:  req.body.user_id}} //and adding that user in raters array
    ).then(data => {
      res.json(data);
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
  },
  remove: function (req, res) {
    Book.remove({ _id: req.body.id })
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        console.log(err)
        res.json(err)
      })
  }
}
