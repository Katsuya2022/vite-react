/**
 * 文字列と指定文字数を受け取り、指定文字数を超える場合は
 * 指定文字数までの文字列に"..."を付けて返却する
 * @param {string} str 変換する文字列
 * @param {number} length 表示する文字数
 * @returns 
 */
export const truncateText = (str, length) => {
  return str.length > length ? str.slice(0, length) + "..." : str;
};