const gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    babels = require('gulp-babel'),
    concat = require('gulp-concat');
gulp.task('default', () => {
    return gulp.src('react-app/*.jsx')
        .pipe(sourcemaps.init())
        .pipe(babels({
            presets: ['@babel/preset-env', '@babel/preset-react']
        }))
        .pipe(concat('all.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
})