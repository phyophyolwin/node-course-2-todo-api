require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');//take JSON and convert it into object
const {ObjectID}=require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');

let app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());//middleware to express

app.post('/todos', authenticate, (req, res) =>{// for resource creation
    let todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    todo.save().then((doc)=>{
        res.send(doc);
    }, (error)=>{
        res.status(400).send(error);
    });
});

app.get('/todos', authenticate,(req, res)=>{
    Todo.find({
        _creator: req.user._id
    }).then((todos)=>{
        res.send({
            todos
        });
    },(err)=>{
        res.status(400).send(e);
    });
});

app.delete('/todos/:id',authenticate,(req,res) =>{
    let id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(400).send();
    }
    Todo.findOneAndRemove({
        _id: id,
        _creator : req.user._id
    }).then((todo) =>{
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((err) =>{
        res.status(400).send();
    });
});

app.get('/todos/:id',authenticate, (req,res) =>{
    let id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    Todo.findOne({
        _id: id,
        _creator: req.user._id
    }).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((error)=> {
        res.status(400).send();
    });
           
});

app.patch('/todos/:id', authenticate, (req,res)=>{
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

    Todo.findOneAndUpdate({
       _id: id,
        _creator: req.user._id
    }, {$set: body},{new: true}).then((todo) =>{
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

//authenticate is adding the middleware in the request
app.get('/users/me', authenticate, (req,res) =>{
    res.send(req.user);
});

app.post('/users/login', (req,res)=>{
    let body = _.pick(req.body, ['email', 'password']);
    
    User.findByCredentials(body.email, body.password).then((user) =>{
        return user.generateAuthToken().then((token)=>{
            res.header('x-auth', token).send(user);
        });
        
    }).catch((error) =>{
        res.status(400).send();
    });
});

//private route for logout
app.delete('/users/me/token', authenticate,(req, res)=>{
    req.user.removeToken(req.token).then(() =>{
        res.status(200).send();
    }, () =>{
        res.status(400).send();
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