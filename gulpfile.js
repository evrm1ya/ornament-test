
var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var notifier = require('node-notifier');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var server = require('gulp-server-livereload');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

// returns an error message for notifier to display 
function notify(error) {
  var title = 'Error: ';
  var message = 'In: ';

  if(error.description) {
    title += error.descripton;
  }
  else if(error.message) {
    message += error.message;
  }

  if(error.filename) {
    var splitPath = error.filename.split('/');
    message += splitPath[splitPath.length - 1];
  }

  if(error.lineNumber) {
    message += '\nOn line ' + error.lineNumber; 
  }

  if(error.column) {
    message += ':' + error.column;
  }

  notifier.notify({title: title, message: message});
}

// specify browserify options
// transform jsx to js
var browserifyOpts = {
  entries: ['./src/app.jsx'],
  transform: [reactify],
  extensions: ['.jsx'],
  debug: true,
  cache: {},
  packageCache: {},
  fullPaths: true,
  plugin: [watchify]
};

// browserify obj
var bundler = browserify(browserifyOpts);

// bundle dev-code in ./main.js
function bundle() {
  return bundler
    .bundle()
    .on('error', notify)
    .pipe(source('main.js'))
    .pipe(gulp.dest('./'))
}
// every time bundler updates call bundle()
bundler.on('update', bundle);

// init bundle
gulp.task('build', function() {
  bundle()
});

// gulp task to minify main.js for production
gulp.task('minify', function() {
  gulp.src('./main.js')
    .pipe(rename('bundle.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'))
});

// dev server
gulp.task('serve', function() {
  gulp.src('')
    .pipe(server({
      livereload: {
        enable: true,
        filter: function(filePath, cb) {
          if(/main.js/.test(filePath)) {
            cb(true)
          } else if(/style.css/.test(filePath)){
            cb(true)
          }   
        }
      },
      open: false
    }));
});

// SASSy-ness
var sassquatch = gulp.watch('sass/**/*.scss', ['sass']);

// log scss file additions/changes
sassquatch.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});

gulp.task('sass', function () {
  gulp.src('sass/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(concat('style.css'))
  .pipe(gulp.dest('./'));
});
 
// gulp in console
gulp.task('default', ['build', 'serve', 'sass']);
