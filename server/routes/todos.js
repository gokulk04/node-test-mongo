const express = require("express");
const router = express.Router(); 
const ObjectID = require("mongodb").ObjectID;
const _ = require("lodash"); 

const Todo = require("../models/todo").Todo;

router.post("/", (req, res) => {
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

router.get("/", (req, res) => {
    Todo.find().then((data) => {
        res.send({
            todos: data
        }); 
    }, (e) => {
        res.status(400).send(e);
    }); 
});

router.get("/:id", (req, res) => {
    let id; 
    id = req.params.id; 
    if (!ObjectID.isValid(id)) {
        return res.status(404).send(); 
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send(); 
        }
        res.send({
            todo: todo
        }); 
    }).catch((e) => {
        res.status(400).send(); 
    });
});

router.delete("/:id", (req, res) => {
    let id;
    id = req.params.id;
    if (!ObjectID.isValid(id)) { 
        return res.send(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send(); 
        }
        res.send({
            todo: todo
        }).catch((e) => {
            res.status(400).send(); 
        })
    });
});

router.patch("/:id", (req, res) => {
    let id;
    id = req.params.id; 
    let body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) { 
        return res.send(404).send();
    }

    if (_.isBoolean(body.completed) && (body.completed)){
        body.completedAt = new Date().getTime(); 
    }else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, 
        {
            $set: body
        },
        {
            new: true
        }).then((todo) => {
            if (!todo) {
                return res.status(404).send(); 
            }
            res.send({
                todo: todo
            });
        }, (e) => {
            res.status(400).send(); 
        });
});

module.exports = router; 