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
						@onChange="onDelayTimeValueChange"
					>
						<div class="item-value-box" slot="trigger">
							<div class="item-value-main">
								<input
									id="delay-value-show"
									class="value-show"
									type="text"
									v-model="delayTimeInputValue"
									@focus="onDelayTimeInputFocus"
								/>
								<label for="delay-value-show" class="value-select">
									v
								</label>
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
						@onChange="onDurationTimeValueChange"
					>
						<div class="item-value-box" slot="trigger">
							<div class="item-value-main">
								<input
									id="duration-value-show"
									class="value-show"
									type="text"
									v-model="durationTimeInputValue"
									@focus="onDurationTimeInputFocus"
								/>
								<label for="duration-value-show" class="value-select">
									v
								</label>
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
						@onChange="onRepeatTimesValueChange"
					>
						<div class="item-value-box" slot="trigger">
							<div class="item-value-main">
								<input
									id="repeat-value-show"
									class="value-show"
									type="text"
									v-model="repeatTimesInputValue"
									@focus="onRepeatTimesInputFocus"
								/>
								<label for="repeat-value-show" class="value-select">
									v
								</label>
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
import {
	DEFAULT_ANIMATION_TYPE_LIST,
	DEFAULT_ANIMATION_DELAY_TIME_LIST,
	DEFAULT_ANIMATION_DURATION_TIME_LIST,
	DEFAULT_ANIMATION_REPEAT_TIMES_LIST
} from '../../constants/index'

export default {
	name: 'MotionConfig',
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
			activityInputValue: DEFAULT_ANIMATION_TYPE_LIST[0],
			// 延迟时间输入框的值
			delayTimeInputValue: DEFAULT_ANIMATION_DELAY_TIME_LIST[0],
			// 持续时长输入框的值
			durationTimeInputValue: DEFAULT_ANIMATION_DURATION_TIME_LIST[0],
			// 重复次数输入框的值
			repeatTimesInputValue: DEFAULT_ANIMATION_REPEAT_TIMES_LIST[0]
		}
	},
	methods: {
		onActivityValueChange(v) {
			this.activityInputValue = v
		},
		onDelayTimeInputFocus(e) {
			const $target = e.target

			if ($target) {
				$target.select()
			}
		},
		onDelayTimeValueChange(v) {
			this.delayTimeInputValue = v
		},
		onDurationTimeInputFocus(e) {
			const $target = e.target

			if ($target) {
				$target.select()
			}
		},
		onDurationTimeValueChange(v) {
			this.durationTimeInputValue = v
		},
		onRepeatTimesInputFocus(e) {
			const $target = e.target

			if ($target) {
				$target.select()
			}
		},
		onRepeatTimesValueChange(v) {
			this.repeatTimesInputValue = v
		}
	},
	components: {
		'base-select-tooltip': BaseSelectToolTip
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
				line-height: 30px;
				span.item-tip-text {
					color: #999;
				}
			}
			.item-value-box {
				margin-left: 20px;
				border: 1px solid transparent;
				line-height: 30px;
				transition: all 0.3s ease;
				&:hover {
					.config-item-value-box-hover;
					.config-item-activity-button-icon-hover;
					.config-item-activity-select-icon-hover;
				}
			}
			.item-value-main {
				display: flex;
				input.value-show {
					display: block;
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
				label.value-select {
					display: block;
					width: 28px;
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
					width: 28px;
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

	// 动效框的 select 小图标的 hover
	.config-item-activity-select-icon-hover {
		.value-select-icon {
			transform: rotateZ(180deg);
		}
	}

	// 右侧外框的输入框 focus
	.config-item-value-show-focus {
		outline: 3px solid #1890ff;
	}
}
</style>
