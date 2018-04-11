const {MongoClient, ObjectID} = require('mongodb');//Object destructuring


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) =>{
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    db.collection('Users').findOneAndUpdate({
            _id: new ObjectID('5acda6f7aba7bcb7e4717647')
        },{
            $set:{
                name: 'Phyo'
            },
            $inc:{
                age:1
            }
        },{
            returnOriginal: false
        }).then((result) =>{
        console.log(result);
    });

    // db.collection('Todos').findOneAndUpdate({
    //         _id: new ObjectID('5acda013aba7bcb7e471745f')
    //     },{
    //         $set:{
    //             completed: true
    //         }
    //     },{
    //         returnOriginal: false
    //     }).then((result) =>{
    //     console.log(result);
    // });

    // db.close();
});