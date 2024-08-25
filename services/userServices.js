const axios=require('axios');
const errorTemplate = require('../templates/errorTemplate');
require('dotenv').config();

const postRegister = async(body)=>{
    const result = await axios.post(process.env.url+'/users/register', {
        firstName: body.firstName,
        lastName: body.lastName,
        address: body.address,
        city: body.city,
        state: body.state,
        zipcode: body.zipcode,
        email: body.email,
        password: body.password
    });
    //console.log(result);
    return result;
}

const postLogin = async(body)=>{
    console.log('posting login......................................................................');
    const result = await axios.post(process.env.url+'/users/login', {
        email: body.email,
        password: body.password
    });
    return result;
}

module.exports={postRegister, postLogin};