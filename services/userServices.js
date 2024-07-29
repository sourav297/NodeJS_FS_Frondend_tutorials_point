const axios=require('axios');
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
    const result = await axios.post(process.env.url+'/users/login', {
        email: body.email,
        password: body.password
    });
    return result;
}

module.exports={postRegister, postLogin};