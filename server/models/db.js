var mongoose = require('mongoose');
var gracefulShutdown;

// var dbUri = 'mongodb://localhost/myapiary';
var dbUri = process.env.MONGOLAB_URI;
// if (process.env.NODE_ENV === 'production') {
//     dbUri = process.env.MONGOLAB_URI;
// }

mongoose.connect(dbUri);

mongoose.connection.on('connected', function(){
    console.log('Connected to database.');
});

mongoose.connection.on('error', function(){
    console.log('Error connecting to database');
});

mongoose.connection.on('disconnected', function(){
    console.log('Disconnected from database');
});

gracefulShutdown = function(msg, callback){
    mongoose.connection.close(function(){
        console.log('Disconnected from database due to ' + msg);
        callback();
    });
};


process.on('SIGINT', function(){
    gracefulShutdown('application shutdown', function(){
        process.exit(0);
    });
});

process.on('SIGTERM', function () {
    gracefulShutdown('Heroku app shutdown', function () {
        process.exit(0);
    });
});


require('./user.model.js');
require('./hive.model.js');
require('./inspection.model.js');
require('./extraction.model.js');