/**
 * @name _getPxFromStr
 * @description 获取字符串所占的像素大小
 * @author ddzy
 * @since 2019/12/5
 * @param {string} text - 源字符串
 * @returns {number} 返回像素值
 */
function _getPxFromStr(text) {
  let result = 0;

  const $span = document.createElement('span')
  $span.innerText = text
  document.body.appendChild($span);
  result = $span.offsetWidth;
  document.body.removeChild($span);

  return result;
}

export default _getPxFromStr
