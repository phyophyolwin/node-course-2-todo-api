const env = process.env.NODE_ENV || 'development';//this is default set on Heroku, so if wants to use for dev, need to define in local.

if(env === 'development' || env === 'test'){
    let config = require('./config.json');
    let envConfig = config[env];//this is to fetch only the env value, if it's test, then fetch only test properties

    //it return the values in array
    Object.keys(envConfig).forEach((key) =>{
        process.env[key] = envConfig[key];
    });
}

// if(env === 'development'){
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
// }else if(env === 'test'){
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
// }