<template>
	<div class="shopcarContainer">
		<div class="mui-card" v-for="(item, i) in goodslist" :key="item.id">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<mt-switch v-model="$store.getters.getselected[item.id]" @change="changesel({id:item.id, flag: $store.getters.getselected[item.id]})"></mt-switch>
					<img :src="item.thumb_path" alt="">
					<div>
						<h3>{{item.title}}</h3>
						<p class="control">
							<span class="price">￥{{item.sell_price}}</span>
							<selectbox :goodsnum = "$store.getters.getgoodscount[item.id]" :goodsid="item.id"></selectbox>
							<a href="javascript:;" @click.prevent="remove(item.id, i)">删除</a>
						</p>
					</div>
				</div>
			</div>
		</div>
		<div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner jiesuan">
						<div>
							<p>总计（不含运费）</p>
							<p class="buy">已勾选商品 <span>{{$store.getters.gettotal.totalcount}}</span> 件，总价：<span>￥{{$store.getters.gettotal.totalprice}}</span>元</p>
						</div>
						<mt-button type="danger">去结算</mt-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import selectbox from '../subcom/shopcar-numbox.vue'
	export default {
		data(){
			return { 
				goodslist: []   //请求到的商品数据     根据这将商品列表渲染到页面上

			}
		},
		created(){
			this.getgoodsinfo()
		},
		methods: {
			getgoodsinfo(){         //请求得到每个选种商品的数据  
				var arr = []
				this.$store.state.car.forEach(item=>{
					arr.push(item.id)
				})
				this.$http.get('api/goods/getshopcarlist/'+ arr.join(',')).then(result=>{
					// console.log(result)
					if (result.body.status == 0) {
						this.goodslist = result.body.message
					}
				})
			},
			remove(id, i){
				this.goodslist.splice(i, 1);   //删除goodslist中对应数据 从页面显示删除
				this.$store.commit('removegoods', id)  //删除state.car 中对应的数据
			},
			changesel(id){
				this.$store.commit('changeflag', id)
			}
		},
				components: {
			selectbox
		}
	}
</script>


<style type="text/css" lang="less" scoped>
	.shopcarContainer {
		background-color: #eee;
		overflow: hidden;
		.jiesuan {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.mui-card-content-inner {
			display: flex;
			align-items: center;
			img {
				width: 60px;
				height: 60px;
			}
			h3 {
				font-size: 13px;
				margin-bottom: 15px;
			}
			.price {
				color:red;
			}
			.control {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 0;
			}
			.buy {
				span {
					color: red;
					font-size: 16px;
				}
			}
		}
	}
</style>