let session = require('express-session');
const errorTmeplate = require('../templates/errorTemplate.js');
const successTemplate = require('../templates/successTemplate.js');
const { validateRegistration, validateLogin } = require('../validation/validation.js');
const isEmpty = require('../utilities/util.js');
const { postRegister, postLogin } = require('../services/userServices.js');
const messages = require('../utilities/messages.js');

const getHomeHandler = (req, res)=>{
    session=req.session;
    return successTemplate(res, 'home', 'Home', null, session);
}

const getLoginHandler = (req, res)=>{
    session=req.session;
    return successTemplate(res, 'login', 'Login', null, session);
}

const getRegisterHandler = (req, res)=>{
    session=req.session;
    return successTemplate(res, 'register', 'Register', null, session);
}

const getAboutHandler = (req, res)=>{
    session=req.session;
    return successTemplate(res, 'about', 'About', null, session);
}

const getLogoutHandler = (req, res)=>{
    req.session.destroy();
    session = 'undefined';
    console.log('Logging out............');
    
    return successTemplate(res, 'home', 'Home', null, session);
}

const postRegisterHandler = async (req, res)=>{
    try{
        session = req.session;
        console.log('Registering::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
        const errors = validateRegistration(req.body);
        console.log(errors);
        if(isEmpty(errors)){
            //Call the backend...
            const result = await postRegister(req.body);
            console.log(result);
            return successTemplate(res, 'login', 'Login', result.data.message, session);
        }
        else{
            return errorTmeplate(req, res, 'register', 'Register', messages.failed_registration, errors, session);
        }
    }
    catch(err){
        return errorTmeplate(req, res, 'register', 'Register', err.response.data.error.message);
    } 
}

const postLoginHandler = async(req, res)=>{
    try{
        console.log('Logging in:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
        session = req.session;
        const errors = validateLogin(req.body);
        if(isEmpty(errors)){
            //Call Backend...........
            try{
                const result = await postLogin(req.body);
                session.logged = result.data.Logged;
                session.firstName = result.data.Result.firstName;
                session.lname = result.data.Result.lastName;
                session.token = result.data.Token;
                return successTemplate(res, 'home', 'Home', result.data.message, session);
            }
            catch(err){
                return errorTmeplate(req, res, 'login', 'Login', 'Authentication failed, User email or password NOT matched',errors, session);
            }
        }
        else{
            return errorTmeplate(req, res, 'login', 'Login', messages.failed_login, errors, session);
        }
    }
    catch(err){
        return errorTmeplate(req, res, 'login', 'Login', err.message);
    }
}


module.exports = {getHomeHandler, getLoginHandler, getRegisterHandler, getAboutHandler, getLogoutHandler, postRegisterHandler, postLoginHandler};