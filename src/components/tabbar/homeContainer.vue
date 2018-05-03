<template>
	<div>
		
		<swipe :lunbolist="lunbolist" :flag="true"></swipe>
		<ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
                    <img src="../../images/menu1.png">
                    <div class="mui-media-body">新闻资讯</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photoList">
                    <img src="../../images/menu2.png">
                    <div class="mui-media-body">图片分享</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
                    <img src="../../images/menu3.png">
                    <div class="mui-media-body">商品购买</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="#">
                    <img src="../../images/menu4.png">
                    <div class="mui-media-body">留言反馈</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="#">
                    <img src="../../images/menu5.png">
                    <div class="mui-media-body">视频专区</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="#">
                    <img src="../../images/menu6.png">
                    <div class="mui-media-body">练习我们</div></router-link></li>
		</ul> 
	</div>
</template>

<script>
// 导入Toast组件
	import { Toast } from 'mint-ui'
	//导入轮播图组件
	import swipe from '../swipe/swipe.vue'
	export default {
		data(){
			return{
				lunbolist: []
			}
		},
		created(){
			this.getLunbo()
		},
		methods: {
			getLunbo(){
				this.$http.get('api/getlunbo').then(result=>{
					// console.log(result)
					if (result.body.status == 0) {
						this.lunbolist = result.body.message
					}else {
						Toast('轮播图数据获取失败')
					}
				})

			}
		},
		components: {
			swipe
		}
	}
</script>


<style type="text/css" lang="less" scoped>
	
	.mui-grid-view.mui-grid-9 {
		background-color: #fff;
		border: none;
	}
	.mui-grid-view.mui-grid-9 .mui-table-view-cell {
		border: none;
		font-size: 13px;
		img {
			width: 60px;
			height: 60px;
		}
	}
</style>