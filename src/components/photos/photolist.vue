<template>
	<div class="photo">
		<div id="wrapper" class="photolist">
		    <ul>
		        <li v-for="item in data"  @click="getpic(item.id)">{{item.title}}</li> 
		    </ul>
		</div>

		<ul class="pic">
		  <router-link v-for="item in list" tag="li" :to="'/home/photoinfo/'+item.id" :key="item.id">
		    <img v-lazy="item.img_url">
		    <div class="description">
		    	<h3 class="description-title" v-html="item.title"></h3>
		    	<p class="description-content" v-html="item.zhaiyao"></p>
		    </div>
		  </router-link>
		</ul>
	</div>
</template>

<script type="text/javascript">
	import IScroll from '../../lib/iscroll/iscroll.js'
	export default {
		data(){
			return{
				data: [],
				list: []
			}
		},
		created(){
			this.getType(),
			this.getpic(0)
		},
		mounted(){
			var myScroll = new IScroll('#wrapper',{scrollX: true, scrollY: false});
		},
		methods: {
			getType(){
				this.$http.get('api/getimgcategory').then(result=> {
					// console.log(result)
					if (result.body.status==0) {
						result.body.message.unshift({id: 0, title: '全部'})
						this.data =result.body.message
					}
				})
			},
			getpic(i){
				this.$http.get('api/getimages/'+ i).then(result=>{
					// console.log(result)
					if (result.body.status== 0) {
						this.list = result.body.message
					}
				})
			}
		}
	}
</script>

<style type="text/css" lang="less">
	.photo {
		ul {
			list-style: none;
			padding: 0;
		}
		img {
			vertical-align: center;
			width: 100%;
		}
		// overflow: hidden;
		.photolist {
			height: 40px;
			position: relative;
			ul {
				position: absolute;
				width: 960px;
				height: 40px;
				margin: 0;
				li {
					float: left;
					line-height: 40px;
					font-size: 15px;
					margin: 0 10px;
					&:hover {
						color: #177AD3;
					}
				}
				.color {
					color: #177AD3;
				}
			}
			
		}
		
		.pic {
			margin: 0;
			text-align: center;
			li {
				margin: 10px 10px;
				box-shadow: 0 0 8px rgba(0, 0, 0, .4);
				border-radius: 8px;
				background-color: #ccc;
				position: relative;
			}
			img {
				vertical-align: middle;

			}
			img[lazy=loading] {
			  width: 40px;
			  height: 300px;
			  margin: auto;
			}
			.description {
				color: #fff;
				text-align: left;
				max-height: 84px;
				position: absolute;
				bottom: 0;
				background-color: rgba(0, 0, 0, .4);
				.description-title{
					font-size: 14px;
				}

				.description-content{
					font-size: 13px;
					color: #fff;
				}
			}
		}
	}
	
</style>