const {MongoClient, ObjectID} = require('mongodb');//Object destructuring


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) =>{
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    db.collection('Users').find({name: 'Fiona'}).toArray().then((docs) => {
        console.log('Users');
        console.log(JSON.stringify(docs, undefined,2));
    }, (err) =>{
        console.log('Unable to fetch usrs', err);
    });

    // db.collection('Todos').find().count().then((count) =>{
    //     console.log(`Todos count: ${count}`);
        
    // }, (err)=>{
    //     console.log('Unable to fetch todos', err);
    // });

    // db.collection('Todos').find({
    //     _id: new ObjectID('5acd82c1aba7bcb7e4716b16') // set query in find() for _id, this must called by new ObjectID
    // }).toArray().then((docs) =>{
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err)=>{
    //     console.log('Unable to fetch todos', err);
    // });

    // db.collection('Todos').find({completed: false}).toArray().then((docs) =>{// set query in find({completed: false})
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err)=>{
    //     console.log('Unable to fetch todos', err);
    // });

    //Instead of cursor in sql, here it gives Array of document. This returns promise
    // db.collection('Todos').find().toArray().then((docs) =>{//this will return all documents
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err)=>{
    //     console.log('Unable to fetch todos', err);
    // });

    // db.close();
});