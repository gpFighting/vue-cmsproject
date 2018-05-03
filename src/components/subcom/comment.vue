<!-- 这是评论组件 -->


<template>
	<div class="comment">
		<h1>发表评论</h1>
		<textarea  placeholder="请输入评论的内容(限200字)" maxlength="200" v-model="mycomments"></textarea>
		<mt-button type="primary" size="large" @click.native="add">发表评论</mt-button>
		<div class="comment-area">
			<div v-for="(item,i) in comments" :key="item.ad_time">
				<div class="comment-title">
					第{{i+1}}楼 用户:{{item.user_name}} 发表时间:{{item.add_time | dateFormat}}
				</div>
				<div class="comment-content">{{item.content}}</div>
			</div>			
		</div>
		<mt-button type="danger" size="large" plain @click.native="loadmore">加载更多</mt-button>

	</div>
</template>

<script type="text/javascript">
import { Toast } from 'mint-ui'
	export default {
		data(){
			return {
				comments: [],
				page: 1,
				mycomments: '',
				name: '匿名用户'
			}
		},
		props: ['cmtid'],
		created(){
			this.getComments()
		},
		methods: {
			// 组件一created就获取评论信息
			getComments(){
				this.$http.get('api/getcomments/'+ this.$route.params.id +'?pageindex='+this.page).then(result=>{
					// console.log(result)
					if (result.body.status==0) {
						// 将前一页的数组与后一页合并
						this.comments = this.comments.concat(result.body.message)
					}else {
						Toast('数据请求失败')
					}
				})
			},
			// 点击加载更多加载下一page的内容
			loadmore(){
				this.page +=1;
				this.getComments();
			},
			// 点击评论，此处应该向服务器提交数据， 发送post请求，但是在此处我没做（第三方接口的问题）
			add(){
				if (this.mycomments.trim().length == 0) {
					return Toast('评论内容不能为空')
				}
				this.$http.post('api/postcomment/'+this.$route.params.id, {content: this.mycomments}).then(result=>{
					if (result.body.status==0) {
						var mythink = {content: this.mycomments, user_name: this.name, add_time: Date.now()}
						this.comments.unshift(mythink)
						this.mycomments=''
					}
				})
				
			}
		}
	}
</script>

<style type="text/css" lang="less">
	.comment {
		font-size: 14px;
		h1 {
			font-size: 18px;
		}
		textarea {
			outline: none;
			resize: none;
			height: 80px;
			font-size: 14px;
			margin-bottom: 0;
		}
		.comment-area {
			margin-top: 5px;
			.comment-title {
				padding: 8px 0;
				background-color: #ccc;
			}
			.comment-content {
				padding: 8px 3px;
				text-indent: 2em;
			}
		}
	}

</style>