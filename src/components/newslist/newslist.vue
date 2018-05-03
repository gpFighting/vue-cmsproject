<!-- 新闻资讯列表 -->
<template>
	<div class="newslist">
		<ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="(item,i) in newslist" :key="item.id">
					<router-link :to="'/home/newslistContent/'+ item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							{{item.title}}
							<p class='mui-ellipsis'>
								<span>发表时间：{{item.add_time | dateFormat}}</span>
								<span>点击：{{item.click}}次</span>
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
				this.$http.get('api/getnewslist').then(result=>{
					// console.log(result)
					if (result.body.status == 0) {
						this.newslist = result.body.message;
						
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