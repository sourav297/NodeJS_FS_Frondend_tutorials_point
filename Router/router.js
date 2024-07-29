const express=require('express');
const router=express.Router();
const {validateRegistration, validateLogin} = require('../validation/validation.js');
const isEmpty = require('../utilities/util.js');
const messages = require('../utilities/messages.js');
const {postRegister, postLogin}=require('../services/userServices.js');

router.get('/', (req, res)=>{
    res.render('home', {pagename:"Home"})
})

router.get('/login', (req, res)=>{
    res.render('login', {pagename:"Login"})
})

router.post('/register', (req, res)=>{
    console.log('Registering...');
    const errors=validateRegistration(req.body);
    console.log(errors);
    if(isEmpty(errors)){
        //call the backend
        postRegister(req.body).then(
            result => {
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
    const errors=validateLogin(req.body);
    if(isEmpty(errors)){
        //call backend
        postLogin(req.body).then(
            result => {
                res.render('home', {
                    pagename: "Home",
                    message: result.data.message
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

router.get('/register', (req, res)=>{
    res.render('register', {pagename:"Register"})
})


router.get('/about', (req, res)=>{
    res.render('about', {pagename:"About"})
})

router.get('/authors', (req, res)=>{
    res.render('authors', {pagename:"Authors"})
})

router.get('/books', (req, res)=>{
    res.render('books', {pagename:"Books"})
})




module.exports=router;