<template>
	<view class="container" @click="onToSearch">
		<view class="box">
			<uni-icons type="search"></uni-icons>
			<text class="title">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-search",
		data() {
			return {

			};
		},
		methods: {
			onToSearch() {
				uni.navigateTo({
					url: '/pages/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		height: 36px;
		background-color: #ff0000;
		padding: 6px 12px;
	}

	.box {
		background-color: white;
		height: 100%;
		border-radius: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.title {
		font-size: 15px;
		margin-left: 6px;
	}
</style>