<template>
	<view>
		<!-- 搜索框 -->
		<uni-search-bar placeholder="搜索内容" @confirm="onConfirm" @cancel="onCancel" @clear="onClear"
			v-model="searchValue"></uni-search-bar>
		<!-- 列表 -->
		<view class="list-box">
			<view class="list-item" v-for="item in list" :key="item.cat_id" @click="onItemClick(item)">
				<!-- 左 -->
				<image class="img" :src="item.goods_small_logo" mode=""></image>
				<!-- 右 -->
				<view class="right">
					<view class="title">
						{{item.goods_name}}

					</view>
					<view class="price">
						￥{{item.goods_price}}
					</view>
				</view>
			</view>
		</view>

		<!-- 加载中 -->
		<view class="loading" v-show="isLoading">
			加载中...

		</view>
		<!-- s数据加载完成 -->
		<view class="finished" v-show="isFinished">
			亲，我也是有底线的~
		</view>


		<!--搜索历史  -->
		<view class="history-box" v-show="isShowHistory">
			<view class="history-titlr-box">
				<view class="title">
					搜索历史
				</view>
				<uni-icons size="24" type="trash-filled" @click="anClearHistory"></uni-icons>
			</view>
			<view class="history-desc-box">
				<view class="history-item" v-for="(item,index) in historyList" :key="index"
					@click="onHistoryItemClik(item)">
					{{ item }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				query: '',
				pagenum: 1,
				pagesize: 20,
				isLoading: false,
				isFinished: false,
				list: [],
				historyList: [],
				searchValue: '',
				isShowHistory: true

			};
		},
		methods: {
			onItemClick(item) {
				uni.navigateTo({
					url: '/pages/goods-detail/goods-detail?goodsId=' + item.goods_id
				})
			},
			anClearHistory() {
				this.historyList = []
			},
			onHistoryItemClik(item) {
				console.log(item);
				this.searchValue = item
				this.onConfirm({
					value: item
				})
			},
			onCancel() {
				// onCancel点击取消后，this.isShowHistory = true历史记录展示。
				console.log('cancel');
				this.list = []
				this.isFinished = false
				this.isShowHistory = true
			},
			onClear() {
				console.log('clear');
			},

			onConfirm(value) {
				// onConfirm当点击回车后，this.isShowHistory = false历史记录隐藏。
				console.log(value);
				this.isShowHistory = false

				this.query = value.value
				// 每次搜索的时候都应该用新数据覆盖旧数据
				this.pagenum = 1
				this.loadData()

				/**
				 * 目标：为histoList 增加数据
				 * 1.创建了 histoList 数组
				 * 2.在用户搜索的时候，为数组增加元素
				 * 3.如果该元素已经存在了数组中，则需要先删除该元素
				 * 4.否则，则直接把元素加到数组的头部
				 */
				// push不行，最新数据在最后。unshift行，最新数据在最前面。
				if (this.historyList.includes(value.value)) {
					// 循环historyList,把里面的每一个数据叫做item ，如果存在一个item恒等于value.value，则把这个元素的坐标返回
					const index = this.historyList.findIndex(item => item === value.value)
					this.historyList.splice(index, 1)
					/**
					 * item => item === value.value
					 * 
					 * function (item){
						 * return item === value.value
					 }
					 * 
					 */
				}
				this.historyList.unshift(value.value)
			},




			loadData() {
				this.isLoading = true
				uni.request({
					url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/search',
					data: {
						query: this.query,
						pagenum: this.pagenum,
						pagesize: this.pagesize
					},
					success: (res) => {
						console.log(res);
						// 把新的的数据放到旧的数据后面
						// 如果数据是第一页，则不需要追加
						if (this.pagenum === 1) {
							this.list = res.data.message.goods
						} else {
							this.list = [...this.list, ...res.data.message.goods]
						}

						// 数据全部加载完成
						const total = res.data.message.total
						const listSize = this.list.length
						if (total === listSize) {
							this.isFinished = true
						} else {
							this.isFinished = false
						}

						this.isLoading = false
						// []表示数组
					}
				})
			}
		},
		onReachBottom() {
			console.log('页面即将触底')
			this.pagenum = this.pagenum + 1
			if (!this.isFinished) {
				this.loadData()
			}
		}
	}
</script>

<style lang="scss">
	.uni-searchbar {
		background-color: #f00;
		position: fixed !important;
		width: 750rpx;
		box-sizing: border-box;
		z-index: 3;
	}

	.uni-searchbar__cancel {
		color: white !important;
	}

	.list-box {
		padding-top: 56px;
	}


	.list-item {
		display: flex;
		background-color: white;
		padding: 2px;
		border-bottom: 1px #eee solid;
	}

	.img {
		width: 238rpx;
		height: 238rpx;
	}

	.right {
		width: 512rpx;
		padding: 4px 6px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.title {
		font-size: 14px;
		font-weight: 500;
	}

	.price {
		color: #ff0000;
		font-size: 16px;
	}

	.loading {
		pandding: 12px;
		text-align: center;
		color: #ccc;
	}

	.finished {
		pandding: 12px;
		text-align: center;
		color: #ccc;
	}

	.history-box {
		padding: 12px
	}

	.history-titlr-box {
		display: flex;
		justify-content: space-between;
		font-size: 16px;
		align-items: center;
		border-bottom: 1px #ccc solid;
		padding-bottom: 12px;
	}

	.history-desc-box {
		display: flex;
		flex-wrap: wrap;
		padding-top: 12px;
	}

	.history-item {
		border: 1px #ccc solid;
		padding: 1px 18px;
		margin-right: 12px;
		margin-bottom: 6px;
		border-radius: 5px;
		color: #666;
	}
</style>