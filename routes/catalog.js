var express = require('express');
var router = express.Router();

//require controller 
var AuthorController = require('../controllers/authorController');
var BookController = require('../controllers/bookController');
var BookInstanceController = require('../controllers/bookinstanceController');
var genreController = require('../controllers/genreController');

//book]
router.get('', BookController.index);
router.get('/', BookController.index);
router.get('/index', BookController.index);
router.get('/book/create', BookController.book_create_get);
router.post('/book/create', BookController.book_create_post);

router.get('/book/:id/delete', BookController.book_delete_get);
router.post('/book/:id/delete', BookController.book_delete_post);

router.get('/book/:id/update', BookController.book_update_get);
router.post('/book/:id/update', BookController.book_update_post);

router.get('/book/:id', BookController.book_detail);
router.get('/books', BookController.book_list);

//book instance
router.get('/bookinstance/create', BookInstanceController.bookinstance_create_get);
router.post('/bookinstance/create', BookInstanceController.bookinstance_create_post);

router.get('/bookinstance/:id/delete', BookInstanceController.bookinstance_delete_get);
router.post('/bookinstance/:id/delete', BookInstanceController.bookinstance_delete_post);

router.get('/bookinstance/:id/update', BookInstanceController.bookinstance_update_get);
router.post('/bookinstance/:id/update', BookInstanceController.bookinstance_update_post);

router.get('/bookinstance/:id', BookInstanceController.bookinstance_detail);
router.get('/bookinstances', BookInstanceController.bookinstance_list);

//author
router.get('/author/create', AuthorController.author_create_get);
router.post('/author/create', AuthorController.author_create_post);

router.get('/author/:id/delete', AuthorController.author_delete_get);
router.post('/author/:id/delete', AuthorController.author_delete_post);

router.get('/author/:id/update', AuthorController.author_update_get);
router.post('/author/:id/update', AuthorController.author_update_post);

router.get('/author/:id', AuthorController.author_detail);
router.get('/authors', AuthorController.author_list);

//genre
router.get('/genre/create', genreController.genre_create_get);
router.post('/genre/create', genreController.genre_create_post);

router.get('/genre/:id/delete', genreController.genre_delete_get);
router.post('/genre/:id/delete', genreController.genre_delete_post);

router.get('/genre/:id/update', genreController.genre_update_get);
router.post('/genre/:id/update', genreController.genre_update_post);

router.get('/genre/:id', genreController.genre_detail);
router.get('/genres', genreController.genre_list);

module.exports = router;