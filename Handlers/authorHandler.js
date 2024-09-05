let session = require('express-session');
const errorTemplate = require('../templates/errorTemplate');
const {getAuthors, postAuthor, updateAuthorById, getAuthorById, deleteAuthorById} = require('../services/authorServices');
const {getBooksIds} = require('../services/bookServices');
const isEmpty = require('../utilities/util');
const successTemplate = require('../templates/successTemplate');
const messages = require('../utilities/messages');


//Every functionality are exact similar to the book functions, So read the book functionality carefully.

const getAuthorHandler = async(req, res)=>{
    try{
        session = req.session;
        req.headers.authorization = 'Bearer: ' + session.token;
        const authors = await getAuthors(req);
        if(!isEmpty(authors)){
            return successTemplate(res, 'authors', "Authors", authors.data.message, session, authors.data.Result);
        }
        else{
            return successTemplate(res, 'authors', "Authors", messages.no_authors_found, session);
        }
    }
    catch(err){
        console.log("Error in getAuthorHandler");
        return errorTemplate(req, res, 'authors', "Auhtors", 'undefined', 'undefined');
    }
}

const postAuthorHandler = async(req, res)=>{
    try{
        session = req.session;
        req.headers.authorization = 'Bearer: ' + session.token;
        const author = await postAuthor(req);
        const authors = await getAuthors(req);
        return successTemplate(res, 'authors', "Authors", authors.data.message, session, authors.data.Result);
    }
    catch(err){
        console.log("Error in postAuthorHandler");
        return errorTemplate(req, res, 'authors', "Auhtors", 'undefined', 'undefined');
    }
}

const addAuthorHandler = async(req, res)=>{
    try{
        session = req.session;
        req.headers.authorization = 'Bearer: ' + session.token;
        const booksIds = await getBooksIds(req);
        //if there are some books in library/DB then only we can add an Author otherwise not because our populate()
        //method in the backend is implemented in that way.
        if(!isEmpty(booksIds)){
            return successTemplate(res, 'addAuthor', "Add a Author", messages.enter_author, session, booksIds.data.Result);
        }
        //In else part we are not passing any data to the addAuthor page and in addAuthor page we handles this condition
        else{
            return successTemplate(res, 'addAuthor', "Add an Author", messages.cannot_find_books, session);
        }
    }
    catch(err){
        console.log("Error in addAuthorHandler");
        return errorTemplate(req, res, 'authors', "Auhtors", 'undefined', 'undefined');
    }
}

const updateAuthorHandler = async(req, res)=>{
    try{
        session = req.session;
        req.headers.authorization = 'Bearer: ' + session.token;
        const author = await updateAuthorById(req);
        const authors = await getAuthors(req);
        console.log(authors);
        return successTemplate(res, 'authors', "Authors", authors.data.message, session, authors.data.Result);
    }
    catch(err){
        console.log("Error in updateAuthorHandler");
        return errorTemplate(req, res, 'authors', "Auhtors", 'undefined', 'undefined');
    }
}

const editAuthorHandler = async(req, res)=>{
    try{
        session = req.session;
        req.headers.authorization = 'Bearer: ' + session.token;
        const author = await getAuthorById(req);
        return successTemplate(res, 'editAuthor', "Edit an Author", messages.edit_info_auhtor, session, author.data.Result);
    }
    catch(err){
        console.log("Error in editAuthorHandler");
        return errorTemplate(req, res, 'authors', "Auhtors", 'undefined', 'undefined');
    }
}

const deleteAuthorHandler = async(req, res)=>{
    try{
        session = req.session;
        req.headers.authorization = 'Bearer: ' + session.token;
        const author = await deleteAuthorById(req);
        const authors = await getAuthors(req);
        return successTemplate(res, 'authors', "Authors", authors.data.message, session, authors.data.Result);
    }
    catch(err){
        console.log("Error in deleteAuthorHandler");
        return errorTemplate(req, res, 'authors', "Auhtors", 'undefined', 'undefined');
    }
}



module.exports = {getAuthorHandler, postAuthorHandler, addAuthorHandler, updateAuthorHandler, editAuthorHandler, deleteAuthorHandler};