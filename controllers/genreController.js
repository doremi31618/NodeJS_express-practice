var Genre = require('../models/genre');
var Book = require('../models/book');
var async = require('async');


exports.genre_list = function(req, res){
    Genre.find()
    .sort({name: 'asc'})
    .exec((err, list_genre)=>{
        if (err) return next(err);
        res.render('genre_list', {title: "genre list", genre_list: list_genre, err: err});
    });
};

exports.genre_detail = function(req, res, next){
    async.parallel({
        genre: function(callback){
            Genre.findById(req.params.id).exec(callback);
        },
        genre_books: function(callback){
            Book.find({'genre': req.params.id}).exec(callback);
        }

    }, function (err, results){
        if (err) return next(err);
        if (results.genre == null){
            var err = new Error("Genre Not Found");
            err.status = 404;
            return next(err);
        }
        res.render('genre_detail', {title: "genre detail", genre_books: results.genre_books, genre: results.genre});
    });
};

exports.genre_create_get = function(req, res){

};

exports.genre_create_post = function(req, res){

};

exports.genre_delete_get = function(req, res){

};

exports.genre_delete_post = function(req, res){

};

exports.genre_update_get = function(req, res){

};

exports.genre_update_post = function(req, res){

};