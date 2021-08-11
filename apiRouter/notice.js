
//express module
const express = require('express');
const app = express();
const router = express.Router();
const logger = require('morgan');
app.use(logger('dev', {}));
app.use(express.json()); 
app.use(express.urlencoded( {extended : false } ));


//crawling module
const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;
const url = require('url');

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
            let date = $(this).find('div.blog-details span').text().substr(0, $(this).find('div.blog-details span').text().length-10);
            compare_date = new Date(date);

            ulList[i] = {
                "title": $(this).find('div.blog-top a.blog-title').text().trim()+`(${date})`,
                "description": $(this).find('div.blog-content').text().trim(),
                "link": {"web": $(this).find('div.blog-top a').attr('href')},
                "date": compare_date,
            };
    });
    let wk_ago= new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);
    const liData = ulList.filter(n => n.date>=wk_ago);
    return liData;
})
.then(liData => {
    const filtered = liData.map(({date, ...rest})=>({...rest}))
    console.log(filtered);
    router.post('/',(req,res)=>{

        
        const responseBody = {
            "version": "2.0",
            "template": {
                "outputs": [
                {   
                    "listCard": {
                        "header": {
                            "title": "최근 공지사항"
                        },
                        "items": 
                            filtered
                        ,
                        "buttons": [
                            {
                            "label": "전체 글 보기 링크",
                            "action": "webLink",
                            "webLinkUrl": "http://ese.cau.ac.kr/wordpress/?page_id=226"
                            }
                        ]
                    }
                }
                ]
            }
            }
    
        res.status(200).send(responseBody);
    })
});



module.exports=router;