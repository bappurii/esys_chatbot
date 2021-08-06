//Module
//express module
const express = require('express');
const app = express();
const logger = require('morgan');
app.use(logger('dev', {}));
app.use(express.json()); 
app.use(express.urlencoded( {extended : false } ));

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


//crawling
const getHtml = async () => {
    try {
        return await axios.get("http://ese.cau.ac.kr/wordpress/?page_id=226");
    } catch (error) {
        console.error(error);
    }
};


getHtml()
    .then(html => {
        let ulList = [];
        const $ = cheerio.load(html.data);
        const $bodyList = $("div.row div.row.blog-list").children("article");

        $bodyList.each(function(i, elem) {
            ulList[i] = {
                title: $(this).find('div.blog-top a.blog-title').text().trim(),
                url: $(this).find('div.blog-top a').attr('href'),
                summary: $(this).find('div.blog-content').text().trim(),
                date: $(this).find('div.blog-details span').text().substr(0, $(this).find('div.blog-details span').text().length-10),
                id: url.parse($(this).find('div.blog-top a').attr('href')).query.slice(2),
            };
    });

    const data = ulList.filter(n => n.title);
    return data;
})
.then(result => {
    log(result)
});



app.listen(3000);