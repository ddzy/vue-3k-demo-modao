/**
 * @name _isParentDOM
 * @description 判断 DOM 元素 a 是否包含另一个 DOM 元素 b
 * @author ddzy
 * @since 2019/12/3
 * @param a 主动 DOM 元素
 * @param b 被动 DOM 元素
 */
export default function _isParentDOM(a, b) {
	// IE
	if (a.contains) {
		return a.contains(b)
	} else if (a.compareDocumentPosition) {
		// W3C
		return a.compareDocumentPosition(b) === 16
	} else {
		let parentNode
		while ((parentNode = b.parentNode)) {
			if (parentNode === a) {
				return true
			}
		}

		return false
	}
}
