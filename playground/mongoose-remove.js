const {ObjectID}=require('mongodb');

const {mongoose}= require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) =>{//it will remove everything
//     console.log(result);
// });

//it will remove the first result and send back the removed document
Todo.findOneAndRemove({_id: '5acec382aba7bcb7e471a60b'}).then((todo)=>{

});

// //it will remove the matched Id and return the removed document
// Todo.findByIdAndRemove('5acec382aba7bcb7e471a60b').then((todo) =>{
//     console.log(todo);
// });