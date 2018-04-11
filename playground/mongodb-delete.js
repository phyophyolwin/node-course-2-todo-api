const {MongoClient, ObjectID} = require('mongodb');//Object destructuring


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) =>{
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    db.collection('Users').deleteMany({name: 'Fiona'}).then((result) =>{
        console.log(result);
    });

    db.collection('Users').deleteOne({_id: new ObjectID('5acd7ccfd78373378cb4de59')}).then((result) =>{
        console.log(result);
    });

    db.collection('Users').findOneAndDelete({_id: 123}).then((result) =>{
        console.log(result);
    });

    // deleteMany
    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    // deleteOne regardless of how many it has, it will delete one
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    //findOneAndDelete => find one and delete that record.
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // });


    // db.close();
});