<template>
	<div id="cMotionConfigWrapper">
		<div>
			<ul class="config-list">
				<li class="config-list-item config-item-activity">
					<!-- 左部提示区 -->
					<div class="item-tip-box">
						<span class="item-tip-text">动效</span>
					</div>

					<!-- 右部值域区 -->
					<base-select-tooltip
						trigger="click"
						placement="auto"
						:data-source="activityTypeList"
						:current-value="activityInputValue"
						@onChange="onActivityValueChange"
					>
						<div class="item-value-box" slot="trigger">
							<div class="item-value-main">
								<div class="value-main-button-box">
									<span class="value-button-text">
										{{ activityInputValue }}
									</span>
									<span class="value-button-icon">
										v
									</span>
								</div>
								<div class="value-main-select-box">
									<span class="value-select value-select-icon">
										v
									</span>
								</div>
							</div>
						</div>
					</base-select-tooltip>
				</li>
				<li class="config-list-item">
					<!-- 左部提示区 -->
					<div class="item-tip-box">
						<span class="item-tip-text">延时</span>
					</div>

					<!-- 右部值域区 -->
					<base-select-tooltip
						trigger="click"
						placement="auto"
						:data-source="delayTimeList"
						:current-value="delayTimeInputValue"
						@onChange="onDelayTimeValueChange"
					>
						<div class="item-value-box" slot="trigger">
							<div class="item-value-main">
								<input
									id="delay-value-show"
									class="value-show"
									type="text"
									v-model="p_delayTimeInputValue"
									@focus="onDelayTimeInputFocus"
									@input="onDelayTimeInputChange"
								/>
								<span class="value-suffix" ref="delaySuffix">
									ms
								</span>
								<span for="delay-value-show" class="value-select">
									v
								</span>
							</div>
						</div>
					</base-select-tooltip>
				</li>
				<li class="config-list-item">
					<!-- 左部提示区 -->
					<div class="item-tip-box">
						<span class="item-tip-text">时长</span>
					</div>

					<!-- 右部值域区 -->
					<base-select-tooltip
						trigger="click"
						placement="auto"
						:data-source="durationTimeList"
						:current-value="durationTimeInputValue"
						@onChange="onDurationTimeValueChange"
					>
						<div class="item-value-box" slot="trigger">
							<div class="item-value-main">
								<input
									id="duration-value-show"
									class="value-show"
									type="text"
									v-model="p_durationTimeInputValue"
									@focus="onDurationTimeInputFocus"
									@input="onDurationTimeInputChange"
								/>
								<span class="value-suffix" ref="durationSuffix">
									ms
								</span>
								<span for="duration-value-show" class="value-select">
									v
								</span>
							</div>
						</div>
					</base-select-tooltip>
				</li>
				<li class="config-list-item">
					<!-- 左部提示区 -->
					<div class="item-tip-box">
						<span class="item-tip-text">重复</span>
					</div>

					<!-- 右部值域区 -->
					<base-select-tooltip
						trigger="click"
						placement="auto"
						:data-source="repeatTimesList"
						:current-value="repeatTimesInputValue"
						@onChange="onRepeatTimesValueChange"
					>
						<div class="item-value-box" slot="trigger">
							<div class="item-value-main">
								<input
									id="repeat-value-show"
									class="value-show"
									type="text"
									v-model="p_repeatTimesInputValue"
									@focus="onRepeatTimesInputFocus"
									@input="onRepeatTimesInputChange"
								/>
								<span for="repeat-value-show" class="value-select">
									v
								</span>
							</div>
						</div>
					</base-select-tooltip>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import BaseSelectToolTip from '@/components/Base/BaseSelectToolTip/index.vue'
import _convertObjToCSSText from '@/utils/convertObjToCSSText'
import _getPxFromStr from '@/utils/getPxFromStr'

export default {
	name: 'MotionConfig',
	components: {
		'base-select-tooltip': BaseSelectToolTip
	},
	props: {
		activityTypeList: {
			type: Array,
			default: () => []
		},
		delayTimeList: {
			type: Array,
			default: () => []
		},
		durationTimeList: {
			type: Array,
			default: () => []
		},
		repeatTimesList: {
			type: Array,
			default: () => []
		},

		activityInputValue: {
			type: String
		},
		delayTimeInputValue: {
			type: String
		},
		durationTimeInputValue: {
			type: String
		},
		repeatTimesInputValue: {
			type: String
		}

		// delayTimeInputSuffixOffset: {
		// 	type: Number
		// },
		// durationTimeInputSuffixOffset: {
		// 	type: Number
		// },
		// repeatTimesInputSuffixOffset: {
		// 	type: Number
		// }
	},
	data() {
		return {
			// 延时输入框后缀的偏移量
			delayTimeInputSuffixOffset: 0,
			// 持续时间输入框后缀的偏移量
			durationTimeInputSuffixOffset: 0,
			// 重复次数输入框后缀的偏移量
			repeatTimesInputSuffixOffset: 0,

			// 与 props 区分, 便于双向更新值
			p_delayTimeInputValue: this.delayTimeInputValue,
			p_durationTimeInputValue: this.durationTimeInputValue,
			p_repeatTimesInputValue: this.repeatTimesInputValue
		}
	},
	watch: {
		delayTimeInputValue(v) {
			// 同步 props 与 state
			this.p_delayTimeInputValue = v
			// 更新输入框后缀的位置
			this.delayTimeInputSuffixOffset = _getPxFromStr(v) + 12
		},
		durationTimeInputValue(v) {
			this.p_durationTimeInputValue = v
			this.durationTimeInputSuffixOffset = _getPxFromStr(v) + 12
		},
		repeatTimesInputValue(v) {
			this.p_repeatTimesInputValue = v
		},
		delayTimeInputSuffixOffset(v) {
			// 设置输入框后缀的样式
			const $delaySuffix = this.$refs.delaySuffix

			if ($delaySuffix) {
				const styleObj = {
					left: `${v}px`
				}
				const convertedStyleText = _convertObjToCSSText(styleObj)

				$delaySuffix.style.cssText += convertedStyleText
			}
		},
		durationTimeInputSuffixOffset(v) {
			const $durationSuffix = this.$refs.durationSuffix

			if ($durationSuffix) {
				const styleObj = {
					left: `${v}px`
				}
				const convertedStyleText = _convertObjToCSSText(styleObj)

				$durationSuffix.style.cssText += convertedStyleText
			}
		}
	},
	methods: {
		onReplaceNumWithEmptyStr(v) {
			const RegExp_num = /\D/g

			return `${v}`.replace(RegExp_num, '')
		},
		onActivityValueChange(v) {
			this.$emit('onActivityValueChange', v)
		},
		onDelayTimeInputFocus(e) {
			const $target = e.target

			if ($target) {
				$target.select()
			}
		},
		onDelayTimeValueChange(v) {
			// 去除 ms 后缀
			v = v.replace('ms', '')

			this.$emit('onDelayTimeValueChange', v)
		},
		onDelayTimeInputChange() {
			this.p_delayTimeInputValue = this.onReplaceNumWithEmptyStr(
				this.p_delayTimeInputValue
			)

			this.$emit('onDelayTimeInputChange', this.p_delayTimeInputValue)
		},
		onDurationTimeInputFocus(e) {
			const $target = e.target

			if ($target) {
				$target.select()
			}
		},
		onDurationTimeValueChange(v) {
			// 去除 ms 后缀
			v = v.replace('ms', '')

			this.$emit('onDurationTimeValueChange', v)
		},
		onDurationTimeInputChange() {
			this.p_durationTimeInputValue = this.onReplaceNumWithEmptyStr(
				this.p_durationTimeInputValue
			)

			this.$emit('onDurationTimeInputChange', this.p_durationTimeInputValue)
		},
		onRepeatTimesInputFocus(e) {
			const $target = e.target

			if ($target) {
				$target.select()
			}
		},
		onRepeatTimesValueChange(v) {
			this.$emit('onRepeatTimesValueChange', v)
		},
		onRepeatTimesInputChange() {
			this.p_repeatTimesInputValue = this.onReplaceNumWithEmptyStr(
				this.p_repeatTimesInputValue
			)

			this.$emit('onRepeatTimesInputChange', this.p_repeatTimesInputValue)
		}
	},
	mounted() {
		// 设置初始的偏移量
		this.delayTimeInputSuffixOffset =
			_getPxFromStr(this.delayTimeInputValue) + 12
		this.durationTimeInputSuffixOffset =
			_getPxFromStr(this.durationTimeInputValue) + 12
		this.repeatTimesInputSuffixOffset =
			_getPxFromStr(this.repeatTimesInputValue) + 12
	}
}
</script>

<style lang="less">
#cMotionConfigWrapper {
	.config-list {
		.config-list-item {
			display: flex;
			margin-top: 10px;
			cursor: default;

			.item-tip-box {
				width: 40px;
				line-height: 30px;
				span.item-tip-text {
					color: #999;
				}
			}
			.item-value-box {
				width: 260px;
				border: 1px solid transparent;
				line-height: 30px;
				transition: all 0.3s ease;
				&:hover {
					.config-item-value-box-hover;
					.config-item-activity-button-icon-hover;
				}
			}
			.item-value-main {
				display: flex;
				position: relative;
				input.value-show {
					display: block;
					width: 200px;
					padding: 6px 12px;
					border: none;
					font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
						Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
					font-size: 14px;
					outline: none;
					cursor: default;
					&:focus {
						.config-item-value-show-focus;
					}
				}
				span.value-suffix {
					position: absolute;
					left: 12px;
					color: #5b6b73;
				}
				span.value-select {
					display: block;
					width: 48px;
					margin-left: 2px;
					background-color: #ededed;
					color: #666;
					opacity: 0;
					cursor: pointer;
					transition: all 0.3s ease;
				}
			}
		}

		// 动效条目
		.config-item-activity {
			.value-main-button-box {
				box-sizing: border-box;
				width: 212px;
				text-align: left;
				padding-left: 12px;
				font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
					Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
				font-size: 14px;
				color: #000;
				.value-button-icon {
					color: #666;
					transition: all 0.3s ease;
				}
			}

			.value-main-select-box {
				span.value-select {
					display: block;
					width: 48px;
					background-color: #fff;
					color: #666;
					opacity: 0;
					cursor: pointer;
					transition: all 0.3s ease;
				}
			}
		}
	}

	// 右侧外框 hover
	.config-item-value-box-hover {
		border-color: #ddd;
		.value-select {
			opacity: 1;
		}
	}

	// 动效框的 button 小图标的 hover
	.config-item-activity-button-icon-hover {
		.value-button-icon {
			opacity: 0;
		}
	}

	// 右侧外框的输入框 focus
	.config-item-value-show-focus {
		outline: 3px solid #1890ff;
	}
}
</style>
