<template>
	<div id="pMotion">
		<div class="motion-wrapper">
			<!-- 配置区块 -->
			<MotionConfig
				:activity-type-list="activityTypeList"
				:delay-time-list="delayTimeList"
				:duration-time-list="durationTimeList"
				:repeat-times-list="repeatTimesList"
				:activity-input-value="activityInputValue"
				:delay-time-input-value="delayTimeInputValue"
				:duration-time-input-value="durationTimeInputValue"
				:repeat-times-input-value="repeatTimesInputValue"
				@onActivityValueChange="onActivityValueChange"
				@onDelayTimeValueChange="onDelayTimeValueChange"
				@onDurationTimeValueChange="onDurationTimeValueChange"
				@onRepeatTimesValueChange="onRepeatTimesValueChange"
				@onDelayTimeInputChange="onDelayTimeInputChange"
				@onDurationTimeInputChange="onDurationTimeInputChange"
				@onRepeatTimesInputChange="onRepeatTimesInputChange"
			/>

			<!-- 预览区块 -->
			<MotionPreview
				:activity-type="activityInputValue"
				:delay-time="delayTimeInputValue"
				:duration-time="durationTimeInputValue"
				:repeat-times="repeatTimesInputValue"
			/>
		</div>
	</div>
</template>

<script>
import MotionConfig from './components/Config/index'
import MotionPreview from './components/Preview/index'
import _getDOMStyle from '@/utils/getDOMStyle'
import _convertObjToCSSText from '@/utils/convertObjToCSSText'
import {
	DEFAULT_ANIMATION_TYPE_LIST,
	DEFAULT_ANIMATION_DELAY_TIME_LIST,
	DEFAULT_ANIMATION_DURATION_TIME_LIST,
	DEFAULT_ANIMATION_REPEAT_TIMES_LIST
} from './constants/index'

export default {
	name: 'Motion',
	components: {
		MotionConfig,
		MotionPreview
	},
	data() {
		return {
			// 动效类型列表
			activityTypeList: DEFAULT_ANIMATION_TYPE_LIST.slice(),
			// 延迟时间列表
			delayTimeList: DEFAULT_ANIMATION_DELAY_TIME_LIST.slice(),
			// 持续时长列表
			durationTimeList: DEFAULT_ANIMATION_DURATION_TIME_LIST.slice(),
			// 重复次数列表
			repeatTimesList: DEFAULT_ANIMATION_REPEAT_TIMES_LIST.slice(),

			// 动效输入框的值
			activityInputValue: DEFAULT_ANIMATION_TYPE_LIST[2],
			// 延迟时间输入框的值
			delayTimeInputValue: DEFAULT_ANIMATION_DELAY_TIME_LIST[0].replace(
				'ms',
				''
			),
			// 持续时长输入框的值
			durationTimeInputValue: DEFAULT_ANIMATION_DURATION_TIME_LIST[3].replace(
				'ms',
				''
			),
			// 重复次数输入框的值
			repeatTimesInputValue: DEFAULT_ANIMATION_REPEAT_TIMES_LIST[0]
		}
	},
	methods: {
		onActivityValueChange(v) {
			this.activityInputValue = v
		},
		onDelayTimeValueChange(v) {
			this.delayTimeInputValue = v
		},
		onDurationTimeValueChange(v) {
			this.durationTimeInputValue = v
		},
		onRepeatTimesValueChange(v) {
			this.repeatTimesInputValue = v
		},

		onDelayTimeInputChange(v) {
			this.delayTimeInputValue = v
		},
		onDurationTimeInputChange(v) {
			this.durationTimeInputValue = v
		},
		onRepeatTimesInputChange(v) {
			this.repeatTimesInputValue = v
		},

		onUpdateByGlobal() {
			window._output = options => {
				for (const key in options) {
					if (options.hasOwnProperty(key)) {
						const value = options[key]

						switch (key) {
							case 'name': {
								this.$nextTick(() => {
									this.onActivityValueChange(value)
								})
								break
							}
							case 'delay': {
								this.$nextTick(() => {
									this.onDelayTimeValueChange(value)
								})
								break
							}
							case 'duration': {
								this.$nextTick(() => {
									this.onDurationTimeValueChange(value)
								})
								break
							}
							case 'repeat': {
								this.$nextTick(() => {
									this.onRepeatTimesValueChange(value)
								})
								break
							}
							default: {
								break
							}
						}
					}
				}

				const $animationEle = document.querySelector(
					'#pMotion .preview-main-text'
				)
				let defaultStyleObj = {
					'animation-delay': '',
					'animation-direction': '',
					'animation-duration': '',
					'animation-fill-mode': '',
					'animation-iteration-count': 0,
					'animation-name': '',
					'animation-play-state': '',
					'animation-timing-function': '',
					'-webkit-animation-delay': '',
					'-webkit-animation-direction': '',
					'-webkit-animation-duration': '',
					'-webkit-animation-fill-mode': '',
					'-webkit-animation-iteration-count': 0,
					'-webkit-animation-name': '',
					'-webkit-animation-play-state': '',
					'-webkit-animation-timing-function': ''
				}
				const completeStyleObj = _getDOMStyle($animationEle)

				for (const key in defaultStyleObj) {
					if (defaultStyleObj.hasOwnProperty(key)) {
						defaultStyleObj[key] = completeStyleObj[key]
					}
				}

				// 生成动画样式字符串
				const styleText = _convertObjToCSSText(defaultStyleObj)

				return styleText
			}
		}
	},
	mounted() {
		this.onUpdateByGlobal()
	},
	updated() {
		// TODO: 对外暴露 window.output() 方法, 输出样式信息
		this.onUpdateByGlobal()
	}
}
</script>

<style lang="less">
#pMotion {
	width: 300px;
	margin: 0 auto;
}
</style>
