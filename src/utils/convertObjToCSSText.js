/**
 * @name _convertObjToCSSText
 * @description 将给定的 CSS 键值对对象转为字符串形式
 * @author ddzy
 * @since 2019/12/4
 * @param {object} obj - 需要转化的 CSS 键值对对象
 * @returns {string} 返回转化后的字符串
 */
function _convertObjToCSSText(obj) {
	let result = ''

	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			const value = obj[key]

			result += `${key}: ${value};`
		}
	}

	return result
}

export default _convertObjToCSSText