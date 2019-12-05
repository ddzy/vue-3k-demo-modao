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
		}
	}
}
</script>

<style lang="less">
#pMotion {
	width: 300px;
	margin: 0 auto;
}
</style>
