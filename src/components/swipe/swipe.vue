<!-- 主页和商品详情页面均有轮播图  将轮播图抽离出来  -->
<template>
	<mt-swipe :auto="3000">
	  <mt-swipe-item v-for="item in lunbolist" :key="item.img">
	  <!-- full类指定图片的宽度是否为100%  flag值由调用轮播组件的父组件指定-->
	  	<img :src="item.img" alt="" :class="{full: flag}">  <!-- 此处图片src属性为item.img  home中轮播图请求返回的数据没错 但是商品详情中返回的为item.src 所以对于商品详情中轮播图需对返回的对象添加.img属性-->
	  </mt-swipe-item>
	</mt-swipe>
</template>

<script type="text/javascript">
	export default {
		data(){
			return {

			}
		},
		props: ['lunbolist', 'flag']
	}
</script>

<style type="text/css" lang="less">
	.mint-swipe {
		height: 200px;
		.mint-swipe-item {
			width: 100%;
			height: 100%;
			img {
				/* width: 100%; */ //将轮播图抽离出来此处宽度100%不合理   商品详情部分 图片会变形 因此单独定义为一个类
				height: 100%;
			}
			.full {
				width: 100%;
			}
		}
	}
</style>