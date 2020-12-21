// *************Include different modules and assign them to a variable******************
// Express
const express = require('express');
// Morgan
const morgan = require('morgan');
// Mongoose
const mongoose = require('mongoose');
// lodash
const { result } = require('lodash');

const { render } = require('ejs');
const blogRoutes = require('./routes/blogroutes');
// *******************************************************************

// Instantiate express function from express module
const app = express();

// Use static function from express module to include static files(js, css)
app.use(express.static('public'));

//connect to db
const dbURI = 'mongodb+srv://9446415805:7306919697@cluster0.ftqbe.mongodb.net/nodetuts?retryWrites=true&w=majority';
const port = 3000;
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => app.listen(port, ()=>console.log('server is running at port '+ port)))
.catch((err)=>console.log(err));

//templating engine
app.set('view engine', 'ejs');
//morgan in dev mode
app.use(morgan('dev'));

// Below middleware takes all the data sent from form through post (url encoded data) request and it passes these details into an object:
app.use(express.urlencoded({extended: true}));


// ***************Get request routes*********************
app.get('/', (req, res)=>{
    res.redirect('/blogs');                              //redirect to home page 'blogs'
});

app.get('/home', (req, res)=>{
    res.redirect('/blogs');                             //redirect to home page 'blogs'
});

app.get('/about', (req, res)=>{
    res.render('about', {'title': 'about'} );
});

/*************Blog Routes***************/
app.use('/blogs', blogRoutes);

/****************************/
//Error page
app.use((req,res)=>{
    res.status(404).render('error', {title: '404'});
});

