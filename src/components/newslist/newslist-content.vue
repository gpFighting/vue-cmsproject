<!-- 每项新闻资讯列表的详细信息 -->

<template>
	<div class="news-content">
		<h1>{{result.title}}</h1>
		<p>
			<span>发表时间：{{result.add_time | dateFormat}}</span>
			<span>点击：{{result.click}}次</span>
		</p>
		<hr>
		<div v-html="result.content" class="newscontainer">		
		</div>
		<comment :cmtid="id"></comment>
	</div>
</template>

<script type="text/javascript">
import comment from '../subcom/comment.vue'
	export default {
		data(){
			return {
				id: this.$route.params.id,
				result: {}
			}
		},
		created(){
			this.getNewsContent()
		},
		methods: {
			getNewsContent(){
				this.$http.get('api/getnew/'+this.id).then(result=>{
					// console.log(result)
					if (result.body.status==0) {
						this.result = result.body.message[0]											
					}
				})
			
			}
		},
		components: {
			comment
		}
	}
</script>

<style type="text/css" lang="less" >
	
	.news-content {
		padding: 5px;
		>h1 {
			font-size: 16px;
			color: red;
			text-align: center;
			margin: 10px 0;
		}
		>p {
			font-size: 13px;
			color: #21A5E7;
			display: flex;
			justify-content: space-between;
			padding: 0 5px;
		}
		.newscontainer {
			img {
				width: 100%;
			}
		}
	}
</style>