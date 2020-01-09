import { parallel, series } from 'gulp';
import { serve } from './tasks/server';
import { ejs } from './tasks/ejs';
import { bundle } from './tasks/bundle';
import { stylelint } from './tasks/styles';
import { clear } from './tasks/clear';
import { watchFiles } from './tasks/watch';

export const dev = series(
  clear,
  parallel(ejs, stylelint, bundle),
  serve,
  watchFiles
);

export const build = series(
  clear,
  parallel(ejs, stylelint, bundle)
);
