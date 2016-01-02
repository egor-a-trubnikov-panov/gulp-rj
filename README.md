Gulp RJ
=======
react-jade for gulp

## Installation:
`npm i gulp-rj`

## Usage

```
  var gulp = require('gulp');
  var gulprj = require('gulp-rj');
  
  
  gulp.task('default', function () {
  	return gulp.src('./template/*.jade')
  		.pipe(gulprj())
  		.pipe(gulp.dest('./dist/'));
  });

```          

## License
MIT