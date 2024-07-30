const express=require('express');
const router=express.Router();
const {validateRegistration, validateLogin} = require('../validation/validation.js');
const isEmpty = require('../utilities/util.js');
const messages = require('../utilities/messages.js');
const {postRegister, postLogin}=require('../services/userServices.js');
let session = require('express-session');
require('dotenv').config();


//use middleware to create express Session
router.use(session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: true
  }))


router.get('/', (req, res)=>{
    session=req.session;
    res.render('home', {pagename:"Home", session: session})
})

router.get('/login', (req, res)=>{
    session=req.session;
    res.render('login', {pagename:"Login", session: session})
})

router.get('/register', (req, res)=>{
    session=req.session;
    res.render('register', {pagename:"Register", session: session})
})

router.get('/about', (req, res)=>{
    session=req.session;
    res.render('about', {pagename:"About", session: session})
})

router.get('/authors', (req, res)=>{
    session=req.session;
    res.render('authors', {pagename:"Authors", session: session})
})

router.get('/books', (req, res)=>{
    session=req.session;
    res.render('books', {pagename:"Books", session: session})
})

router.get('/logout', (req, res)=>{
    req.session.destroy(null);
    //session="undefined";
    res.render('home', {
        pagename: "Home",
        //session: session
    })
})

router.post('/register', (req, res)=>{
    console.log('Registering...');
    const errors=validateRegistration(req.body);
    console.log(errors);
    if(isEmpty(errors)){
        //call the backend
        postRegister(req.body).then(
            (result) => {
                console.log(result);
                res.render('login', {
                    pagename: "Login", 
                    message: result.data.message
                });
            }
        ).catch(
            err => {
                res.render('register', {
                    pagename: "Registration",
                    message: err.response.data.error.message
                });
            }
        )
    }
    else{
        res.render('register', {pagename: "Register", body: req.body, errs: errors, message: messages.failed_registration});
    }
})


router.post('/login', (req, res)=>{
    console.log('Logging in...');
    session=req.session;
    const errors=validateLogin(req.body);
    if(isEmpty(errors)){
        //call backend
        postLogin(req.body).then(
            (result) => {
                console.log(result);
                session.logged=result.data.Logged;
                res.render('home', {
                    pagename: "Home",
                    message: result.data.message,
                    session: session
                });
            }
        ).catch(
            err => {
                res.render('login', {
                    pagename: "Login",
                    message: err.response.data.error.message
                });
            }
        )
    }
    else{
        res.render('login', {pagename:"Login", body: req.body, errs: errors, message: messages.failed_login});
    }
})


module.exports=router;