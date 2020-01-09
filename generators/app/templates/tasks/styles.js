import gulp from 'gulp';
import gulpStylelint from 'gulp-stylelint';

export function stylelint() {
  return gulp
    .src('src/sass/**/*.scss')
    .pipe(gulpStylelint({
      failAfterError: false,
      reporters: [{ formatter: 'verbose', console: true }],
      syntax: 'scss',
    }));
}
