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


router.post('/기계',(req,res)=>{
    cn.query(`select * from prof`,(err, result)=>{
        if(err) console.log(err);
        let arr = [];
        for(let i=0; i<result.length; i++){
            arr[i]={
                "title": result[i].name,
                "description": result[i].depart,
                "thumbnail":{
                    "imageUrl": result[i].image
                }//,
                // "buttons": [
                //     {
                //         "action":  "webLink",
                //         "label": "자세한 프로필 링크",
                //         "webLinkUrl": result[i].profile
                //     },
                //     {
                //         "action":  "webLink",
                //         "label": "연구실 링크",
                //         "webLinkUrl": result[i].lab
                //     }
                // ]
            }
        }
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
})





module.exports=router;