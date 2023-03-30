const express = require('express');
const app = express();
const port = 8000;

app.get('/', function (req, res) {
    res.send('<h1>Its working now!..</h1>')
});

app.listen(port, function(err){
    if(err) {
        console.log(`Port :: ${port} is not working with the err : \n ${err}`);
    }
    console.log(`Port ${port} is up and running successfully!!!`);
})