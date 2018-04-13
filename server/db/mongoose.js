const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // setting the promise library to be used by mongoose. global.Promise is the build in promise lib
mongoose.connect(process.env.MONGODB_URI);//connecting the db by mongoose

module.exports = {mongoose};

// process.env.NODE_ENV === 'production';// this value is used to specify in which environment we are running the test, either production/ dev/ test.