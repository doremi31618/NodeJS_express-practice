var BookInstance = require('../models/bookinstance');

exports.bookinstance_list = function(req, res){
    BookInstance.find()
    .populate('book')
    .exec(function (err, list_bookinstances){
        if (err) return next(err);
        res.render('bookinstances_list', {title: 'Book Instances List', bookinstances_list: list_bookinstances, err:err});
    });
};

exports.bookinstance_detail = function(req, res){

};

exports.bookinstance_create_get = function(req, res){

};

exports.bookinstance_create_post = function(req, res){

};

exports.bookinstance_delete_get = function(req, res){

};

exports.bookinstance_delete_post = function(req, res){

};

exports.bookinstance_update_get = function(req, res){

};

exports.bookinstance_update_post = function(req, res){

};