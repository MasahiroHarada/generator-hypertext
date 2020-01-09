import fs from 'fs';
import path from 'path';
import gulp from 'gulp';
import gulpEjs from 'gulp-ejs';
import gulpPrettier from 'gulp-prettier';
import gulpIf from 'gulp-if';
import gulpCached from 'gulp-cached';
import gulpReplace from 'gulp-replace';

const config = require('../config.js');
const baseUrl = getBaseUrl(config);

/**
 * EJS -> HTML
 */
export function ejs() {
  return transform({ cache: true });
}

/**
 * EJS -> HTML（キャッシュなし）
 * "_" から始まる部品ファイル用
 */
export function ejsAll() {
  return transform({ cache: false });
}

/**
 * EJS -> HTML 実行
 */
function transform({ cache }) {
  // ページ用データ
  const jsonFilePath = path.join(__dirname, '../src/template/data.json');
  const json = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

  // ヘルパー関数
  const functions = require('../src/template/functions');

  const data = Object.assign(
    {},
    json,
    functions.default
  );

  return gulp
    .src(['src/template/**/*.ejs', '!src/template/**/_*.ejs'])
    .pipe(gulpIf(cache, gulpCached('ejs')))
    .pipe(gulpEjs(data, {}, { ext: '.html' }))
    .pipe(
      gulpIf(
        !!baseUrl,
        gulpReplace(/(href|src)=["']{1}\/(.*)["']{1}/g, `$1="${baseUrl}$2"`)
      )
    )
    .pipe(gulpPrettier())
    .pipe(gulp.dest('dist'));
}

/**
 * 環境を考慮してbaseUrl設定値を取得する
 * @param {object} config 設定情報
 * @returns {string} baseUrl設定値
 */
function getBaseUrl(config) {
  const defaultBase = config.default.baseUrl || false;
  const envConfig = config[process.env.NODE_ENV];
  if (typeof envConfig === 'undefined') {
    return defaultBase;
  }
  return envConfig.baseUrl || defaultBase;
}
