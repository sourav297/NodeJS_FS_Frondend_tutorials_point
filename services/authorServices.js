const axios = require('axios');
require('dotenv').config();

//Every functionality are exact similar to the book functions, So read the book functionality carefully.

const getAuthors = async(req) =>{
    axios.defaults.headers.get['Authorization'] = req.headers.authorization;
    return await axios.get(process.env.url+'/authors');
}

const getAuthorById = async(req) =>{
    axios.defaults.headers.get['Authorization'] = req.headers.authorization;
    return await axios.get(process.env.url+'/authors/'+req.params.authorId);
}

const postAuthor = async(req) =>{
    axios.defaults.headers.post['Authorization'] = req.headers.authorization;
    const body = req.body;
    return await axios.post(process.env.url+'/authors', {
        name: body.name,
        authorWroteBook: body.bookWritten,
        publisher: body.publisher,
        website: body.website,
        about: body.about
    });
}

const updateAuthorById = async(req) =>{
    axios.defaults.headers.put['Authorization'] = req.headers.authorization;
    const body = req.body;
    return await axios.put(process.env.url+'/authors/'+ body.authorId, {
        name: body.name,
        publisher: body.publisher,
        website: body.website,
        about: body.about
    });
}

const deleteAuthorById = async(req) =>{
    axios.defaults.headers.delete['Authorization'] = req.headers.authorization;
    return await axios.delete(process.env.url+'/authors/'+req.params.authorId);
}


module.exports = {getAuthors, postAuthor, updateAuthorById, getAuthorById, deleteAuthorById};