import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		msg: 'hello world',
		cartList: JSON.parse(uni.getStorageSync('cart')  || '[]')
	},
	mutations: {
		addCart(state, payload) {
			
			// 处理数量问题
			// 如果当前商品已在购物车，则让count+1

			const goods = state.cartList.find(item => item.goods_id === payload.goods_id)

			if (goods) {
				goods.cont++
			} else {
				state.cartList.push(payload)
			}
			console.log(state.cartList);
			
			
			// 持久化
			uni.setStorageSync('cart',JSON.stringify(state.cartList))
		},
	changeChecked(state,payload){
		// 1.找到被修改的商品
		const goods = state.cartList.find(item => item.goods_id === payload.goods_id)
		// 2.修改该商品的isChecked
		if(goods){
			goods.isChecked = !goods.isChecked
		}
	},
	commitCart(state){
		//1.找到所以没有被选中的
		const list = state.cartList.filter(item => !item.isChecked)
		//2.再用所用没有被选中的顶掉原先的
		state.cartList = list
		
		uni.setStorageSync('cart',JSON.stringify(state.cartList))
		
	}
	},
	getters:{
		/**
		 *计算所以选中商品的价格
		 */
		getTotalPricel(state){
			//1.拿到所有选中商品
			// 1+1=2  2=1+1
			const list = state.cartList.filter(item => item.isChecked)
			console.log(list);
			// 2.计算出所有选中商品的价格
			return list.reduce((prev,current) => {
				return prev + current.count * current.goods_price
			}, 0).toFixed(2)
		}
	}
})