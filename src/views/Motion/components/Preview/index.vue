<template>
	<div id="cMotionPreviewWrapper">
		<div class="motion-preview-main">
			<div class="preview-main-text-box">
				<span class="preview-main-text">
					Test Animation
				</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'MotionPreview',
	data() {
		return {}
	}
}
</script>

<style lang="less">
#cMotionPreviewWrapper {
	.motion-preview-main {
		margin-top: 12px;
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