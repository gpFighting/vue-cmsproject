<template>
	<div class="photoinfo">
		<div class="phototitle">
			<h1>{{data.title}}</h1>
			<div class="phototime">
				<span>发表时间：{{data.add_time | dateFormat}}</span>
				<span>点击： {{data.click}}次</span>
			</div>
		</div>

		<hr>

		<vue-preview :slides="slide1" @close="handleClose" height="100"></vue-preview>
		<div v-html="data.content" class="photoinfo-des"></div>
		<comment :cmtid="id"></comment>

	</div>
</template>

<script>
	import comment from '../subcom/comment.vue'
	export default {
		data(){
			return {
				id: this.$route.params.id,
				slide1: [],
				data: {}
			}
		},
		created(){
			this.getPhotoInfo(),
			this.getPhotoDes()
		},
		methods: {
			getPhotoInfo(){
				this.$http.get('api/getimageInfo/'+ this.id).then(result=>{
					if (result.body.status==0) {
						// console.log(result)
						this.data = result.body.message[0]
					}
				})
			},
			getPhotoDes(){
				this.$http.get('api/getthumimages/'+this.id).then(result=> {
					// console.log(result)
					if (result.body.status ==0) {
						result = result.body.message;

						result.forEach(item=>{
							item.msrc = item.src;
							item.w = 600;
							item.h = 400;
						})
						this.slide1 = result
					}
				})
			},
			handleClose(){}
		},
		components: {
			comment
		}
	}
</script>

<style type="text/css" lang="less">

	.photoinfo {
		padding: 10px;
		.phototitle {
			h1 {
				font-size: 15px;
				color: #177AD3;
				text-align: center;
				margin: 10px 0;
			}
			.phototime {
				font-size: 14px;
				color: #999;
				display: flex;
				justify-content: space-between;
			}

		}
		.my-gallery {
			overflow: hidden;
			figure {
				margin: 0 5px 10px 5px;
				width: 100px;
				height: 100px;
				float: left;
			}
			img {
				height: 100px;
				box-shadow: 0 0 10px #999;
			}
		}
		.photoinfo-des {
			font-size: 14px;
			line-height: 30px;
		}
	}
</style>