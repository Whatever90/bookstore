var mongoose = require('mongoose');
// 

var bookSchema = new mongoose.Schema({
    title:  { type: String, required: [true, 'Title is required'], minlength: [2, 'Title is too short']},
    author:  { type: String, required: [true, 'Authoer is required'], minlength: [2, "Author's name is too short"]},
    description:  { type: String },
    rating:  { type: Number },
    photo:  { type: String },
    creater: { type: String },
    viewers: { type: Array, "default" : []},
    raters: { type: Array, "default" : []} //array of users who have rated the book already
}, {timestamps: true });

var Book = mongoose.model('Book', bookSchema) 
