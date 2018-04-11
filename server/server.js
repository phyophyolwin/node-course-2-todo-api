const express = require('express');
const bodyParser = require('body-parser');//take JSON and convert it into object

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

let app = express();

app.use(bodyParser.json());//middleware to express

app.post('/todos', (req, res) =>{// for resource creation
    let todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc)=>{
        res.send(doc);
    }, (error)=>{
        res.status(400).send(error);
    });
});

//GETY /todos/122000 

app.listen(3000, () =>{
    console.log('Started on port 3000');
});


// let newUser = new User({
//     email: ' nangsoe@gmail.com '
// });

// newUser.save().then((doc) => { //Save the user object.
//     console.log('Saved user', doc);
// }, (error) =>{
//     console.log('Unable to save user',e);
// });

// let newTodo = new Todo({
//     text: 'Cook supper',
//     completed: true,
//     completedAt: new Date().getMilliseconds()
// });

// let newTodo = new Todo({
//    text: ' Feed the cat ' //setting boolean or number will still work for type String in mongoose
// });

// newTodo.save().then((doc) => { //Save the todo object.
//     console.log('Saved todo', doc);
// }, (error) =>{
//     console.log('Unable to save todo',e);
// });

// let newTodo = new Todo({
//     text: 'Cook lunch'
// });

// newTodo.save().then((doc) => { //Save the todo object.
//     console.log('Saved todo', doc);
// }, (error) =>{
//     console.log('Unable to save todo');
// });