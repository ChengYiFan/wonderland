/**
 * querystring（查询字符串）http://nodejs.cn/api/querystring.html
 * querystring.decode()
 * querystring.encode()
 * querystring.escape(str)
 * querystring.parse(str[, sep[, eq[, options]]])
 * querystring.stringify(obj[, sep[, eq[, options]]])
 * querystring.unescape(str)} url 
 */


/**
 * querystring.parse(str[, sep[, eq[, options]]])
 * str <string> 要解析的 URL 查询字符串。
 * sep <string> 用于在查询字符串中分隔键值对的子字符串。默认值: '&'。
 * eq <string> 用于在查询字符串中分隔键和值的子字符串。默认值: '='。
 * options <Object>
 *   decodeURIComponent <Function> 当解码查询字符串中的百分比编码字符时使用的函数。默认值: querystring.unescape()。
 *   maxKeys <number> 指定要解析的键的最大数量。指定 0 可移除键的计数限制。默认值: 1000。
 * querystring.parse() 方法将 URL 查询字符串 str 解析为键值对的集合。
 * 例如，查询字符串 'foo=bar&abc=xyz&abc=123' 会被解析为：
 * {
 *   foo: 'bar',
 *   abc: ['xyz', '123']
 * }
 */

const queryString = {
  parser: function (str) {
    if (str === '' || str === null || typeof str === 'undefined') {
      return {};
    }
    const result = {};
    const reg = /([^&]+)=([^&]*)/g;
    let m;
    while(m = reg.exec(str)) {
      const key = decodeURIComponent(m[1]);
      const value = decodeURIComponent(m[2]);
      const rkey = result[key];
      if (rkey) {
        if (Array.isArray(rkey)) {
          result[key].push(value);
        } else {
          result[key] = [rkey, value];
        }
      } else {
        result[key] = value;
      }
    }
    return result;
  },
  stringify: function() {

  },
}