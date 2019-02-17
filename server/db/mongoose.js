const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect(MONGODB_URI || "mongodb://localhost:27017/todo_app"); 

module.exports = {
    mongoose: mongoose
}