<!-- 商品详情页面 -->
<!-- 绘制商品详情页面的卡片视图  使用mui封装好的代码-->
<template>
	<div class="goodsinfo">
		<transition
		@before-enter="beforeEnter"
		@enter= "enter"
		@after-enter = "afterEnter"
		>
			<div class="ball" v-show="isshow" ref="ball"></div>
		</transition>
		<div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner goodsswipe">
						<swipe :lunbolist="lunbolist" :flag="false"></swipe>
				</div>
			</div>
		</div>
			<div class="mui-card">
				<div class="mui-card-header">{{info.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<div class="price">
							市场价：<del>￥{{info.market_price}}</del> 销售价：<span class="sell_price">￥{{info.sell_price}}</span>
						</div>
						<div class="count">购买数量：
							<numbox @getcount="getbuycount" :maxcount="info.stock_quantity"></numbox>
						</div>
						<mt-button type="primary" size="small">立即购买</mt-button>
						<mt-button type="danger" size="small" @click="addToShopcar">加入购物车</mt-button>
					</div>
				</div>
			</div>
			<div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号：{{info.goods_no}}</p>
						<p>库存情况：{{info.stock_quantity}}件</p>
						<p>上架时间：{{info.add_time | dateFormat}}</p>
					</div>
				</div>
				<div class="mui-card-footer">
					<!-- 使用编程式导航创建图文介绍 和 商品评论组件 -->
					<mt-button type="primary" size="large" plain @click.native="getdesc(id)">图文介绍</mt-button>
					<mt-button type="danger" size="large" plain @click.native="getcomments(id)">商品评论</mt-button>
				</div>
			</div>		
			
	</div>
</template>

<script>
	import swipe from '../swipe/swipe.vue'
	import numbox from '../subcom/numbox.vue'
	export default {
		data(){
			return {
				id: this.$route.params.id, //路由地址中唯一的id
				lunbolist: [],
				info: {},
				isshow: false,
				buynum: 1
			}
		},
		created(){
			this.getgoodsinfo(),
			this.getgoodsdes()
		},
		
		methods: {
			getgoodsinfo(){  //获取商品图片
				this.$http.get('api/getthumimages/'+this.id).then(result=>{
					// console.log(result)
					if (result.body.status == 0) {
						// 此处需对返回的图片属性添加.src
						result.body.message.forEach(item=>{
							item.img = item.src
						})
						this.lunbolist = result.body.message
					}
				})
			},
			getgoodsdes(){   //获取商品详细信息 标题 库存等
				this.$http.get('api/goods/getinfo/'+this.id).then(result=>{
					if (result.body.status==0) {
						this.info = result.body.message[0]
					}
				})
			},
			getdesc(id){        //获取详情数据
				this.$router.push({name: "getdesc", params: {id}})
			},
			getcomments(id){   //获取评论
				this.$router.push({name: "getcomments", params: {id}})
			},
			addToShopcar(){
				this.isshow = !this.isshow;
				console.log(this.isshow)
				this.$store.commit('storedata',{id: this.id, count: this.buynum,price: this.info.sell_price,flag: true})
			},
			// 小球执行半场动画  用钩子函数
			beforeEnter(el){
				el.style.transform='translate(0, 0)'
			},
			enter(el,done){
				// element.getBoundingClientRect() 原生DOM方法  获取元素相对于视窗的位置  有left  right top bottom 四个值 均是相对于元素左上角
				el.offsetWidth;
				var ballposition = this.$refs.ball.getBoundingClientRect(); //获取小球相对于视口的位置
				var badgeposition = document.getElementById('badge').getBoundingClientRect();  //获取徽章相对于视口的位置
				var x = badgeposition.left - ballposition.left;
				var y = badgeposition.top - ballposition.top;
				
				el.style.transform = `translate(${x}px, ${y}px)`   //当有页面滚动  或在不同分辨率的设备上时小球的运动轨迹就会出错，此处不应该把运动的距离写死  应该动态变化
				el.style.transition = 'all 0.5s cubic-bezier(.4,-0.3,1,.68)';
				done()
			},
			afterEnter(el){
				this.isshow = !this.isshow
			},
			// 购买数量选择框子组件的值通过emit传给父组件
			getbuycount(count){
				this.buynum = parseInt(count)
				// console.log(this.buynum)
			}
		},
		components: {
			swipe,
			numbox
		}
	}
</script>

<style lang="less" scoped>
	.goodsinfo {
		background-color: #ddd;
		overflow: hidden;
		.goodsswipe {
			text-align: center;
		}
		.price {
			.sell_price {
				color: red;
			}
		}
		.count {
			margin: 5px 0;
		}
		.mui-card-footer {
			display: block;
			button {
				margin-top: 10px;
			}
		}
		.ball {
			width: 15px;
			height: 15px;
			border-radius: 50%;
			background-color: red;
			position: absolute;
			top: 384px;
			left: 151px;
			z-index: 999;
		}
	}
</style>