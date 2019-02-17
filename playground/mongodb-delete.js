const mongodb = require("mongodb").MongoClient; 

mongodb.connect("mongodb://localhost:27017/todo_app", (err, db) => {
    if (err) { 
        return console.log("Unable to connect to MongoDB server"); 
    }
    console.log("Successfully connected to MongoDB server"); 

    db.collection("todos").deleteMany({
        completed: true
    }).then((result) => {
        console.log(result); 
    });
});
