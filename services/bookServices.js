const axios = require('axios');
require('dotenv').config();

const getBooks = async(req) =>{
    //console.log(req.headers);
    axios.defaults.headers.get['Authorization'] = req.headers.authorization;
    return await axios.get(process.env.url+'/books');
}

const postBook = async(req) =>{
    axios.defaults.headers.post['Authorization'] = req.headers.authorization;
    return await axios.post(process.env.url+'/books', {
        title: req.body.title,
        author: req.body.author,
        ISBN: req.body.ISBN,
        price: req.body.price,
        noOfPages: req.body.noOfPages,
        yearPublished: req.body.yearPublished
    })
}

const getBookById = async(req) =>{
    axios.defaults.headers.get['Authorization'] = req.headers.authorization;
    return await axios.get(process.env.url+'/books/'+req.params.bookId);
}

const getBooksIds = async(req) =>{
    axios.defaults.headers.get['Authorization'] = req.headers.authorization;
    return await axios.get(process.env.url+'/books/books');
}

const updateBookById = async(req) =>{
    axios.defaults.headers.put['Authorization'] = req.headers.authorization;
    const body = req.body;
    return await axios.put(process.env.url+'/books/'+body.bookId, {
        title: body.title,
        author: body.author,
        ISBN: body.ISBN,
        noOfPages: body.noOfPages,
        price: body.price,
        yearPublished: body.yearPublished
    });
}

const deleteBookById = async(req) =>{
    axios.defaults.headers.delete['Authorization'] = req.headers.authorization;
    return await axios.delete(process.env.url+'/books/'+req.params.bookId);
}

module.exports = {getBooks, postBook, getBookById, getBooksIds, updateBookById, deleteBookById};