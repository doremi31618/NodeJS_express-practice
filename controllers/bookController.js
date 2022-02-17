var Book = require('../models/book');
var Author = require('../models/author');
var Genre = require('../models/genre');
var Bookinstance = require('../models/bookinstance');
var async = require("async");
const { body, validationResult } = require('express-validator');

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
    .populate('genre')
    .exec(function (err, list_books){
        if (err) return next(err);
        res.render('book_list', {title: 'Book List', book_list: list_books, err:err});
    });
};

exports.book_detail = function(req, res, next){
    async.parallel({
        book: function(callback){
            Book.findById(req.params.id).populate('author').exec(callback);
        }
    },function(err, results){
        if (err) return next(err);
        res.render('book_detail', {title: "Book Detail", book: results.book});
    })
};

exports.book_create_get = function(req, res, next){
    async.parallel({
        genres: function(callback){
            Genre.find().sort({name: 1}).exec(callback);
        },
        authors: function(callback){
            Author.find().sort({first_name: 1}).exec(callback);
        }
    },function(err, results){
        if (err) return next(err);
        res.render("book_form", {title: "Create Book", genres: results.genres, authors: results.authors});
    });
};

//need data validation
exports.book_create_post = [
    //convert the genre to an array
    (req, res, next) =>{
        
        console.log(req.body);
        if (!(req.body.genre instanceof Array)){
            if (typeof req.body.genre === 'undefined')
                req.body.genre = [];
            else 
                req.body.genre = new Array(req.body.genre);
        }
        next();
    },
    //data validation 
    body('title', 'Title must not be empty').trim().isLength({min:1}).escape(),
    body('author', 'Author must not be empty').trim().isLength({min:1}).escape(),
    body('summary', 'Summary must not be empty').trim().isLength({min:1}).escape(),
    body('isbn', 'ISBN must not be empty').trim().isLength({min:1}).escape(),
    body('genre.*').escape(),

    //process request after validation and sanitization
    (req, res, next) => {
        //extract the valudation error from a request
        const errors = validationResult(req);
        var book = new Book({
            title: req.body.title,
            author: req.body.author,
            summary: req.body.summary,
            isbn: req.body.isbn,
            genre: req.body.genre
        });

        if (!errors.isEmpty()){
            //thre are errors. Render form again with sanitized values/ errors message
            async.parallel({
                genres: function(callback){
                    Genre.find().sort({name: 1}).exec(callback);
                },
                authors: function(callback){
                    Author.find().sort({first_name: 1}).exec(callback);
                }
            },function(err, results){
                if (err) return next(err);
                // Mark our selected genres as checked.
                for (let i = 0; i < results.genres.length; i++) {
                    if (book.genre.indexOf(results.genres[i]._id) > -1) {
                        results.genres[i].checked='true';
                    }
                }
                res.render("book_form", {title: "Create Book", genres: results.genres, authors: results.authors, errors: errors.array()});
            });
            return;
        }else{
            book.save(function(err){
                if (err) return next(err);
                res.redirect(book.url);
            })
        }

    }
];
exports.book_delete_get = function(req, res, next){
    async.parallel({
        book: function(callback){
            Book.findById(req.params.id).exec(callback);
        }
    },function(err, results){
        if (err) next(err);
        Book.findByIdAndRemove(req.params.id, (err)=>{
            if (err) return next(err);
            res.redirect('/catalog/books');
        })
    });
};
exports.book_delete_post = function(req, res){

};

exports.book_update_get = function(req, res, next){
    async.parallel({
        book: function(callback){
            Book.findById(req.params.id).populate('author').populate('genre').exec(callback);
        },
        genres: function(callback){
            Genre.find().sort({name: 1}).exec(callback);
        },
        authors: function(callback){
            Author.find().sort({first_name: 1}).exec(callback);
        }
    },function(err, results){
        if (err) return next(err);
        res.render("book_form", {title: "Update Book", genres: results.genres, authors: results.authors, book:results.book});
    });
};

exports.book_update_post = [
    //convert the genre to an array
    (req, res, next) =>{
        
        console.log(req.body);
        if (!(req.body.genre instanceof Array)){
            if (typeof req.body.genre === 'undefined')
                req.body.genre = [];
            else 
                req.body.genre = new Array(req.body.genre);
        }
        next();
    },
    //data validation 
    body('title', 'Title must not be empty').trim().isLength({min:1}).escape(),
    body('author', 'Author must not be empty').trim().isLength({min:1}).escape(),
    body('summary', 'Summary must not be empty').trim().isLength({min:1}).escape(),
    body('isbn', 'ISBN must not be empty').trim().isLength({min:1}).escape(),
    body('genre.*').escape(),

    //process request after validation and sanitization
    (req, res, next) => {
        //extract the valudation error from a request
        const errors = validationResult(req);
        var book = new Book({
            title: req.body.title,
            author: req.body.author,
            summary: req.body.summary,
            isbn: req.body.isbn,
            genre: req.body.genre,
            _id: req.params.id
        });

        if (!errors.isEmpty()){
            //thre are errors. Render form again with sanitized values/ errors message
            async.parallel({
                genres: function(callback){
                    Genre.find().sort({name: 1}).exec(callback);
                },
                authors: function(callback){
                    Author.find().sort({first_name: 1}).exec(callback);
                }
            },function(err, results){
                if (err) return next(err);
                // Mark our selected genres as checked.
                for (let i = 0; i < results.genres.length; i++) {
                    if (book.genre.indexOf(results.genres[i]._id) > -1) {
                        results.genres[i].checked='true';
                    }
                }
                res.render("book_form", {title: "Update Book", genres: results.genres, authors: results.authors, errors: errors.array()});
            });
            return;
        }else{
            Book.findByIdAndUpdate(req.params.id, book, {}, function(err, thebook){
                if (err) return next(err);
                res.redirect(thebook.url);
            })
        }

    }
];