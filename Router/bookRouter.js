const express=require('express');
const bookRouter=express.Router();
const {getBookHandler, postBookHandler, updateBookHandler, addBookHandler, editBookHandler, deleteBookHandler} = require('../Handlers/bookHandler');

//get all book from the db
bookRouter.get('/', getBookHandler);

//post a book to the db
bookRouter.post('/', postBookHandler);

//update a book by its id in the db
bookRouter.post('/update', updateBookHandler);

//get add book handler
bookRouter.get('/addBook', addBookHandler);

//get edit book handler
bookRouter.get('/editBook/:bookId', editBookHandler);

//get delete book handler
bookRouter.get('/deleteBook/:bookId', deleteBookHandler);

module.exports = bookRouter;