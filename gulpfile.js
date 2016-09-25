
var gulp    = require('gulp');
var gutil   = require('gulp-util');
var compass = require('gulp-compass');
var concat  = require('gulp-concat');
var jade    = require('gulp-jade');
var uglify  = require('gulp-uglify');

gulp.task('sass', function () {
    return gulp.src('src/scss/dist/main.scss')
               .pipe(compass({ css: 'dist/css', sass: 'src/sass/dist', config_file: './compass.rb' }).on('error', gutil.log))
               .pipe(gulp.dest('dist/css'));
});

gulp.task('js', function () {
    return gulp.src('src/js/**/*.js')
               .pipe(concat('main.min.js'))
               .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
               .pipe(gulp.dest('dist/js'));
});

gulp.task('jade', function () {
    return gulp.src('src/jade/index.jade')
               .pipe(jade({ locals: require('./data.json') }).on('error', gutil.log))
               .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('src/jade/**/*.jade', ['jade']);
});

gulp.task('default', ['sass', 'js', 'jade', 'watch']);
