<template>
	<div class="comment">
		<h1>发表评论</h1>
		<textarea  placeholder="请输入评论的内容(限200字)" maxlength="200" v-model="mycomments"></textarea>
		<mt-button type="primary" size="large" @click="add">发表评论</mt-button>
		<div class="comment-area">
			<div v-for="(item,i) in comments" :key="item.text">
				<div class="comment-title">
					第{{i+1}}楼　用户:{{item.name}} 发表时间:{{new Date() | dateFormat}}
				</div>
				<div class="comment-content">{{item.text}}</div>
			</div>			
		</div>
		<mt-button type="danger" size="large" plain @click="loadmore">加载更多</mt-button>

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
		created(){
			this.getComments()
		},
		methods: {
			getComments(){
				this.$http.get('https://www.apiopen.top/satinApi?type=2&page='+this.page).then(result=>{
					// console.log(result)
					if (result.body.code==200) {
						this.comments = this.comments.concat(result.body.data)
					}else {
						Toast('数据请求失败')
					}
				})
			},
			loadmore(){
				this.page +=1;
				this.getComments();
			},
			add(){
				var mythink = {text: this.mycomments, name: this.name}
				this.comments.unshift(mythink)
				this.mycomments=''
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