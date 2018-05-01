<!-- 每项新闻资讯列表的详细信息 -->
<template>
	<div class="news-content">
		<h1>{{result.title}}</h1>
		<p>
			<span>发表时间：{{result.time}}</span>
			<span>点击：{{result.readnum}}次</span>
		</p>
		<hr>
		<div v-html="result.content" class="newscontainer">		
		</div>
		<comment></comment>
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
				this.$http.jsonp('http://api.jisuapi.com/weixinarticle/get?channelid=2&start=0&num=20&appkey=524a5d62522d528a').then(result=>{
					if (result.body.status==0) {
						result = result.body.result.list[this.id]
						this.result = result;
						
					}
				})
			
			}
		},
		components: {
			comment
		}
	}
</script>

<style type="text/css" lang="less" scoped>
	.news-content {
		h1 {
			font-size: 16px;
			color: red;
			text-align: center;
			margin: 10px 0;
		}
		p {
			font-size: 13px;
			color: #21A5E7;
			display: flex;
			justify-content: space-between;
			padding: 0 5px;
		}
		
	}
</style>