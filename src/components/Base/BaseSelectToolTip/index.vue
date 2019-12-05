<template>
	<div id="cBaseSelectToolTip">
		<div class="tooltip-wrapper">
			<!-- 切换区 -->
			<div class="tooltip-trigger-box" ref="trigger">
				<slot name="trigger"></slot>
			</div>

			<!-- 弹出层区 -->
			<div class="tooltip-modal-box" ref="tooltip" v-if="isVisible">
				<div class="tooltip-modal-content">
					<ul class="tooltip-main-content-list">
						<li
							class="tooltip-main-content-item"
							:key="i"
							@click="onTooltipItemClick(v)"
							v-for="(v, i) in dataSource"
						>
							{{ v }}
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import _eventListener from '@/utils/eventListener'
import _isParentDOM from '@/utils/isParentDOM'
import _convertObjToCSSText from '@/utils/convertObjToCSSText'
import _trim from '@/utils/trim'

export default {
	props: {
		// 可选项列表
		dataSource: {
			type: Array,
			default: () => []
		},
		trigger: {
			type: String,
			default: 'click'
		},
		placement: {
			type: String,
			default: 'auto'
		},
		currentValue: {
			type: String
		}
	},
	data() {
		return {
			// 是否显示弹出框
			isVisible: false,
			// 弹出框出现的位置
			position: {
				left: 0,
				top: 0
			},
			// 触发的事件句柄
			mouseEnterEventHandler: null,
			mouseLeaveEventHandler: null,
			clickEventHandler: null,
			// 基准 DOM 元素的信息, 根据该信息来计算弹出框的位置
			relativeFieldObj: {
				dom: document.createElement('div'),
				index: 0
			}
		}
	},
	watch: {
		isVisible() {
			this.$nextTick(() => {
				const $trigger = this.$refs.trigger
				const $tooltip = this.$refs.tooltip

				if ($trigger && $tooltip) {
					const $currentValueList = $tooltip.querySelectorAll(
						'.tooltip-main-content-item'
					)
					// 当前输入框的值, 也就是上次选中的值
					const currentSelectedValue = this.currentValue

					for (const [i, v] of $currentValueList.entries()) {
						const pendingSelectValue = _trim(v.innerText)

						if (pendingSelectValue === currentSelectedValue) {
							this.relativeFieldObj.dom = v
							this.relativeFieldObj.index = i

							break
						}
					}

					// TODO: 计算弹出层位置 & 弹出层列表项的样式信息
					const $relativeDOM = this.relativeFieldObj.dom
					const relativeDOMCurrentHeight = $relativeDOM.clientHeight
					const relativeDOMPosition = this.relativeFieldObj.index

					const tooltipStyleObj = {
						top: `-${relativeDOMCurrentHeight * relativeDOMPosition}px`
					}
					const convertedTooltipStyleText = _convertObjToCSSText(
						tooltipStyleObj
					)

					// 设置弹出层整体的位置
					$tooltip.style.cssText += convertedTooltipStyleText
					// 设置弹出层内部被默认选中的项的样式
					// 要在弹出层关闭时移除该样式
					$relativeDOM.classList.add('tooltip-default-selected')
				}
			})
		}
	},
	methods: {
		onToggleVisible() {
			this.isVisible = !this.isVisible
		},
		onClose() {
			this.isVisible = false
		},
		onOpen() {
			this.isVisible = true
		},
		/**
		 * 初始化弹出层的触发事件句柄
		 */
		onInitEventHandler() {
			let $trigger = this.$refs.trigger.children[0]

			switch (this.trigger) {
				case 'click': {
					this.clickEventHandler = _eventListener.listen(
						document,
						this.trigger,
						e => {
							let $target = e.target

							// TODO: 忽略输入框, 输入框是改变值的另一个途径
							if ($target.classList.contains('value-show') && $target.tagName === 'INPUT') {
								this.onClose()
							} else if (
								$target === $trigger ||
								_isParentDOM($trigger, $target)
							) {
								this.onOpen()
							} else {
								// TODO: 点击空白区域关闭弹框
								this.onClose()
							}
						}
					)

					break
				}
				case 'hover': {
					this.mouseEnterEventHandler = _eventListener.listen(
						$trigger,
						'mouseenter',
						() => {
							this.onOpen()
						}
					)
					this.mouseLeaveEventHandler = _eventListener.listen(
						$trigger,
						'mouseleave',
						() => {
							this.onClose()
						}
					)

					break
				}
				default: {
					this.clickEventHandler = _eventListener.listen(
						$trigger,
						this.trigger,
						() => {
							this.onToggleVisible()
						}
					)

					break
				}
			}
		},
		/**
		 * tooltip 列表项的点击
		 */
		onTooltipItemClick(v) {
			this.$emit('onChange', v)
		}
	},
	mounted() {
		this.onInitEventHandler()
	},
	beforeDestory() {
		this.mouseEnterEventHandler && this.mouseEnterEventHandler.unlisten()
		this.mouseLeaveEventHandler && this.mouseLeaveEventHandler.unlisten()
		this.clickEventHandler && this.clickEventHandler.unlisten()
	}
}
</script>

<style lang="less" scoped>
#cBaseSelectToolTip {
	.tooltip-wrapper {
		position: relative;
		box-sizing: border-box;
		.tooltip-modal-box {
			// display: none;
			position: absolute;
			z-index: 999;
			width: 100%;
			background-color: #1f292e;
			.tooltip-main-content-list {
				.tooltip-main-content-item {
					padding: 0 12px;
					line-height: 40px;
					color: #fff;
					cursor: pointer;
					user-select: none;
					&:hover {
						background-color: #298df8;
					}
				}
			}
		}
	}

	// 弹出框默认被选中的条目的样式
	.tooltip-default-selected {
		background-color: #415058 !important;
	}
}
</style>
