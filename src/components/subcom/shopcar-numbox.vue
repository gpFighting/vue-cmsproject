<template>
	<div class="mui-numbox" data-numbox-min='1'>  
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
		<!-- 当选择框的数量一改变 change事件 就将这个值传给父组件 -->
		<input id="test" class="mui-input-numbox" type="number" :value="goodsnum" ref="numsel" @change="addorcan" readonly/>
		<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
	</div>
</template>

<script>
import mui from '../../lib/Mui/js/mui.min.js'  //此处导入mui的js文件 webpack默认js是严格默认，可能会出现错误，所以需安装babel-plugin-transform-remove-strict-mode 取消严格模式插件
	export default {
		mounted(){
			mui('.mui-numbox').numbox()
		},
		methods: {			
			addorcan(){               //当选择框中数字变化时  同步到store中
				this.$store.commit('updatacount', {id: this.goodsid, count: this.$refs.numsel.value})
			}
		},
		props: ['goodsnum','goodsid']
	}
</script>

<style type="text/css" lang="less" scoped>
	.mui-numbox {
		height: 27px;
	}
</style>