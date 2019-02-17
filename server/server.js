const express = require("express");
const bodyParser = require("body-parser"); 
const ObjectID = require("mongodb").ObjectID;
const _ = require("lodash"); 

const mongoose = require("./db/mongoose.js");
const User = require("./models/user").User; 

const todo_routes = require("./routes/todos.js")

const app = express(); 
const port = process.env.PORT || 3000; 

// app.use((req, res, next) => {
//     // console.log(req); 
//     let data = []
//     req.on("data", (chunk) => {

//         data.push(chunk);
//     }).on("end", () => {
//         data = Buffer.concat(data);
//         req.body = JSON.parse(data); 
//         next(); 
//     });
// }); 

app.use(bodyParser.json()); 
app.use("/todos", todo_routes); 

// app.post("/todos", (req, res) => {
//     let body, todo;

//     body = req.body;
//     todo = new Todo({
//         text: body.text
//     })

//     todo.save().then((doc) => {
//         res.send(doc); 
//     }, (e) => {
//         res.status(400).send(e); 
//     }); 
// });

// app.get("/todos", (req, res) => {
//     Todo.find().then((data) => {
//         res.send({
//             todos: data
//         }); 
//     }, (e) => {
//         res.status(400).send(e);
//     }); 
// });

// app.get("/todos/:id", (req, res) => {
//     let id; 
//     id = req.params.id; 
//     if (!ObjectID.isValid(id)) {
//         return res.status(404).send(); 
//     }

//     Todo.findById(id).then((todo) => {
//         if (!todo) {
//             return res.status(404).send(); 
//         }
//         res.send({
//             todo: todo
//         }); 
//     }).catch((e) => {
//         res.status(400).send(); 
//     });
// });

// app.delete("/todos/:id", (req, res) => {
//     let id;
//     id = req.params.id;
//     if (!ObjectID.isValid(id)) { 
//         return res.send(404).send();
//     }

//     Todo.findByIdAndRemove(id).then((todo) => {
//         if (!todo) {
//             return res.status(404).send(); 
//         }
//         res.send({
//             todo: todo
//         }).catch((e) => {
//             res.status(400).send(); 
//         })
//     });
// });

// app.patch("/todos/:id", (req, res) => {
//     let id;
//     id = req.params.id; 
//     let body = _.pick(req.body, ['text', 'completed']);

//     if (!ObjectID.isValid(id)) { 
//         return res.send(404).send();
//     }

//     if (_.isBoolean(body.completed) && (body.completed)){
//         body.completedAt = new Date().getTime(); 
//     }else {
//         body.completed = false;
//         body.completedAt = null;
//     }

//     Todo.findByIdAndUpdate(id, 
//         {
//             $set: body
//         },
//         {
//             new: true
//         }).then((todo) => {
//             if (!todo) {
//                 return res.status(404).send(); 
//             }
//             res.send({
//                 todo: todo
//             });
//         }, (e) => {
//             res.status(400).send(); 
//         });
// });


app.listen(port, () => {
    console.log(`Started on port ${port}...`); 
}); 

module.exports = {app}; 