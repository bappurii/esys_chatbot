//express module
const express = require('express');
const app = express();
const router = express.Router();
const logger = require('morgan');
app.use(logger('dev', {}));
app.use(express.json()); 
app.use(express.urlencoded( {extended : false } ));

router.post("/sin",(req, res)=>{
    let question=req.userRequest
    if (question=="신종원"){
        let responseBody= {
            "version": "2.0",
            "template": {
                "outputs": [
                    {
                        "simpleText": {
                            "text": "간단한 텍스트 요소입니다."
                        }
                    }
                ]
            }
        }
        res.status(200).send(responseBody);
    }
})
module.exports=router;