const express=require('express');
const router=express.Router();
const {getHomeHandler, getLoginHandler, getRegisterHandler, getAboutHandler, getLogoutHandler, postRegisterHandler, postLoginHandler} = require('../Handlers/userHandler.js');
let session = require('express-session');
require('dotenv').config();


//use middleware to create express Session
router.use(session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: true
  }))


router.get('/', getHomeHandler);

router.get('/login', getLoginHandler);

router.get('/register', getRegisterHandler);

router.get('/about', getAboutHandler);

router.get('/logout', getLogoutHandler);

router.post('/register', postRegisterHandler);

router.post('/login', postLoginHandler);


module.exports=router;