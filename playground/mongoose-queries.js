const {ObjectID}=require('mongodb');

const {mongoose}= require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

let userId = '5acdbea821806b6c473938d9';

if(!ObjectID.isValid(userId)){
    console.log('User Id not valid');
}else{
    User.findById(userId).then((user)=>{
        if(!user){
            return console.log('User Id not found');
        }
        console.log('User By Id',user);
    }).catch((error)=> console.log(error));
    
}

// let id = '5acdd144001527d82ece755611';

// if(!ObjectID.isValid(id)){
//     console.log('ID not valid');
// }

// Todo.find({
//     _id: id //id will be converted to ObjectID by mongoose
// }).then((todos)=>{
//     console.log('Todos',todos);
// });

// Todo.findOne({
//     _id: id //id will be converted to ObjectID by mongoose
// }).then((todo)=>{
//     console.log('Todo',todo);
// });

// Todo.findById(id).then((todo)=>{
//     if(!todo){
//         return console.log('Id not found');
//     }
//     console.log('Todo By Id',todo);
// }).catch((error)=> console.log(error));