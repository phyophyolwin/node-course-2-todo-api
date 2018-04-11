const mongoose = require('mongoose');

//Create the model with fields and their type so that mongoose knows how to map.
let Todo = mongoose.model('Todo', {//mongoose will auto change the collection name to pluralize and small letters.
    text: {
        type: String, 
        required: true, //Setting the validations
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

module.exports = {Todo};