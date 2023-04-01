const express = require('express');
const app = express();
const port = 8000;
const expresslayouts = require('express-ejs-layouts');
const db = require("./config/mongoose");
const Admin = require('./models/admin');
const Employee = require('./models/employee');

app.use(express.urlencoded());
app.use(express. json());
app.use(express.static("./assets")); 

app.use(expresslayouts);
app.set("layout extractStyles", true); 
app.set("layout extractScripts", true);

app.set("view engine", "ejs");
app.set("views", "./views");
app.use('/', require('./routes'));


app.listen(port, function(err){
    if(err) { 
        console.log(`Port :: ${port} is not working with the err : \n ${err}`);
    }
    console.log(`Port ${port} is up and running successfully!!!`);
});      