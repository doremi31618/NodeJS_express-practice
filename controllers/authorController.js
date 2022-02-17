var Author = require('../models/author');
var async = require('async');
var Book = require('../models/book');
const { body, validationResult } = require('express-validator');


exports.author_list = function (req, res) {
    console.log("author list");
    Author.find().sort({ family_name: 'asc' }).exec(function (err, list_author) {
        if (err) return next(err);
        res.render('author_list', { title: 'Author list', author_list: list_author, err: err });
    });
};

exports.author_detail = function (req, res, next) {
    async.parallel({
        author: function(callback){
            Author.findById(req.params.id).exec(callback)
        },
        author_books: function(callback){
            Book.find({author: req.params.id}).exec(callback)
        },
    },function (err, results) {
        if (err) return next(err);
        if (results.author == null){
            var err = new Error("Author not found");
            err.status = 404;
            return next(err);
        }
        console.log(results.author_books)
        res.render('author_detail',{title: "Author detail", author: results.author, books: results.author_books, err:err});
    });
};

exports.author_create_get = function (req, res) {
    res.render("author_form", { title: "Create Author" });
};

exports.author_create_post = [
    body('first_name').trim().isLength({ min: 1 }).escape().withMessage("First name must be specified.").isAlphanumeric().withMessage("First name has non-alphanumeric characters."),
    body('family_name').trim().isLength({ min: 1 }).escape().withMessage("Family name must be specified.").isAlphanumeric().withMessage("Family name has non-alphanumeric characters."),
    body('date_of_birth', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601().toDate(),
    body('date_of_death', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601().toDate(),
    function (req, res, next) {
        console.log("enter create author");
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            //return error
            res.render('author_form', { title: 'Create Author', author: req.body, errors: errors.array() });
            return;
        }
        else {
            //create author by author schema and insert to database
            var new_author = new Author({
                first_name: req.body.first_name,
                family_name: req.body.family_name,
                date_of_birth: req.body.date_of_birth,
                date_of_death: req.body.date_of_death
            });
            new_author.save((err) => {
                if (err) return next(err);
                res.redirect(new_author.url);
            });
        }
    }
];

exports.author_delete_get = function (req, res, next) {
    async.parallel({
        author: function(callback){
            Author.findById(req.params.id).exec(callback);
        }
    }, function(err, results){
        if (err) return next(err);
        res.render('author_delete', {title: "Delete author", author: results.author, author_book: results.author_books});
    });
};

exports.author_delete_post = function (req, res, next) {
    async.parallel({
        author: function(callback){
            Author.findById(req.params.id).exec(callback);
        },
        author_books: function(callback){
            Book.find({author: req.params.id}).exec(callback);
        }
    }, function(err, results){
        if (err) return next(err);
        if (results.author_books.length > 0){
            res.render('author_delete', {title: "Delete author", author: results.author, author_book: results.author_books, message: "can't delete author with books"});
        }else{
            Author.findByIdAndRemove(req.params.id, function(err){
                if (err) return next(err);
                res.redirect('/catalog/authors')
            });
        }

    });
};


exports.author_update_get = function (req, res) {

};

exports.author_update_post = function (req, res) {

};