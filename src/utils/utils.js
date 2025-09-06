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

/**
 * 文字列の前後から半角・全角スペースを除去する
 * @param {string} str 対象の文字列
 * @returns {string} スペースを除去した文字列
 */
export const trimSpaces = (str) => {
  return str.replace(/^[\s　]+|[\s　]+$/g, "");
};