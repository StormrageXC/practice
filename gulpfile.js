const gulp = require('gulp');
sourcemaps = require('gulp-sourcemaps'),
    babels = require('gulp-babel'),
    watch = require('gulp-watch');
concat = require('gulp-concat'),
    gulp.task('default', () => {
        console.log(gulp.src('react-app/*.jsx'));
        return gulp.src('react-app/*.jsx')
            .pipe(sourcemaps.init())
            .pipe(babels({
                presets: ['@babel/preset-env', '@babel/preset-react']
            }))
            .pipe(concat('all.js'))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('dist'));
    })
gulp.watch(['react-app/*.jsx'], gulp.task('default'));