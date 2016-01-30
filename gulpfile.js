var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

// Load all gulp plugins listed in package.json
var gulpPlugins = require('gulp-load-plugins')({
    DEBUG: true,
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/ // what to remove from the name of the module when including it
});

//For debugging in development purposes
gulp.task('browserify', function() {
    // Grabs the app.js file
    return browserify('./public/javascripts/angularApp.js')
    // bundles it and creates a file called main.js
        .bundle()
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('main.js'))
        // Start piping stream to tasks and save it the public/js/ directory
        .pipe(gulp.dest('./public/dist/javascripts'));
});

gulp.task('browserify-and-minify', function () {
    return browserify('./public/javascripts/angularApp.js')
        .bundle()
        .pipe(source('main.min.js'))
        .pipe(gulpPlugins.streamify(gulpPlugins.sourcemaps.init({loadMaps: true}))) // loads map from browserify file
        .pipe(gulpPlugins.streamify(gulpPlugins.uglify({mangle: false})))
        .pipe(gulpPlugins.streamify(gulpPlugins.sourcemaps.write('./'))) // writes .map file
        .pipe(gulp.dest('./public/dist/javascripts'));
});

gulp.task('compile-sass', function(){
    return gulp.src('./public/stylesheets/*.scss')
        .pipe(gulpPlugins.sass())
        .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('concatenate-and-minify-css', ['compile-sass'], function(){
    return gulp.src('./public/stylesheets/*.css')
        .pipe(gulpPlugins.plumber(function (error) {
            gulpPlugins.gutil.log(error.message);
            this.emit('end');
        })) //For error handling
        .pipe(gulpPlugins.sourcemaps.init())
        .pipe(gulpPlugins.concat('app.css'))
        .pipe(gulp.dest('./public/dist/stylesheets'))
        .pipe(gulpPlugins.rename('app.min.css')) //Error is here!
        .pipe(gulpPlugins.uglify())
        .pipe(gulpPlugins.sourcemaps.write('./'))
        .pipe(gulp.dest('./public/dist/stylesheets'));
});

gulp.task('build-styles', ['concatenate-and-minify-css']);

//watch task which tells Gulp to watch every .js file in any subdirectory inside /javascripts
gulp.task('watch-javascript', function() {
    gulp.watch('./public/javascripts/**/*.js', ['browserify-and-minify'])
});

//watch task which tells Gulp to watch every .scss file in inside /stylesheets
gulp.task('watch-styles', function() {
    gulp.watch('./public/stylesheets/*.scss', ['build-styles'])
});

gulp.task('watch', ['watch-javascript', 'watch-styles']);

gulp.task('build', ['browserify-and-minify', 'watch']);

// Sample task to run to check debug statements
gulp.task('console', function() {
    console.log("gulp at it's finest");
});

gulp.task('default', ['build']);