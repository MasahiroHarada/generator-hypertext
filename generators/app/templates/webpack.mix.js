const mix = require('laravel-mix');

mix
  .setPublicPath('dist/')
  .js('src/js/app.js', 'dist/js')
  .sass('src/sass/app.scss', 'dist/css')
  .copy('src/images', 'dist/images')
;
