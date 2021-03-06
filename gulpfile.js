var gulp = require('gulp');
var args = require('yargs').argv;
var browserSync = require('browser-sync');
var config = require('./gulp.config')();
var path = require('path');
var _ = require('lodash');
var del = require('del');
var $ = require('gulp-load-plugins')({ lazy: true });
var port = process.env.PORT || config.defaultPort;


gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

gulp.task('vet', function () {
    log('Analyzing source with JSHint and JSCS');

    return gulp
        .src(config.alljs)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', { verbose: true }))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('styles', ['clean-styles'], function () {
    log('Compiling Less --> CSS');

    return gulp
        .src(config.less)
        .pipe($.plumber())
        .pipe($.less())
        .pipe($.autoprefixer({ browsers: ['last 2 version', '> 5%'] }))
        .pipe(gulp.dest(config.temp));
});

gulp.task('fonts', ['clean-fonts'], function () {
    log('Copying fonts');

    return gulp.src(config.fonts)
        .pipe(gulp.dest(config.build + 'fonts'));
});

gulp.task('images', ['clean-images'], function () {
    log('Copying and compressing images');

    return gulp
        .src(config.images)
        .pipe($.imagemin({ optimizationLevel: 4 }))
        .pipe(gulp.dest(config.build + 'images'));
});

gulp.task('clean', function (done) {
    var delconfig = [].concat(config.build, config.temp);
    log('Cleaning: ' + $.util.colors.blue(delconfig));
    return del(delconfig);
});

gulp.task('clean-fonts', function (done) {
    return clean(config.build + 'fonts/**/*.*');
});

gulp.task('clean-images', function (done) {
    return clean(config.build + 'images/**/*.*');
});

gulp.task('clean-styles', function (done) {
    return clean(config.temp + '**/*.css');
});

gulp.task('clean-code', function (done) {
    var files = [].concat(
        config.temp + '**/*.js',
        config.build + '**/*.html',
        config.build + 'js/**/*.js'
    );
    return clean(files);
});

gulp.task('templatecache', ['clean-code'], function () {
    log('Creating AngularJS $templaceCache');

    return gulp
        .src(config.htmltemplates)
        .pipe($.minifyHtml({ empty: true }))
        .pipe($.angularTemplatecache(
            config.templateCache.file,
            config.templateCache.options))
        .pipe(gulp.dest(config.temp));
});

gulp.task('less-watcher', function () {
    gulp.watch([config.less], ['styles']);
});

gulp.task('wiredep', function () {
    log('Wire up the bower css js and app js into the html');

    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.js), { ignorePath: 'client', addRootSlash: false }))
        .pipe(gulp.dest(config.client));
});

gulp.task('inject', ['wiredep', 'styles', 'templatecache'], function () {
    log('Wire up the app css into the html, and call wiredep');

    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src(config.css)))
        .pipe(gulp.dest(config.client));
});

gulp.task('build', ['optimize', 'images', 'fonts'], function () {
    log('Building everything');

    var msg = {
        title: 'gulp build',
        subtitle: 'Deployed to the build folder',
        message: 'Running `gulp serve-build`'
    };
    del(config.temp);
    log(msg);
    notify(msg);
});

gulp.task('serve-specs',['build-specs'], function (done) {
    log('run the spec runner');
    serve(true /* isDev */, true /* specRunner */);
    done();
});

gulp.task('build-specs', ['templatecache'], function () {
    log('building spec runner');

    var wiredep = require('wiredep').stream;
    var options = config.getWiredepDefaultOptions();
    
    options.devDependencies = true;

    return gulp
        .src(config.specRunner)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.testlibraries, { read: false }),
            { starttag: '<!-- inject:testlibraries:js -->' }))
        .pipe($.inject(gulp.src(config.js)))
        .pipe($.inject(gulp.src(config.specHelpers, { read: false}),
            { starttag: '<!-- inject:spechelpers:js -->' }))
        .pipe($.inject(gulp.src(config.specs, { read: false}),
            { starttag: '<!-- inject:specs:js -->' }))
        .pipe($.inject(gulp.src(config.temp + config.templateCache.file, { read: false }),
            { starttag: '<!-- inject:templates:js -->' }))
        .pipe(gulp.dest(config.client));
    
   
});

gulp.task('optimize', ['inject'/*, 'test' */], function () {
    log('Optimizing the javascript, css, html');

    var templateCache = config.temp + config.templateCache.file;
    var cssFilter = $.filter('**/*.css', { restore: true });
    var jsLibFilter = $.filter('**/' + config.optimized.lib, { restore: true });
    var jsAppFilter = $.filter('**/' + config.optimized.app, { restore: true });
    var indexHtmlFilter = $.filter(['**/*', '!**/index.html'], { restore: true });

    return gulp
        .src(config.index)
        .pipe($.plumber())
        .pipe($.inject(gulp.src(templateCache, { read: false }), {
            starttag: '<!-- inject:templates:js -->'
        }))
        .pipe($.useref({ searchPath: ['', '.tmp', 'client'] }))
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore)
        .pipe(jsLibFilter)
        .pipe($.uglify())
        .pipe(jsLibFilter.restore)
        .pipe(jsAppFilter)
        .pipe($.ngAnnotate())
        .pipe($.uglify())
        .pipe(jsAppFilter.restore)
        .pipe(indexHtmlFilter)
        .pipe($.rev())
        .pipe(indexHtmlFilter.restore)
        .pipe($.revReplace())
        .pipe($.debug())
        .pipe(gulp.dest(config.build));
});

/**
 *  Bump the version
 *  --type=pre will bump the prerelase version *.*.*-x
 *  --type=patch or no flag will bump the patch version *.*.x
 *  --type=minor will bump the minor version *.x.*
 *  --type=major will bump the major version x.*.*
 *  --version=1.2.3 will bump to a specific version and ignore other flags
 */
gulp.task('bump', function () {
    var msg = 'Bumping versions';
    var type = args.type;
    var version = args.version;
    var options = {};
    if (version) {
        options.version = version;
        msg += ' to ' + version;
    } else {
        options.type = type;
        msg += ' for a ' + type;
    }
    log(msg);
    return gulp
        .src(config.packages)
        .pipe($.bump(options))
        .pipe(gulp.dest(config.root));
});

gulp.task('serve-build', ['build'], function () {
    serve(false /* isDev */);
});

gulp.task('serve-dev', ['inject'], function () {
    serve(true /* isDev */);
});

gulp.task('test', ['vet', 'templatecache'], function (done) {
    startTests(true /* singleRun */, done);
});

gulp.task('autotest', ['vet', 'templatecache'], function (done) {
    startTests(false /* singleRun */, done);
});
//////////

function serve(isDev, specRunner) {
    var nodeOptions = {
        script: config.nodeServer,
        delayTime: 1,
        env: {
            'PORT': port,
            'NODE_ENV': isDev ? 'dev' : 'production'
        },
        watch: [config.server, 'app.js']
    };

    return $.nodemon(nodeOptions)
        .on('restart', function (ev) {
            log('*** nodemon restarted');
            log('files changed on restart: \n' + ev);
            setTimeout(function () {
                browserSync.notify('reloading now ...');
                browserSync.reload({ stream: false });
            }, config.browserReloadDelay);
        })
        .on('start', function () {
            log('*** nodemon started');
            startBrowserSync(isDev, specRunner);
        })
        .on('crash', function () {
            log('*** nodemon crashed: script crashed for some reason');
        })
        .on('exit', function () {
            log('*** nodemon exited cleanly');
        });
}


function changeEvent(event) {
    var srcPattern = new RegExp('/.*(?=/' + config.source + ')');
    log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}

function notify(options) {
    var notifier = require('node-notifier');
    var notifyOptions = {
        sound: 'Bottle',
        contentImage: path.join(__dirname, 'gulp.png'),
        icon: path.join(__dirname, 'gulp.png')
    };
    _.assign(notifyOptions, options);
    notifier.notify(notifyOptions);
}

function startBrowserSync(isDev, specRunner) {
    if (browserSync.active) {
        return;
    }

    log('Starting browser-sync on port ' + port);

    if (isDev) {
        gulp.watch([config.less], ['styles'])
            .on('change', function (event) { changeEvent(event); });
    } else {
        gulp.watch([config.less, config.js, config.html], ['optimize', browserSync.reload])
            .on('change', function (event) { changeEvent(event); });
    }

    var options = {
        proxy: 'localhost:' + port,
        port: 3000,
        files: isDev ? [
            config.client + '**/*.*',
            '!client/stylesheets/styles.less',
            config.temp + '**/*.css'
        ] : [],
        ghostMode: {
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 0 //1000
    };

    if (specRunner) {
        options.startPath = config.specRunnerFile;
    }

    browserSync(options);
}

function startTests(singleRun, done) {
    var karma = require('karma').server;
    var excludeFiles = [];

    karma.start({
        configFile: __dirname + '/karma.conf.js',
        exclude: excludeFiles,
        singleRun: !!singleRun
    }, karmaCompleted());

    function karmaCompleted(karmaResult) {
        log('Karma completed!');
        if (karmaResult === 1) {
            done('karma: tests failed with code ' + karmaResult);
        } else {
            done();
        }
    }
}

function clean(path) {
    log('Cleaning: ' + $.util.colors.blue(path));
    return del(path);
}

function log(msg) {
    if (typeof (msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}