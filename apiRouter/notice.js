
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

router.post('/sayHello', function(req, res) {
    const responseBody = {
        version: "2.0",
        template: {
        outputs: [
            {
            simpleText: {
                text: "hello I'm Ryan"
            }
            }
        ]
        }
    };
    
    res.status(200).send(responseBody);
    });
    
getHtml()
    .then(html => {
        let ulList = [];
        const $ = cheerio.load(html.data);
        const $bodyList = $("div.row div.row.blog-list").children("article");

        $bodyList.each(function(i, elem) {
            let date = $(this).find('div.blog-details span').text().substr(0, $(this).find('div.blog-details span').text().length-10);
            date = new Date(date);

            ulList[i] = {
                title: $(this).find('div.blog-top a.blog-title').text().trim(),
                url: $(this).find('div.blog-top a').attr('href'),
                summary: $(this).find('div.blog-content').text().trim(),
                "date": date,
                id: url.parse($(this).find('div.blog-top a').attr('href')).query.slice(2),
            };
    });
    let wk_ago= new Date(Date.now() - 8 * 24 * 60 * 60 * 1000);
    console.log(wk_ago);
    const liData = ulList.filter(n => n.date>=wk_ago);
    console.log(liData);
    return liData;
})
.then(result => {
    log(result)
    router.get('/',(req,res)=>{
        res.send(result)
    })
});



router.post('/showHello', function(req, res) {
    console.log(req.body);

    const responseBody = {
        version: "2.0",
        template: {
        outputs: [
            {
            simpleImage: {
                imageUrl: "https://t1.daumcdn.net/friends/prod/category/M001_friends_ryan2.jpg",
                altText: "hello I'm Ryan"
            }
            }
        ]
        }
    };

    res.status(200).send(responseBody);
});



module.exports=router;