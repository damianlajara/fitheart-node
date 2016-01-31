// Require all of our dependencies
var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    nodemon = require('gulp-nodemon'),
    path = require('path');
    del = require('del');

// Load all gulp plugins listed in package.json
var gulpPlugins = require('gulp-load-plugins')({
    DEBUG: true,
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/ // what to remove from the name of the module when including it
});

// An object to keep our code DRY by keeping all of the paths in once place
var paths = {
    root: './app/',
    current: './',
    // This object holds all the assets for development
    dev: {
        assets_root: './public/assets/src/',
        images: './public/assets/src/images/',
        javascript: './public/assets/src/javascripts/',
        styles: './public/assets/src/stylesheets/'
    },
    // This object holds all the assets for production
    dist: {
        assets_root: './public/assets/dist/',
        images: './public/assets/dist/images/',
        javascript: './public/assets/dist/javascripts/',
        styles: './public/assets/dist/stylesheets/'
    }
};

// An object to keep our code DRY by keeping all of the simple file extensions with globs in once place
var globFileTypes = {
    sass: '*.scss',
    css: '*.css',
    js: '*.js'
};

// Error function for plumber 
var onError = function (error) { 
    gulpPlugins.util.beep(); 
    gulpPlugins.util.log(error.message); 
    this.emit('end');
 };

// Delete every js file (along with any sourcemap .map files) in the javascripts dist directory
gulp.task('clean-dist-js', function () { 
    del.sync([paths.dist.javascript + '*']);
});

// Delete every css file (along with any sourcemap .map files) in the stylesheet dist directory
gulp.task('clean-dist-css', function () {
    del.sync([paths.dist.styles + '*']);
});

// Delete every js and css file (along with any sourcemap .map files) in the dist directory
gulp.task('clean', ['clean-dist-js', 'clean-dist-css'], function () {
    del.sync([paths.dist.styles + '*']);
});

// Note: This runs the clean-dist-js task as a dependant, so it can overwrite (delete) any previous outdated files
// For debugging in development purposes (Same as browserify-and-minify but without minification for debugging)
gulp.task('browserify', ['clean-dist-js'], function() {
    // Grabs the app.js file
    return browserify(paths.dev.javascript + 'angularApp.js')
        // bundles it and creates a file called main.js
        .bundle()
        .pipe(gulpPlugins.plumber(onError)) //For error handling
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('main.js'))
        // Start piping stream to tasks and save it the public/js/ directory
        .pipe(gulp.dest(paths.dist.javascript));
});

// Note: This runs the clean-dist-js task as a dependant, so it can overwrite (delete) any previous outdated files
// Looks at the entry point (angularApp.js file in the paths.dev.javascript directory
// and recursively requires all the files that are required in that file and then bundles it all into one file
// which can then be required in the main view (index.html) and sent to the browser in a script tag)
gulp.task('browserify-and-minify', ['clean-dist-js'], function () {
    return browserify(paths.dev.javascript + 'angularApp.js')
        .bundle()
        .pipe(gulpPlugins.plumber(onError)) //For error handling
        .pipe(source('main.min.js'))
        .pipe(gulpPlugins.streamify(gulpPlugins.sourcemaps.init({loadMaps: true}))) // loads map from browserify file
        .pipe(gulpPlugins.streamify(gulpPlugins.uglify({mangle: false})))
        .pipe(gulpPlugins.streamify(gulpPlugins.sourcemaps.write(paths.current))) // writes .map file
        .pipe(gulp.dest(paths.dist.javascript));
});

// Looks at every .scss file and compiles it to .css and stores it in the paths.dev.styles directory
gulp.task('compile-sass', function(){
    return gulp.src(paths.dev.styles + globFileTypes.sass)
        .pipe(gulpPlugins.plumber(onError)) //For error handling
        .pipe(gulpPlugins.sass())
        .pipe(gulp.dest(paths.dev.styles));
});

// Note: This runs the compile-sass task as a dependant to make sure that there are not more .scss files before we concatenate them
// as well as clean-dist-css task as a dependant, so it can overwrite (delete) any previous outdated files
// Looks at every compiled .scss file in paths.dev.styles and concatenates them all to app.css,
// It then minifies it to app.min.css and stores it in the paths.dist.styles directory
gulp.task('concatenate-and-minify-css', ['compile-sass', 'clean-dist-css'], function(){
    return gulp.src(paths.dev.styles + globFileTypes.css)
        .pipe(gulpPlugins.plumber(onError)) //For error handling
        .pipe(gulpPlugins.sourcemaps.init())
        .pipe(gulpPlugins.concat('app.css'))
        .pipe(gulp.dest(paths.dist.styles))
        .pipe(gulpPlugins.rename({suffix: '.min'}))
        .pipe(gulpPlugins.minifyCss())
        .pipe(gulpPlugins.sourcemaps.write(paths.current))
        .pipe(gulp.dest(paths.dist.styles));
});

// An easier way to access the concatenate-and-minify-css task, which has more semantic reasoning
gulp.task('build-styles', ['concatenate-and-minify-css']);

// watch task which tells Gulp to watch every .js file in any subdirectory inside /javascripts
gulp.task('watch-javascript', function() {
    gulp.watch(paths.dev.javascript + '**/' + globFileTypes.js, ['browserify-and-minify'])
});

// watch task which tells Gulp to watch every .scss file in inside /stylesheets
gulp.task('watch-styles', function() {
    gulp.watch(paths.dev.styles + globFileTypes.sass, ['build-styles'])
});

// The Main watch task, which watches all of our js and sass files for any changes
gulp.task('watch', ['watch-javascript', 'watch-styles'], function() {
    console.log("Watching js and scss files!");
});

// Sample task to run to check debug statements (Make sure DEBUG is set to true in gulpPlugins
gulp.task('console', function() {
    console.log("gulp at it's finest");
});

// NOTE: Make sure to create a vendor directory right under the public directory for this task to work
// Uncomment this task if you choose to use bower alongside npm
// Concatenate and minify all bower modules separated by asset type in the vendor directory
//gulp.task('build-bower-dependencies', function(){
//
//    del([
//        './public/vendor/**'
//    ], function(){
//
//        var jsFilter = gulpPlugins.gulpFilter('**/*.js'),
//            cssFilter = gulpPlugins.gulpFilter('**/*.css');
//
//        gulp.src(gulpPlugins.mainBowerFiles(), { base: 'bower_components' })
//            .pipe(gulpPlugins.plumber(onError)) //For error handling
//            .pipe(gulpPlugins.bowerNormalizer({ bowerJson: './bower.json' }))
//            .pipe(jsFilter)
//            .pipe(gulpPlugins.uglify())
//            .pipe(jsFilter.restore())
//            .pipe(cssFilter)
//            .pipe(gulpPlugins.minifyCSS())
//            .pipe(cssFilter.restore())
//            .pipe(gulp.dest('./public/vendor'));
//
//    });
//
//});

gulp.task('start-server', function () {
    nodemon({
        script: 'server.js',
        ext: 'html js',
        env: { 'NODE_ENV': 'development' },
        tasks: []
    }).on('start', function () {
        console.log('Starting up the server!')
    }).on('restart', function () {
        console.log('Server has restarted to reflect changes!')
    }).on('crash', function () {
        console.log('OH NO! Something when wrong and the server crashed!')
    }).on('exit', function () {
        console.log('Goodbye! Server is shutting down')
    })
});


// Main task -> Runs all of the tasks except for the watchers
gulp.task('build', ['browserify-and-minify', 'build-styles'/*, 'build-bower-dependencies'*/]);

// An easier way to run the main task -> simply type 'gulp' on the command line
gulp.task('default', ['build', 'start-server']);

// TODO: Remove main.css, app.css and any other compiled css file from the stylesheets directory. All of the compiled versions should go in dist!