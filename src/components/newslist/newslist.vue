<template>
	<div class="newslist">
		<ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="(item,i) in newslist" :key="item.url">
					<router-link :to="'/home/newslistContent/'+ i">
						<img class="mui-media-object mui-pull-left" :src="item.pic">
						<div class="mui-media-body">
							{{item.title}}
							<p class='mui-ellipsis'>
								<span>发表时间：{{item.time}}</span>
								<span>点击：{{item.readnum}}次</span>
							</p>
						</div>
					</router-link>
				</li>
			</ul>
	</div>
</template>

<script type="text/javascript">
	import { Toast } from 'mint-ui'
	export default {
		data(){
			return{
				newslist: []
			}
		},
		created(){
			this.getNewslist()
		},
		methods: {
			getNewslist(){
				this.$http.jsonp('http://api.jisuapi.com/weixinarticle/get?channelid=2&start=0&num=20&appkey=524a5d62522d528a').then(result=>{
					// console.log(result)
					if (result.body.status == 0) {
						result = result.body.result.list;
						this.newslist = result;
					}else {
						Toast('获取数据失败')
					}
				})
		
			}
		}
	}
</script>

<style type="text/css" lang="less">
	.newslist {
		font-size: 14px;
		.mui-ellipsis {
			font-size: 12px;
			color: #2BB3F1;
			display: flex;
			justify-content: space-between;
		}
	}
</style>