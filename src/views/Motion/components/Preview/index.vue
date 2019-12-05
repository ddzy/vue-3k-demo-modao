<template>
	<div id="cMotionPreviewWrapper">
		<div class="motion-preview-main">
			<div class="preview-main-text-box">
				<transition
					name="custom-classes-transition"
					:enter-active-class="enterActiveClass"
					@before-enter="onTransitionBeforeEnter"
				>
					<span class="preview-main-text" v-if="isVisible">
						3K FE-group
					</span>
				</transition>
			</div>
		</div>
	</div>
</template>

<script>
import _convertObjToCSSText from '@/utils/convertObjToCSSText'

export default {
	name: 'MotionPreview',
	props: {
		activityType: {
			type: String
		},
		delayTime: {
			type: String
		},
		durationTime: {
			type: String
		},
		repeatTimes: {
			type: String
		}
	},
	data() {
		return {
			isVisible: true,
			enterActiveClass: ''
		}
	},
	watch: {
		activityType(v) {
			this.onUpdateTransitionClass(v)
			this.onRerender()
		},
		delayTime() {
			this.onRerender()
		},
		durationTime() {
			this.onRerender()
		},
		repeatTimes() {
			this.onRerender()
		}
	},
	methods: {
		onTransitionBeforeEnter($el) {
			if ($el) {
				const [
					parsedActivityType,
					parsedDelayTime,
					parsedDurationTime,
					parsedRepeatTimes
				] = [
					this.activityType,
					Number.parseInt(this.delayTime),
					Number.parseInt(this.durationTime),
					Number.parseInt(this.repeatTimes)
				]
				const [
					convertedActivityType,
					convertedDelayTime,
					convertedDurationTime,
					convertedRepeatTimes
				] = [
					`${parsedActivityType}`,
					`${parsedDelayTime / 1000}s`,
					`${parsedDurationTime / 1000}s`,
					`${parsedRepeatTimes}`
				]

				const styleObj = {
					// TODO: 再次设置 name 属性, 避免动画只执行一次
					'animation-name': convertedActivityType,
					'animation-delay': convertedDelayTime,
					'animation-duration': convertedDurationTime,
					'animation-iteration-count': convertedRepeatTimes,
					'-webkit-animation-name': convertedActivityType,
					'-webkit-animation-delay': convertedDelayTime,
					'-webkit-animation-duration': convertedDurationTime,
					'-webkit-animation-iteration-count': convertedRepeatTimes
				}

				const convertedStyleObj = _convertObjToCSSText(styleObj)

				$el.style.cssText += convertedStyleObj
			}
		},
		onToggleVisible() {
			this.isVisible = !this.isVisible
		},
		onUpdateTransitionClass(className) {
			this.enterActiveClass = `magictime ${className}`
			this.leaveActiveClass = `magictime ${className}`
		},
		/**
		 * 配置项更改时自动更新演示试图
		 */
		onRerender() {
			this.onToggleVisible()

			this.$nextTick(() => {
				this.onToggleVisible()
			})
		}
	}
}
</script>

<style lang="less">
#cMotionPreviewWrapper {
	.motion-preview-main {
		min-height: 150px;
		margin-top: 200px;
		background-color: #f7f7fa;
		.preview-main-text-box {
			.preview-main-text {
				line-height: 150px;
				font-size: 24px;
				color: #1890ff;
				user-select: none;
			}
		}
	}
}
</style>
