<template>
	<view>
		<!-- 列表 -->
		<view class="cate-box">
			<view class="cate-item" v-for="item in cartList" :key="item.goods_id">
				<radio @click="changeChecked(item)" :checked="item.isChecked" />
				<image class="item-img" :src="item.goods_big_logo" mode=""></image>
				<view class="item-desc">
					<view class="item-name">
						{{ item.goods_name }}
					</view>
					<view class="item-info">
						<view class="item-price">
							￥{{item.goods_price}}
						</view>
						<uni-number-box v-model="item.count"></uni-number-box>
					</view>
				</view>
				</radio>

			</view>
		</view>
		<!-- 结算程序 -->
		<view class="total-box">
			<view class="total">
				合计：<text class="total-price">￥{{getTotalPricel}}</text>
			</view>
			<view class="commit">
				<view class="commit" @click="onCommitClick">
					结算
				</view>


			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	export default {
		computed: {
			...mapState(['cartList']),
			...mapGetters(['getTotalPricel'])
		},
		data() {
			return {

			};
		},
		methods: {
			...mapMutations(['changeChecked', 'commitCart']),
			onCommitClick() {
				this.commitCart()
			}
		},
	}
</script>

<style lang="scss" scoped>
	.cate-item {
		display: flex;
		padding: 8px 10px;
		align-items: center;
		background-color: white;
		border-bottom: 1px #ccc solid;
	}

	.item-img {
		width: 250rpx;
		height: 250rpx;


	}

	.item-desc {
		width: 450rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 250rpx;

	}

	.item-name {
		font-size: 12px;
	}

	.item-info {
		display: flex;
		justify-content: space-between;

	}

	.item-price {
		color: #B12E1B;
		font-size: 16px;
	}

	.total-box {
		position: fixed;
		bottom: 60rpx;
		background-color: white;
		height: 70px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		z-index: 9;

	}

	.total {
		font-size: 16px;
		margin-left: 12px;
	}

	.total-price {
		color: #B12E1B;
	}

	.commit {
		width: 200rpx;
		background-color: #B12E1B;
		height: 100%;
		text-align: center;
		line-height: 56px;
		color: white;
	}
</style>