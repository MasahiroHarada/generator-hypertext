import { watch, series } from 'gulp';
import { reload } from './server';
import { ejs } from './ejs';
import { bundle } from './bundle';
import { stylelint } from './styles';

/**
 * ファイルの変更を監視
 */
export function watchFiles(cb) {
  watch(['src/template/**/**.*'], series(ejs, reload));
  watch('src/sass/**/**.scss', series(stylelint, bundle, reload));
  watch(
    ['src/js/**/**.js', 'src/images/**/*.*', 'src/fonts/**/*.*'],
    series(bundle, reload)
  );

  cb();
}
