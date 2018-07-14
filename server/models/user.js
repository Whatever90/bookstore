var mongoose = require('mongoose');
// 

var userSchema = new mongoose.Schema({
    alias:  { type: String, required: [true, 'alias is required'], minlength: [2, 'alias is too short']},
    email:  { type: String, required: [true, 'email is required'], minlength: [2, 'email is too short']},
    password:  { type: String, required: [true, 'password is required'], minlength: [2, 'password is too short']},
    booksVisited: { type: Array, "default" : []}
}, {timestamps: true });

var User = mongoose.model('User', userSchema) 
