//Module
const notice = require('./apiRouter/notice');
// const errRouter = require('./apiRouter/errRouter')
// const profList = require('./apiRouter/profList')


//express module
const express = require('express');
const app = express();
const logger = require('morgan');
app.use(logger('dev', {}));
app.use(express.json()); 
app.use(express.urlencoded( {extended : false } ));
const PORT = process.env.PORT



//crawling module
const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;
const url = require('url');

//mySQL
const mysql = require('mysql');
const cn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '4321',
    database : 'esys_mailer'
});


app.use('/notice', notice);
// app.use('/profList', profList);
// app.use('/errorRouter', errRouter);

app.listen(PORT);