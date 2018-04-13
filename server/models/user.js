const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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

//methods object is for instance method
// arrow function do not bind "this" keyword, we need to bind the "this" keyword to store the individual document
//so here we are using the normal function.
UserSchema.methods.generateAuthToken = function (){//This instance method do have access to each doc, we need this to generate the JSON token
    //Instance method, so cerating variable for instance => user
    let user = this;
    let access = 'auth';
    let token = jwt.sign({_id:user._id.toHexString(), access}, process.env.JWT_SECRET).toString();//object and secret value

    // using push to add the new data into array will not work, so set new value by index
    user.tokens.set(user.tokens.length, { access, token});
    user.markModified('tokens');
    
    //For the caller to chain on the promise the return from user.save() is returning the promise
    //the return token will be passed as the success part of the next then call.
    return user.save().then(() =>{
        return token;
    });

};

UserSchema.methods.removeToken = function (token){    
    let user=this;

    return user.update({
        //remove item from array which match the criteria
        $pull: {
            tokens: {token}
        }
    });
};

//statics is for creating static method/ model method
UserSchema.statics.findByToken = function(token){
    //Model method, so creating variable with Model name => User
    let User = this;
    let decoded;//this is undefined.

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        // return new Promise((resolve, reject)=>{
        //     reject();
        // });
        //the above is same as below
        return Promise.reject();
    }

    //this will return promise
    return User.findOne({
        '_id': decoded._id,
        //to query the nested document
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

UserSchema.statics.findByCredentials = function(email,password){
    let user = this;

    return User.findOne({email}).then((user) =>{
        if(!user){
            return Promise.reject();
        }

        return new Promise((resolve,reject)=>{
            bcrypt.compare(password, user.password, (err, result) =>{
                if(result){
                    resolve(user);
                }else{
                    reject();
                }
            });
        });
    });
};

//To add the mongoose middleware to the model before the save event
//next must be called and implemented, if not, the middleware is never complete and it will crash
UserSchema.pre('save', function (next) {
    let user = this;
    //To check the hashed password not to be hashed again when it's not changed.
    if(user.isModified('password')){
        //hash the pw        
        bcrypt.genSalt(10, (err, salt) =>{
            bcrypt.hash(user.password, salt, (err, hash) =>{
                user.password = hash;
                next();
            });
        });
    }
    else{
        next();
    }
});

let User = mongoose.model('User',UserSchema);

module.exports = {User};