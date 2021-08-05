const express = require('express');
const app = express();

app.use(express.json()); 
app.use(express.urlencoded( {extended : false } ));


app.post('/message', (req, res) => {
    const question = req.body.userRequest.utterance;
    let data={

        'type' : 'buttons',

        'buttons' : ['도움말','장학금','현장실습']

    };

    // json 형식으로 응답

    res.json(data);

});