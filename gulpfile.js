const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('css', function () {
   gulp.src('css/sass/*.scss')
       .pipe(sass())
       .pipe(autoprefixer())
       .pipe(gulp.dest('css/'));
});

gulp.task('default',['css']);

