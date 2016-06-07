module.exports = function () {
    var client = './client/';
    var server = './server/';
    var temp = './.tmp/';
    var root = './';
    
    var config = {
        temp: temp,
        css: temp + 'styles.css',
        html: client + '**/*.html',
        // all js to vet
        alljs: [
            './client/**/*.js',
            './server/**/*.js',
            './*.js'
        ],
        build: './build/',
        client: client,
        index: client + 'index.html',
        fonts: client + 'bower_components/font-awesome/fonts/**/*.*',
        htmltemplates: [
            client + '**/*.html',
            '!' + client + 'index.html'
        ],
        images: client + 'images/**/*.*',
        js: [
            client + '*.js',
            client + 'services/**/*.js',
            client + 'components/**/*.js',
            client + 'core/**/*.js'
        ],
        less: client + 'stylesheets/styles.less',
        root: root,
        server: server,
        optimized: {
            app: 'app.js',
            lib: 'lib.js'
        },
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'app.core',
                standAlone: false
            }  
        },
        browserReloadDelay: 1000,
        bower: {
            json: require('./bower.json'),
            directory: client + 'bower_components/',
            ignorePath: '../..'
        },
        packages: [
            './package.json'
            // './bower.json'
        ],
        defaultPort: 7302,
        nodeServer: './bin/www'
    };

    config.getWiredepDefaultOptions = function () {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };

        return options;
    };
    
    return config;
};