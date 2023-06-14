<template>
	<view class="container">
		<my-search></my-search>
		<swiper class="m-swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular>
			<!--循环展示 item (每一项)-->
			<swiper-item v-for="item in swiperData" :key="item.id">
				<image class="m-img" :src="item.image_src" mode="">
			</swiper-item>
		</swiper>

		<!-- 分类视图 -->
		<view class="cate-box">
			<view class="cate-item" v-for="(item,index) in cateData" :key="index" @click="onCateClik">
				<image class="cate-img" :src="item.image_src" mode=""></image>


			</view>
		</view>

		<!-- 楼层 -->
		<view class="floor-box">
			<view class="floor-item" v-for="(item,index) in floorData" :key="index">
				<image class="floor-title" :src="item.floor_title.image_src" mode=""></image>
				<!-- 楼层内容 -->
				<view class="floor-desc">
					<!-- 左 -->
					<view class="floor-desc-left">
						<image class="floor-desc-left-img" :src="item.product_list[0].image_src" mode=""></image>
					</view>
					<!-- 右 -->
					<view class="floor-desc-right">
						<image class="floor-desc-right-img" v-for="pItem in item.product_list.slice(1,5)"
							:key="pItem.name" :src="pItem.image_src" mode=""></image>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>


<script>
	// 123456注释;1.获取数据
	// 2.渲染视图
	export default {
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui',
				// 1.定义一个数据
				swiperData: [],
				cateData: [],
				floorData: [],
			}
		},
		created() {
			this.loadSwiperData()
			this.loadCateData()
			this.loadFloorData()
		},
		methods: {
			onCateClik() {
				uni.switchTab({
					url: '/pages/cate/cate'
				})
			},
			/**
			 * 获取swiperData的方法
			 */
			loadSwiperData() {
				uni.request({
					url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
					success: (res) => {
						console.log(res);
						// 2.为数据赋值
						this.swiperData = res.data.message
					}
				})
			},
			/**
			 * 获取分类数据
			 */
			loadCateData() {
				uni.request({
					url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems',
					success: (res) => {
						// res忘写不显示
						console.log(res);
						this.cateData = res.data.message
					}
				})
			},
			loadFloorData() {
				uni.request({
					url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata',
					success: (res) => {
						console.log(res)
						this.floorData = res.data.message
					}
				})
			}


		}
	}
</script>


<style lang="scss">
	.container {
		.m-swiper {
			height: 160px;

			.m-img {
				height: 160px;
				width: 750rpx;
			}
		}

		.cate-box {
			display: flex;
			justify-content: space-around;
			padding: 12px 0;
			background-color: white;

			.cate-item {
				.cate-img {
					width: 66px;
					height: 66px;

				}
			}
		}

		.floor-title {
			height: 26px;
		}
	}

	.floor-desc {
		display: flex;
	}

	.floor-desc-left {}

	.floor-desc-left-img {
		width: 240rpx;
		height: 455rpx;
	}


	.floor-desc-left {
		display: flex;
		flex-wrap: wrap;
	}

	.floor-desc-right-img {
		width: 240rpx;
		height: 220rpx;
		padding-left: 10rpx;
	}
</style>