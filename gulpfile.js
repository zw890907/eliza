const gulp = require('gulp'),
      uglify = require('gulp-uglify'),
      minifyCss = require('gulp-minify-css'),
      gulpSass = require('gulp-sass'),
      htmlmin = require('gulp-htmlmin'),
      babel = require('gulp-babel'),
      connect = require('gulp-connect');

//制定任务
// gulp.task('default',() => {
//     //制定了一个default任务，这个任务干的事情就是打印default
//     console.log("default");
// })
//制定一个压缩css任务(先将scss编译成css，再对css进行压缩)
gulp.task('css',() => {
    //src获取源文件
    gulp.src('src/css/**/*.scss')
        //pipe管道（文件传输的过程，可以在过程中对文件处理）
        .pipe(gulpSass())
        .pipe(minifyCss())
        //dext destination 目的地，管道里处理完成以后放到目标文件夹里
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload());
})
//制定压缩html文件
gulp.task('html',() => {
    gulp.src('src/**/*.html')
        .pipe(htmlmin({
            removeComments: true,//清除HTML注释
            collapseWhitespace: true,//压缩HTML
            collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
            removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: false,//删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true//删除<style>和<link>的type="text/css"
        }))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
})
//制定js压缩任务
gulp.task('js',() => {
    //所有js代码取出来，将ES6转为ES5 babel
    gulp.src('src/js/**/*.js')
        // .pipe(babel({
        //     presets: ['@babel/env']
        // }))
        // .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
})
//制定libs转移任务
gulp.task('libs', () => {
    // libs里面的所有文件原封不动的移动到dist里
    gulp.src('src/libs/**/*')
        .pipe(gulp.dest('dist/libs'));
  })
// 制定images任务
gulp.task('images', () => {
    // images里面的所有文件原封不动的移动到dist里
    gulp.src('src/images/**/*')
        .pipe(gulp.dest('dist/images'));
  })
// 制定一个开启服务器的任务
gulp.task('server', () => {
    connect.server({
      root: "dist",
      port: 1125,
      livereload: true // 支持热更新
    });
  })
// 制定一个监听任务
gulp.task('watch', () => {
    // 监听所有html文件的修改，一旦被修改了 html任务就会被执行
    gulp.watch('src/**/*.html', ['html']);
    // 监听所有js文件的修改，一旦被修改了 js任务就会被执行
    gulp.watch('src/js/**/*.js', ['js']);
    // 监听所有css文件的修改，一旦被修改了 css任务就会被执行
    gulp.watch('src/css/**/*.scss', ['css']);
  })
  
  
// 把任务集中执行
gulp.task('default', ["html", "css", "js", "libs", "images","server","watch"]);



