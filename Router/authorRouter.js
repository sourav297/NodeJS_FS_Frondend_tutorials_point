const express = require('express');
const authorRouter = express.Router();
const {getAuthorHandler, postAuthorHandler, addAuthorHandler, updateAuthorHandler, editAuthorHandler, deleteAuthorHandler} = require('../Handlers/authorHandler');
const session = require('express-session');
require('dotenv').config();

//Every functionality are exact similar to the book functions, So read the book functionality carefully.

//middleware for express session
// authorRouter.use(
//     session({
//         secret: process.env.secret,
//         resave: false,
//         saveUninitialized: true
//     })
// );


authorRouter.get('/', getAuthorHandler);

authorRouter.post('/', postAuthorHandler);

authorRouter.get('/addAuthor', addAuthorHandler);

authorRouter.post('/updateAuthor', updateAuthorHandler);

authorRouter.get('/editAuthor/:authorId', editAuthorHandler);

authorRouter.get('/deleteAuthor/:authorId', deleteAuthorHandler);


module.exports = authorRouter;