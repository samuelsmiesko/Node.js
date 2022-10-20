const express = require('express');  
const morgan = require('morgan');
const Fs = require('path')
const Axios = require('axios')
const _ = require('lodash');

const app = express();
app.listen(3000);

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use((req, res, next) => {
    console.log('new request made:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();
  });

app.use((req,res, next)=>{
    console.log('in te bn')
    next();
});

app.use(morgan('dev'));

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
  
});

var hold =_.once(()=>{
    console.log("once");
    
});

app.get('/',(req, res)=>{
	
    res.render('home', { title: 'Home' });
    hold()  
});

app.get('/gallery',(req, res)=>{
	
    res.render('gallery', { title: 'gallery' });
});

app.get('/downloads',(req, res)=>{
	
    res.render('downloads', { title: 'about' });
});

app.get('/contacts',(req, res)=>{
	
    res.render('contacts', { title: 'contacts' });
});

//
app.get('/word',(req, res)=>{
	
    res.download('public/files/word.docx');
});

app.get('/pdf',(req, res)=>{
	
    res.download('public/files/pdf.pdf');
});

app.get('/excel',(req, res)=>{
	
    res.download('public/files/excel.xlsx');
});
//
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});


    
