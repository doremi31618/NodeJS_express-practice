var Book = require('../models/book');
var Author = require('../models/author');
var Genre = require('../models/genre');
var Bookinstance = require('../models/bookinstance');
var async = require("async");

exports.index = function(req, res){
    console.log("start reading database")
    async.parallel({
        book_count: function(callback){
            Book.countDocuments({}, callback);
        },
        book_instance_count: function(callback){
            Bookinstance.countDocuments({}, callback);
        },
        book_instance_available_count: function(callback){
            Bookinstance.countDocuments({status:'Available'}, callback);
        },
        author_count: function(callback){
            Author.countDocuments({}, callback);
        },
        genre_count: function(callback){
            Genre.countDocuments({}, callback);
        }
    }, function(err, results){
        console.log(results);
        res.render('index', {title: 'local library home', error: err, data: results});
    })
};

exports.book_list = function(req, res){
    Book.find({}, 'title author')
    .sort({title: 1})
    .populate('author')
    .exec(function (err, list_books){
        if (err) return next(err);
        res.render('book_list', {title: 'Book List', book_list: list_books, err:err});
    });
};

exports.book_detail = function(req, res){

};

exports.book_create_get = function(req, res){
    res.render("book_create", {title: "Create Book"});
};

exports.book_create_post = function(req, res){

};

exports.book_delete_get = function(req, res){

};

exports.book_delete_post = function(req, res){

};

exports.book_update_get = function(req, res){

};

exports.book_update_post = function(req, res){

};