const mongodb = require("mongodb").MongoClient; 

mongodb.connect("mongodb://localhost:27017/todo_app", (err, db) => {
    if (err) { 
        return console.log("Unable to connect to MongoDB server"); 
    }
    console.log("Successfully connected to MongoDB server"); 

    // db.collection("todos").insertOne({
    //     text: "Walk the dog",
    //     completed: false
    // }, (err, res) => {
    //     if (err) {
    //         return console.log("Unable to insert todo. ", err); 
    //     }
    //     console.log(JSON.stringify(res.ops, undefined, 2))
    // });

    db.collection("users").insertOne({
        name: "Gokul",
        age: 22,
        location: "PA"
    }, (err, res) => {
        if (err) { 
            return console.log("Unable to insert user. ", err); 
        }
        console.log(JSON.stringify(res.ops, undefined, 2));
    })

    db.close(); 
});
