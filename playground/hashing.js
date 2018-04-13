const {SHA256} = require ('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let password = '123abc!';

//to generate the salt the pw
//the bigger the number here, the longer it takes to generate the salt
// bcrypt.genSalt(10, (err, salt) =>{
//     bcrypt.hash(password, salt, (err, hash) =>{
//         console.log(hash);
//     });
// });


//Below is how to compared the hashed value and the plain password from user
let hashedPassword = '$2a$10$QQ.U5ycFLd9YWMSUmKL8rOZaJkGjF3Y9WFvLqBc3HGCo0PKWE/y/W';

bcrypt.compare('123!', hashedPassword, (err, result) =>{
    console.log(result);
});

// let data={
//     id: 10
// };

// let token = jwt.sign(data, '123abc'); //To sign the data and create hash and return the token, '123abc' is the salt secret
// console.log(token);

// let decoded = jwt.verify(token , '123abc'); //take token and verify that data is not manipulated.
// console.log('decoded',decoded);

// let message = 'I am user number 3';
// let hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// let data = {
//     id: 4
// };

// let token={//this is not secured enough, so we will salt it.
//     data,
//     hash: SHA256(JSON.stringify(data)+ 'somesecret').toString()
// };

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// let resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if(resultHash === token.hash){
//     console.log('Data was not changed');
// }else{
//     console.log('Data was changed. Do not trust!');
// }