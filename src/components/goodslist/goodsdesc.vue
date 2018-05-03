<template>
	<div class="desc">
		<h1>{{data.title}}</h1>
		<hr>
		<div v-html="data.content"></div>
	</div>	
</template>

<script type="text/javascript">
	export default {
		data(){
			return{
				data: {}
			}
		},
		created(){
			this.getdesc()
		},
		methods: {
			getdesc(){
				this.$http.get('api/goods/getdesc/'+this.$route.params.id).then(result=>{
					if (result.body.status==0) {
						this.data = result.body.message[0]
					}
				})
			}
		}
	}

</script>

<style lang="less"> 
	.desc {
		
		padding: 4px;
		h1 {
			font-size: 16px;
			color: #22a2ff;
			text-align: center;
			margin: 15px 0;
		}
		img {
			width: 100%;
		}
	}
</style>