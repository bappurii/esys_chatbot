
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
            new_date = new Date(date);
            ulList[i] = {
                "title": $(this).find('div.blog-top a.blog-title').text().trim(),
                "description": $(this).find('div.blog-content').text().trim()+` ${date.slice(0,-6)}`,
                "link": {"web": $(this).find('div.blog-top a').attr('href')},
                "date": new_date,
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

        console.log(filtered);
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
                            "label": "전체 글 보기",
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

router.post('/sayHello', function(req, res) {
    const responseBody = {
    "version": "2.0",
    "template": {
        "outputs": [
        {
            "listCard": {
            "header": {
                "title": "카카오 i 디벨로퍼스를 소개합니다"
            },
            "items": [
                {
                "title": "Kakao i Developers",
                "description": "새로운 AI의 내일과 일상의 변화",
                "imageUrl": "http://k.kakaocdn.net/dn/APR96/btqqH7zLanY/kD5mIPX7TdD2NAxgP29cC0/1x1.jpg",
                "link": {
                    "web": "https://namu.wiki/w/%EB%9D%BC%EC%9D%B4%EC%96%B8(%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%94%84%EB%A0%8C%EC%A6%88)"
                }
                },
                {
                "title": "Kakao i Open Builder",
                "description": "카카오톡 채널 챗봇 만들기",
                "imageUrl": "http://k.kakaocdn.net/dn/N4Epz/btqqHCfF5II/a3kMRckYml1NLPEo7nqTmK/1x1.jpg",
                "link": {
                    "web": "https://namu.wiki/w/%EB%AC%B4%EC%A7%80(%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%94%84%EB%A0%8C%EC%A6%88)"
                }
                },
                {
                "title": "Kakao i Voice Service",
                "description": "보이스봇 / KVS 제휴 신청하기",
                "imageUrl": "http://k.kakaocdn.net/dn/bE8AKO/btqqFHI6vDQ/mWZGNbLIOlTv3oVF1gzXKK/1x1.jpg",
                "link": {
                    "web": "https://namu.wiki/w/%EC%96%B4%ED%94%BC%EC%B9%98"
                }
                }
            ],
            "buttons": [
                {
                "label": "구경가기",
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