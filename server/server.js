const express = require("express");
const bodyParser = require("body-parser"); 

const mongoose = require("./db/mongoose.js");
const Todo = require("./models/todo").Todo;
const User = require("./models/user").User; 

const app = express(); 

app.use((req, res, next) => {
    let data = []
    req.on("data", (chunk) => {
        data.push(chunk);
    }).on("end", () => {
        data = Buffer.concat(data).toString();
        req.body = JSON.parse(data); 
        next(); 
    });
}); 

app.post("/todos", (req, res) => {
    let body, todo;

    body = req.body;
    todo = new Todo({
        text: body.text
    })

    todo.save().then((doc) => {
        res.send(doc); 
    }, (e) => {
        res.status(400).send(e); 
    }); 
});

app.listen(3000, () => {
    console.log("Started on port 3000..."); 
}); 

