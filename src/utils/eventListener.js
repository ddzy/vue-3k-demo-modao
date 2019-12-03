/**
 * @name _eventListener
 * @description 事件绑定器
 * @author ddzy
 * @since 2019/12/3
 */
const _eventListener = {
	listen(target, type, callback) {
		if (target.addEventListener) {
			target.addEventListener(type, callback, false)

			return {
				unlisten() {
					target.removeEventListener(type, callback, false)
				}
			}
		} else if (target.attachEvent) {
			target.attachEvent('on' + type, callback)

			return {
				unlisten() {
					target.detachEvent(`on${type}`, callback)
				}
			}
		}
	}
}

export default _eventListener
