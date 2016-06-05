module.exports = function () {
    var client = './client/';
    var server = './server/';
    
    var config = {
        temp: './.tmp/',
        // all js to vet
        alljs: [
            './client/**/*.js',
            './server/**/*.js',
            './*.js'
        ],

        client: client,
        
        index: client + 'index.html',

        js: [
            client + '*.js',
            client + 'services/**/*.js',
            client + 'components/**/*.js'
        ],
        
        less: client + '/stylesheets/styles.less',

        server: server,

        bower: {
            json: require('./bower.json'),
            directory: client + 'bower_components/',
            ignorePath: '../..'
        },

        defaultPort: 7203,
        nodeServer: './bin/www'
    };

    config.getWiredepDefaultOptions = function() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };

        return options;
    }    
    
    return config;
};