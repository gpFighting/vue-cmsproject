<template>
	<div class="goodslist">
		<router-link class="goodsitem" v-for="item in goodslist" :key="item.id" :to="'/home/goodsinfo/'+item.id" tag="div">
			<img :src="item.img_url" alt="">
			<h3 class="goodsitem-title">{{item.title}}</h3>
			<div class="goodsitem-bot">
				<div class="price">
					<span class="new-price">￥{{item.sell_price}}</span>
					<span class="old-price">￥{{item.market_price}}</span>
				</div>
				<div class="storage">
					<span>热卖中</span>
					<span>剩{{item.stock_quantity}}件</span>
				</div>
			</div>
		</router-link>
		<mt-button type="danger" size="large" plain @click.native="unloadmore">加载更多</mt-button>	
	</div>
</template>

<script type="text/javascript">
	export default {
		data(){
			return {
				goodslist: [],
				page: 1
			}
		},
		created(){
			this.getGoodslist()
		},
		methods: {
			getGoodslist(){       //获取商品列表数据
				this.$http.get('api/getgoods?pageindex='+ this.page).then(result=>{
					// console.log(result)
					if (result.body.status==0) {
						this.goodslist = this.goodslist.concat(result.body.message)
					}
				})
			},
			unloadmore(){  //点击加载更多 加载下一页
				this.page += 1;
				this.getGoodslist()
			}/*,
			rout(id){
				// 创建导航链接，除了使用router-link的方式以外，还可以借助router的实例方法 $router.push() 即 【编程式导航】
				this.$router.push('/home/goodsinfo/'+ id)  //使用$router.push的方式来进行路由地址的导航
			}*/
		}
	}
</script>

<style lang="less">
	.goodslist {
		padding: 10px;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		.goodsitem {
			width: 49%;
			border: 1px solid #ccc;
			box-shadow: 0 0 8px #ccc;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin-bottom: 10px;
			padding: 3px 3px;
			img {
				width: 100%;
			}
			.goodsitem-title {
				font-size: 14px;
			}
			.goodsitem-bot {
				background-color: #ddd;
				font-size: 13px;
				color: #888;
				padding: 5px;
				.price {
					margin-bottom: 5px;				
					.new-price {
						font-size: 15px;
						color: red;
						margin-right: 5px;
					}
					.old-price {
						text-decoration: line-through;
					}
				}
				.storage {
					display: flex;
					justify-content: space-between;
				}
			}
		}
	}
</style>