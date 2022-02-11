var Genre = require('../models/genre');



exports.genre_list = function(req, res){
    Genre.find()
    .sort({name: 'asc'})
    .exec((err, list_genre)=>{
        if (err) return next(err);
        res.render('genre_list', {title: "genre list", genre_list: list_genre, err: err});
    });
};

exports.genre_detail = function(req, res){

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