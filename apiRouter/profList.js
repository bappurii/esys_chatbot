//express module
const express = require('express');
const app = express();
const router = express.Router();
const logger = require('morgan');
app.use(logger('dev', {}));
app.use(express.json()); 
app.use(express.urlencoded( {extended : false } ));

//mySQL
const mysql = require('mysql');
const cn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '4321',
    database : 'esys_mailer'
});


router.post('/machine',(req,res)=>{
    cn.query(`select * from prof where id=1 OR id=2 OR id=3`,(err, result)=>{
        if(err) console.log(err);
        let arr = [];
        for(let i=0; i<result.length; i++){
            arr[i]={
                "title": result[i].name,
                "description": result[i].lecture,
                "thumbnail":{
                    "imageUrl": result[i].image
                },
                "buttons": [
                    {
                        "action":  "webLink",
                        "label": "자세한 프로필 링크",
                        "webLinkUrl": result[i].profile
                    },
                    {
                        "action":  "webLink",
                        "label": "연구실 링크",
                        "webLinkUrl": result[i].lab
                    }
                ]
            }
        }
        console.log(arr);
        const responseBody = {
            "version": "2.0",
            "template": {
                "outputs": [
                {
                    "carousel": {
                    "type": "basicCard",
                    "items": arr
                    }
                }
                ]
            }
        }
        res.status(200).send(responseBody);
    })

    // const responseBody={
    //     "version": "2.0",
    //     "template": {
    //         "outputs": [
    //             {
    //             "carousel": {
    //                 "type": "basicCard",
    //                 "items": [
    //                 {
    //                     "title": "보물상자",
    //                     "description": "보물상자 안에는 뭐가 있을까",
    //                     "thumbnail": {
    //                     "imageUrl": "http://ese.cau.ac.kr/wordpress/wp-content/uploads/2015/08/faculty-kimms.jpg"
    //                     },
    //                     "buttons": [
    //                     {
    //                         "action": "message",
    //                         "label": "열어보기",
    //                         "messageText": "짜잔! 우리가 찾던 보물입니다"
    //                     },
    //                     {
    //                         "action":  "webLink",
    //                         "label": "구경하기",
    //                         "webLinkUrl": " https://www.ecsl.cau.ac.kr/"
    //                     }
    //                     ]
    //                 },
    //                 {
    //                     "title": "보물상자2",
    //                     "description": "보물상자2 안에는 뭐가 있을까",
    //                     "thumbnail": {
    //                     "imageUrl": "http://k.kakaocdn.net/dn/83BvP/bl20duRC1Q1/lj3JUcmrzC53YIjNDkqbWK/i_6piz1p.jpg"
    //                     },
    //                     "buttons": [
    //                     {
    //                         "action": "message",
    //                         "label": "열어보기",
    //                         "messageText": "짜잔! 우리가 찾던 보물입니다"
    //                     },
    //                     {
    //                         "action":  "webLink",
    //                         "label": "구경하기",
    //                         "webLinkUrl": "https://e.kakao.com/t/hello-ryan"
    //                     }
    //                     ]
    //                 },
    //                 {
    //                     "title": "보물상자3",
    //                     "description": "보물상자3 안에는 뭐가 있을까",
    //                     "thumbnail": {
    //                     "imageUrl": "http://k.kakaocdn.net/dn/83BvP/bl20duRC1Q1/lj3JUcmrzC53YIjNDkqbWK/i_6piz1p.jpg"
    //                     },
    //                     "buttons": [
    //                     {
    //                         "action": "message",
    //                         "label": "열어보기",
    //                         "messageText": "짜잔! 우리가 찾던 보물입니다"
    //                     },
    //                     {
    //                         "action":  "webLink",
    //                         "label": "구경하기",
    //                         "webLinkUrl": "https://e.kakao.com/t/hello-ryan"
    //                     }
    //                     ]
    //                 }
    //                 ]
    //             }
    //             }
    //         ]
    //         }
    //     }
    //     res.status(200).send(responseBody);
})





module.exports=router;