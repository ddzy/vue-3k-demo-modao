<template>
	<div id="pMotion">
		<div class="motion-wrapper">
			<!-- 配置区块 -->
			<MotionConfig />

			<!-- 预览区块 -->
			<MotionPreview />
		</div>
	</div>
</template>

<script>
import MotionConfig from './components/Config/index'
import MotionPreview from './components/Preview/index'

export default {
	name: 'Motion',
	components: {
		MotionConfig,
		MotionPreview
	},
	data() {
		return {}
	}
}
</script>

<style lang="less">
#pMotion {
	width: 300px;
	margin: 0 auto;
}
</style>
