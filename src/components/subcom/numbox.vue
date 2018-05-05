<template>
	<div class="mui-numbox" data-numbox-min='1' >  <!-- :data-numbox-max='maxcount'此处最大数量应该改为商品的库存数量 涉及父组件向子组件传值 -->
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
		<!-- 当选择框的数量一改变 change事件 就将这个值传给父组件 -->
		<input id="test" class="mui-input-numbox" type="number" value="1" @change="selectcount" ref="numsel" />
		<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
	</div>
</template>

<script>
import mui from '../../lib/Mui/js/mui.min.js'  //此处导入mui的js文件 webpack默认js是严格默认，可能会出现错误，所以需安装babel-plugin-transform-remove-strict-mode 取消严格模式插件

	export default {
		mounted(){
			mui('.mui-numbox').numbox()
		},
		created(){
				/*console.log(this.maxcount)*/           /*此处输出undefined?  原因在于商品的库存数量是异步请求得来的 当numbox组件一被创建的时候  数据还没有请求回来 所以是undefined, 那此处怎么设定数量的最大值为库存数呢 我们并不知道库存数量异步请求何时返回数据了------可以用watch 来监听 maxcount 值的改变 总会返回数据的*/
			},
		methods: {			
			selectcount(){
				this.$emit('getcount', this.$refs.numsel.value)
			}
		},
		props: ['maxcount'],
		watch: {
			maxcount: function (newVal, oldVal){
				mui('.mui-numbox').numbox().setOption('max',newVal)
			}
		}
	}
</script>

<style type="text/css">
	
</style>