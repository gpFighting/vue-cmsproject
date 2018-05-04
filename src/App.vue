<template>
	<div class="app-container">
		<!-- 这是header区域 -->
		<mt-header fixed title="黑马程序员-Vue项目">
			<span slot="left" @click="goback" v-show="flag">
		    	<mt-button icon="back">返回</mt-button>
			</span>
		</mt-header>

		<!-- 这是router-view区域 -->

		<transition>
			<router-view></router-view>
		</transition>

		<!-- 这是Tabbar 区域 -->
		<!-- 使用mui -->
		<nav class="mui-bar mui-bar-tab navbar">
			<router-link class="mui-tab-item " to="/home"  tag="div">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/member" tag="div">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="/shopcar" tag="div">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge">{{$store.getters.tocalmount}}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/search" tag="div">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
	</div>
</template>

<script type="text/javascript">
	export default {
		data(){
			return {
				flag: false
			}
		},
		created(){                          //页面一加载进行判断
			this.flag = this.$route.path === '/home' ? false : true
		},
		methods: {
			goback(){                    //点击返回 返回前一页
				this.$router.go(-1)
			}
		},
		watch: {                          //监控路由地址的改变
			"$route.path": function (newVal) {
				if (newVal == '/home') {
					this.flag = false
				}else {
					this.flag = true
				}
			}
		}
	}
</script>
<style type="text/css" scoped>
	 * {
		touch-action: none;
	} 
/*留出header的内边距*/
	.app-container {
		padding-top: 40px;
		padding-bottom: 50px;
		overflow: hidden;
		
	}
	.v-enter {
			opacity: 0;
			transform: translateX(100%);
		}
		.v-leave-to {
			opacity: 0;
			transform: translateX(-100%);
			position: absolute;
		}
		.v-enter-active,
		.v-leave-active {
			transition: all 0.5s ease;
		}
	
	
</style>