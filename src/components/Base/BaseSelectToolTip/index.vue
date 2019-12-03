<template>
	<div id="cBaseSelectToolTip">
		<div class="tooltip-wrapper">
			<!-- 切换区 -->
			<div class="tooltip-trigger-box" ref="trigger">
				<slot name="trigger"></slot>
			</div>

			<!-- 弹出层区 -->
			<div
				class="tooltip-modal-box"
				ref="tooltip"
				:style="{
					display: isVisible ? 'block' : 'none'
				}"
			>
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

export default {
	props: {
		// 可选项列表
		dataSource: {
			type: Array,
			default: () => []
		},
		// TODO 暂时只对应墨刀的要求, 实现 click 方式
		trigger: {
			type: String,
			default: 'click'
		},
		// TODO 目前采用 auto 的方式, 根据墨刀的要求, 需要自行计算
		placement: {
			type: String,
			default: 'auto'
		}
	},
	data() {
		return {
			// 是否显示 tooltip
			isVisible: false,
			// 出现的位置
			position: {
				left: 0,
				top: 0
			},
			// 触发的事件句柄
			mouseEnterEventHandler: null,
			mouseLeaveEventHandler: null,
			clickEventHandler: null
		}
	},
	watch: {
		/**
		 * 计算弹出层位置信息
		 */
		isVisible(visible) {
			if (visible) {
				// TODO 计算位置信息
				console.log('TODO: 动态计算弹出框的位置');
			}
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

              // 点击空白区域关闭弹框
							if ($target === $trigger || _isParentDOM($trigger, $target)) {
								this.onOpen()
							} else {
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

<style lang="less">
#cBaseSelectToolTip {
	.tooltip-wrapper {
		position: relative;
		box-sizing: border-box;
		.tooltip-modal-box {
			display: none;
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
}
</style>
