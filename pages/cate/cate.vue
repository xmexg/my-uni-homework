<template>
	<view class="container">
		<!-- 左 -->
		<scroll-view class="left-box" scroll-y="true">
			<view class="list-item" :class="{ active : currentIndex === index }" v-for="(item,index) in list"
				:key="item.cat_id" @click="onItemClick(item,index)">{{item.cat_name}}</view>
		</scroll-view>

		<!-- 右 -->
		<scroll-view class="right" scroll-y="true">
			<view class="item2-box" v-for="(item,index) in children" :key="index">
				<view class="item2-title">
					{{ item.cat_name }}
				</view>
				<view class="item3-box">
					<view class="item3-item" v-for="(item3,index3) in item.children" key="index3">
						<image class="item3-icom" :src="item3.cat_icon" mode=""></image>
						<view class="item3-name">
							{{item3.cat_name}}

						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				// 数据驱动一切
				currentIndex: 0,
				children: []

			};
		},
		created() {
			this.loadData()
		},
		methods: {
			onItemClick(item, index) {
				this.currentIndex = index
				this.children = item.children
			},
			loadData() {
				uni.request({
					url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories',
					success: (res) => {
						console.log(res);
						this.list = res.data.message
						this.children = this.list[0].children


					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		display: flex;

	}
	.cate-box{
		margin-bottom: 56px;
		
	}

	.left-box {
		width: 228rpx;
		height: 100vh;
	}

	.list-item {
		height: 60px;
		text-align: center;
		line-height: 60px;
		font-size: 12px;
		border-bottom: 1px #eee solid;
		background-color: white;
	}

	.active {
		border-left: 4px #A23023 solid;
		box-sizing: border-box;
	}

	.right {
		width: 572rpx;
		height: 100vh;

	}

	.item2-title {
		text-align: center;
		font-weight: bold;
		padding: 12px 0;

	}
	
	.item3-box{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
	
	.item3-icom{
		width: 160rpx;
		height: 140rpx;
	}
	.item3-name{
		font-size: 12px;
		text-align: center;
		margin-bottom: 6px;
	}
</style>