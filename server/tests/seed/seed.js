const {ObjectID } = require('mongodb');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');
const jwt = require('jsonwebtoken');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
    _id: userOneId,
    email: 'phyo@example.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id:userOneId, access: 'auth'}, 'abc123').toString()//object and secret value
    }]
}, {
    _id: userTwoId,
    email: 'phyophyo@example.com',
    password: 'userTwoPass'
}];

const todos = [{
    text: 'First test todo',
    _id: new ObjectID()
},
{
    text: 'Second test todo',
    _id: new ObjectID(),
    completed: true,
    completedAt: 333
}];

const populateTodos = (done) =>{//testing lifecycle method
    Todo.remove({}).then(()=> {
        return Todo.insertMany(todos);

    }).then(()=> done());
};

const populateUsers = (done) =>{
    User.remove({}).then(() =>{
        let userOne = new User(users[0]).save();
        let userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo]);
    }).then(() => done()) ;
};

module.exports = {todos, populateTodos, users, populateUsers};