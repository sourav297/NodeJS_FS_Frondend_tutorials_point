const express=require('express');
const cors=require('cors');
const app=express();
const userRouter=require('../Router/userRouter');
const bookRouter=require('../Router/bookRouter');
const authorRouter=require('../Router/authorRouter');
const session = require('express-session');

//cors middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded ({extended: true}));

//middleware templating
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);

//static site for middleware use
app.use(express.static('public'));
app.use(express.static('views'));

//user router
app.use('/', userRouter);

//book router
app.use('/books', bookRouter);

//author router
app.use('/authors', authorRouter);

//If any bad url is given
app.use((req, res) => {
    res.status(404).render('404', {session: session});
});

//health point of this frontend app
app.get('/', ()=>{
    console.log('Welcome to frondend webpage');
});

module.exports=app;