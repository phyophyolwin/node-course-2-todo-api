let {User} = require('./../models/user');

let authenticate = (req, res, next) => {
    let token = req.header('x-auth');

    User.findByToken(token).then((user) =>{
        if(!user){
            return Promise.reject();
        }

        // res.send(user);
        //Instead of send the user to the response, we will do below.
        req.user = user;
        req.token = token;
        next();//only after this call, the original route will be called.
    }).catch((e)=>{
        res.status(401).send();
    });
};

module.exports = {authenticate};