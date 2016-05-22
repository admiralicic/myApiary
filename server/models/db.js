var mongoose = require('mongoose');
var dbUri = 'mongodb://localhost/myapiary';
var gracefulShutdown;

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


require('./user.model.js');