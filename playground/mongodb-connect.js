// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');//Object destructuring

// let obj = new ObjectID(); this generate unique object id 
// console.log(obj);

//Object destructuring
// let user = {name: 'Phyo', age: 25};
// let {name} = user;
// console.log(name);// Printed out Phyo

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) =>{
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').insertOne({ //Insert a record to Todos table/ collection
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) =>{
    //     if(err){
    //         return console.log('Unable to insert todo');
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // db.collection('Users').insertOne({
    //     name: 'Fiona',
    //     age: 20,
    //     location: 'Clementi'
    // }, (err, result) =>{
    //     if(err){
    //         return console.log('Unable to insert user');
    //     }
    //     console.log(result.ops[0]._id.getTimestamp());
    // });

    db.close();
});