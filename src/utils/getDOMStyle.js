/**
 * @name _getDOMStyle
 * @description 获取 DOM 元素完整的样式
 * @author ddzy
 * @since 2019/12/5
 * @param {HTMLElement} el - 源 DOM 元素
 * @returns {string} 返回获取到的样式字符串
 */
function _getDOMStyle(el) {
	let result = ''

	if (window.getComputedStyle) {
		result = window.getComputedStyle(el, null)
	} else {
		result = el.currentStyle
	}

	return result
}

export default _getDOMStyle
