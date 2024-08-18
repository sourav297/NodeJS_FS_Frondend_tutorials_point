const express=require('express');
const cors=require('cors');
const app=express();
const userRouter=require('../Router/userRouter');
const bookRouter=require('../Router/bookRouter');
const authorRouter=require('../Router/authorRouter');

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

app.use('/', userRouter);

// app.use('/books', bookRouter);

// app.use('/authors', authorRouter);


app.get('/', ()=>{
    console.log('Welcome to frondend webpage');
});




module.exports=app;