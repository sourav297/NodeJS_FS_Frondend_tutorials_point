const express=require('express');
const cors=require('cors');
const app=express();
const router=require('../Router/userRouter');

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

app.use('/', router);


app.get('/', ()=>{
    console.log('Welcome to frondend webpage');
});




module.exports=app;