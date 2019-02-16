const mongodb = require("mongodb").MongoClient; 

mongodb.connect("mongodb://localhost:27017/todo_app", (err, db) => {
    if (err) { 
        return console.log("Unable to connect to MongoDB server"); 
    }
    console.log("Successfully connected to MongoDB server"); 

    db.collection("todos").find({
        completed: false
    }).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2)); 
    }, (err) => {
        console.log("unable to fetch todos", err); 
    });

    // db.close(); 
});
