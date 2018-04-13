require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');//take JSON and convert it into object
const {ObjectID}=require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

let app = express();
const port = process.env.PORT || 3000;

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

app.get('/todos', (req, res)=>{
    Todo.find().then((todos)=>{
        res.send({
            todos
        });
    },(err)=>{
        res.status(400).send(e);
    });
});

app.delete('/todos/:id',(req,res) =>{
    let id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(400).send();
    }
    Todo.findByIdAndRemove(id).then((todo) =>{
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((err) =>{
        res.status(400).send();
    });
});

app.get('/todos/:id',(req,res) =>{
    let id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    Todo.findById(id).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((error)=> {
        res.status(400).send();
    });
           
});

app.patch('/todos/:id', (req,res)=>{
    let id = req.params.id;
    let body = _.pick(req.body, ['text', 'completed']);//these are the only 2 properties user can update by setting the values in the body of request

    if(!ObjectID.isValid(id)){
        return res.status(400).send();
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body},{new: true}).then((todo) =>{
        if(!todo){
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((e)=>{
        res.status(400).send();
    });
});

app.post('/users', (req, res) =>{// for resource creation
    let body = _.pick(req.body, ['email', 'password']);
    let user = new User(body);    

    user.save().then(()=>{
        return user.generateAuthToken();
        // res.send(user);
    }).then((token) =>{
        //To send the token in the header
        //x- in the header shows the custom header
        res.header('x-auth', token).send(user);
    }).catch((error)=>{
        res.status(400).send(error);
    });
});

app.listen(port, () =>{
    console.log(`Started on port ${port}`);
});

module.exports = {app};

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