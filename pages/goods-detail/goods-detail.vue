<template>
	<view>
		
		<!-- 轮播图 -->
		<swiper class="swiper-box" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular>
			<swiper-item v-for="item in detailData.pics" :key="item.pics_id">
				<image class="swiper-img" :src="item.pics_big_url" mode=""></image>
			</swiper-item>
		</swiper>

		<!-- 详情 -->
		<view class="desc">
			<view class="price">￥{{detailData.goods_price}}</view>
			<view class="name">{{ detailData.goods_name }}</view>
			<view class="kd">快递：免运费</view>
		</view>

		<!-- 富文本 -->
		<rich-text :nodes="detailData.goods_introduce"></rich-text>

		<view class="goods-carts">
			<uni-goods-nav :options="options" :fill="true" :button-group="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	export default {
		computed: {
			...mapState(['msg'])
		},
		data() {
			return {
				detailData: {},
				options: [{
					icon: 'chat',
					text: '客服'
				}, {
					icon: 'shop',
					text: '店铺',
					info: 2,
					infoBackgroundColor: '#007aff',
					infoColor: "#f5f5f5"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: 'linear-gradient(90deg, #FFCD1E, #FF8A18)',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
						color: '#fff'
					}
				],
			};
		},
		onLoad(options) {
			console.log(options);
			this.loadData(options.goodsId)
		},
		methods: {
			...mapMutations(['addCart']),
			loadData(goodsId) {
				uni.request({
					url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/detail',
					data: {
						goods_id: goodsId
					},
					success: (res) => {
						console.log(res);
						this.detailData = res.data.message
					}
				})
			},
			onClick(e) {
				if (e.index === 2){
					uni.switchTab({
						url:'/pages/cart/cart'
					})
				}
			},
			buttonClick(e) {
				console.log(e)
				if (e.index === 0) {
					this.addCart({
						...this.detailData,
						count: 1,
						isChecked: false
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.swiper-box {
		height: 320px;
	}

	.swiper-img {
		height: 100%;
		width: 750rpx;
	}

	.desc {
		padding: 16px 12px;
		background-color: white;
	}

	.price {
		font-size: 26px;
		color: #B02E19;
	}

	.name {
		font-size: 14px;
	}

	.kd {
		font-size: 12px;
		color: #666;
		margin-top: 12px;
	}
	
	.goods-carts{
		position: fixed;
		bottom: 0px;
		width: 750rpx;
	}
</style>
