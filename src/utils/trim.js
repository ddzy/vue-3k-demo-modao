/**
 * @name _trim
 * @description 去除给定字符串首尾的空格
 * @author ddzy
 * @since 2019/12/5
 * @param {string} text - 源字符串
 * @returns {string} 返回转化后的字符串
 */
function _trim(text) {
	let result = ''

	if (text.trim) {
		result = text.trim()
	} else {
		const RegExp_space = /(^\s+)|(\s+$)/g

		result = text.replace(RegExp_space, '')
	}

	return result
}

export default _trim
