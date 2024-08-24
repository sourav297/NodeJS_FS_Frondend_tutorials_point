const express=require('express');
const bookRouter=express.Router();
let session = require('express-session');
const successTemplate = require('../templates/successTemplate');
const errorTemplate = require('../templates/errorTemplate');
require('dotenv').config();

bookRouter.get('/', (req, res)=>{
    try{
        session = req.session;
        return successTemplate(res, 'books', 'Books', "Books Section Found", session);
    }
    catch(err){
        return errorTemplate(req, res, 'home', 'Home', "error occured", err, session);
    }
})

module.exports = bookRouter;