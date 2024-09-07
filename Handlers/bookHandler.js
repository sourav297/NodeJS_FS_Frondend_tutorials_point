let session = require('express-session');
const {getBooks, postBook, getBookById, getBooksIds, updateBookById, deleteBookById} = require('../services/bookServices');
const errorTemplate = require('../templates/errorTemplate');
const successTemplate = require('../templates/successTemplate');
const isEmpty = require('../utilities/util');
const messages = require('../utilities/messages');

const getBookHandler = async(req, res) => {
    try{
        session = req.session;
        //console.log(req.headers);
        req.headers.authorization = 'Bearer: '+ session.token;
        const books = await getBooks(req);
        //console.log(books.data);
        if(!isEmpty(books.data.Result)){
            
            return successTemplate(res, 'books', "Books", books.data.message, session, books.data.Result);
        }
        else{
            return successTemplate(res, 'books', "Books", messages.no_books_found, session);
        }
    }
    catch(err){
        //console.log("Error in getBookHandler");
        return errorTemplate(req, res, 'books', "Books", err.response.data.error.message, 'undefined', 'undefined');
    }
}

//postBook handler, This takes the data from addBook.ejs page and send this to backend through postBook()
const postBookHandler = async(req, res) => {
    try{
        session = req.session;
        req.headers.authorization = 'Bearer: '+ session.token;
        const book = await postBook(req);
        const books = await getBooks(req);
        return successTemplate(res, 'books', "Books", books.data.message, session, books.data.Result);
    }
    catch(err){
        //console.log("Error in postBookHandler");
        return errorTemplate(req, res, 'books', "Books", err.response.data.error.message, 'undefined', 'undefined');
    }
}

//addBook Handler, This simply display in the frontend the addBook.ejs file and after clicking on Add Book button it will call postBookHandler in the "/books" route.
const addBookHandler = async(req, res) => {
    try{
        session = req.session;
        return successTemplate(res, 'addBook', "Add a Book", "Enter Information of the Book", session);
    }
    catch(err){
        //console.log("Error in addBookHandler");
        return errorTemplate(req, res, 'books', "Books", err.response.data.error.message, 'undefined', 'undefined');
    }
}

//updateBook Handler, This takes data from editBook.ejs page and send this to backend through updateBookById() and update this particular book in the db and after that it fetches all books from db and display all the books through book.ejs page.
const updateBookHandler = async(req, res) => {
    try{
        session = req.session;
        req.headers.authorization = 'Bearer: '+ session.token;
        const book = await updateBookById(req);
        const books = await getBooks(req);
        return successTemplate(res, 'books', "Books", books.data.message, session, books.data.Result);
    }
    catch(err){
        //console.log("Error in updateBookHandler");
        return errorTemplate(req, res, 'books', "Books", err.response.data.error.message, 'undefined', 'undefined');
    }
}

//editBook Handler, This simply display in the frontend the editBook.ejs file and after clicking on the Edit Book button it will call updateBookHandler in the "/books/update" route.
const editBookHandler = async(req, res) => {
    try{
        session = req.session;
        req.headers.authorization = 'Bearer: ' + session.token;
        const book = await getBookById(req);
        return successTemplate(res, 'editBook', "Edit a Book", book.data.message, session, book.data.Result);
    }
    catch(err){
        //console.log("Error in editBookHandler");
        return errorTemplate(req, res, 'books', "Books", err.response.data.error.message, 'undefined', 'undefined');
    }
}

const deleteBookHandler = async(req, res) => {
    try{
        session = req.session;
        req.headers.authorization = 'Bearer: '+ session.token;
        const book = deleteBookById(req);
        const books = await getBooks(req);
        return successTemplate(res, 'books', "Books", books.data.message, session, books.data.Result);
    }
    catch(err){
        //console.log("Error in deleteBookHandler: ", err);
        return errorTemplate(req, res, 'books', "Books", err.response.data.error.message, 'undefined', 'undefined');
    }
}

module.exports = {getBookHandler, postBookHandler, updateBookHandler, addBookHandler, editBookHandler, deleteBookHandler};