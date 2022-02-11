var Author = require('../models/author');

exports.author_list = function(req, res){
    console.log("author list");
    Author
    .find()
    .sort({family_name: 'asc' })
    .exec(function (err, list_author){
        if (err) return next(err);
        res.render('author_list', {title: 'Author list', author_list: list_author, err:err});
    });
};

exports.author_detail = function(req, res){

};

exports.author_create_get = function(req, res){

};

exports.author_create_post = function(req, res){

};

exports.author_delete_get = function(req, res){

};

exports.author_delete_post = function(req, res){

};

exports.author_update_get = function(req, res){

};

exports.author_update_post = function(req, res){

};