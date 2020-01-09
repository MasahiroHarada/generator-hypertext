/**
 * 画面ロード時に処理を実行する
 * @param {Function} callback コールバック
 */
export default function(callback) {
  document.addEventListener('DOMContentLoaded', callback);
}
