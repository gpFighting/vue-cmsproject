<template>
	<div class="photo">
		<div id="wrapper" class="photolist">
		    <ul>
		        <li v-for="(item,i) in data"  @click="getpic(i+1)">{{item}}</li>		        	      		  		      
		    </ul>
		</div>

		<ul class="pic">
		  <li v-for="item in list">
		    <img v-lazy="item.url">
		  </li>
		</ul>
	</div>
</template>

<script type="text/javascript">
	import IScroll from '../../lib/iscroll/iscroll.js'
	export default {
		data(){
			return{
				list: [],
				data: ['全部', '家居生活', '摄影设计', '明星美女', '汽车科技', '美食创新', '电子科技']
			}
		},
		created(){
			this.getPhotos(1)
		},
		mounted(){
			var myScroll = new IScroll('#wrapper',{scrollX: true, scrollY: false});
		},
		methods: {
			getPhotos(i){
				this.$http.get('https://www.apiopen.top/meituApi?page='+ i).then(result=>{
					if (result.body.code== 200) {
						this.list = result.body.data
					}
				})
			},
			getpic(i){
				this.getPhotos(i)
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
			width: 100%;
		}
		// overflow: hidden;
		.photolist {
			height: 40px;
			position: relative;
			ul {
				position: absolute;
				width: 504px;
				height: 40px;
				margin: 0;
				li {
					float: left;
					line-height: 40px;
					font-size: 14px;
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
		img[lazy=loading] {
		  width: 40px;
		  height: 300px;
		  margin: auto;
		}
		.pic {
			margin: 0;
			li {
				margin: 7px 5px;
				box-shadow: 0 0 5px rgba(0, 0, 0, .4);
				border-radius: 8px;
			}
		}
	}
	
</style>