const express = require('express');
const app = express();
const logger = require('morgan');
app.use(logger('dev', {}));
app.use(express.json()); 
app.use(express.urlencoded( {extended : false } ));


const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;


//crawling
const getHtml = async () => {
    try {
        return await axios.get("http://ese.cau.ac.kr/wordpress/?cat=11");
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
                title: $(this).find('div.blog-top a.blog-title').text().slice(21),
                url: $(this).find('div.blog-top a').attr('href'),
                summary: $(this).find('div.blog-content').text().slice(21),
                date: $(this).find('div.blog-details span').text()
            };
    });

    const data = ulList.filter(n => n.title);
    return data;
})
.then(res => log(res));



// app.get('/message', (req, res) => {
//     const question = req.body.userRequest.utterance;
//     let data={

//         'type' : 'buttons',

//         'buttons' : ['도움말','장학금','현장실습']

//     };

//     // json 형식으로 응답

//     res.json(data);

// });
app.listen(3000);