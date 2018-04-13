const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

let UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            minlength: 1,
            trim: true,
            unique: true, //Can not have same email in the db
            validate: {
                validator:  validator.isEmail,            
                message: '{VALUE} is not valid email'
            }
        },
        password:{
            type: String,
            require: true,
            minlength: 6
        },
        tokens:[{
            access: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            }
        }]
    }
);

UserSchema.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject();

    return _.pick(userObject, ['_id','email']);
};

// arrow function do not bind "this" keyword, we need to bind the "this" keyword to store the individual document
//so here we are using the normal function.
UserSchema.methods.generateAuthToken = function (){//This instance method do have access to each doc, we need this to generate the JSON token
    let user = this;
    let access = 'auth';
    let token = jwt.sign({_id:user._id.toHexString(), access}, 'abc123').toString();//object and secret value

    // using push to add the new data into array will not work, so set new value by index
    user.tokens.set(user.tokens.length, { access, token});
    user.markModified('tokens');
    
    //For the caller to chain on the promise the return from user.save() is returning the promise
    //the return token will be passed as the success part of the next then call.
    return user.save().then(() =>{
        return token;
    });

};

let User = mongoose.model('User',UserSchema);

module.exports = {User};