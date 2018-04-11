const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // setting the promise library to be used by mongoose. global.Promise is the build in promise lib
mongoose.connect('mongodb://localhost:27017/TodoApp');//connecting the db by mongoose

module.exports = {mongoose};