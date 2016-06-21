module.exports = function () {
    var client = './client/';
    var server = './server/';
    var temp = './.tmp/';
    var root = './';
    var report = './report/';
    var wiredep = require('wiredep');
    var specRunnerFile = 'specs.html';
    var bowerFiles = wiredep({ devDependencies: true }).js.map(function (path) {
        return path.replace(__dirname + '/', '');
    });

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
        rport: report,
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

        specRunner: client + specRunnerFile,
        specRunnerFile: specRunnerFile,
        testlibraries: [
            'node_modules/mocha/mocha.js',
            'node_modules/chai/chai.js',
            'node_modules/mocha-clean/index.js',
            'node_modules/sinon-chai/lib/sinon-chai.js'
        ],
        specs: [client + '**/*.spec.js'],

        specHelpers: [client + 'test-helpers/*.js'],
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

    config.karma = getKarmaOptions();

    return config;

    //////////////

    function getKarmaOptions() {

        var options = {
            files: [].concat(
                bowerFiles,
                client + '/app.module.js',
                client + 'core/**/*.js',
                client + 'components/**/*.js',
                client + 'services/**/*.js',
                client + 'test/**/*.spec.js',
                temp + config.templateCache.file
            ),
            exclude: [],
            coverage: {
                dir: report + 'coverage',
                reporters: [
                    { type: 'html', subdir: 'report-html' },
                    { type: 'lcov', subdig: 'report-lcov' },
                    { type: 'text-summary' }
                ]
            },
            preprocessors: {}
        };

        options.preprocessors[client + '**/!(*.spec.js)+(*.js)'] = ['coverage'];
        return options;
    }
};