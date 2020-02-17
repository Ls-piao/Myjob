<template>
	<view class="container">
			<view class="content">
				<view class="user">
					顾客电话 :  
				</view>
				<view class="user">
					顾客订单：
					<view  >
					  啊啊啊	X 1
					</view>
				</view>
				
			</view>
	</view>
</template>

<script>
	 export default{
		 onLoad(e){
			 this.id = e.id
			 uni.request({
				 url: this.$bashUrl + '/index.php/home/Api/my_order_info/',
				 method: 'POST',
				 data: {
				 	good_id: this.id
				 },
				 success:res=>{
					 console.log(res)
					 this.orderInfo = res.data
						
				 }
			 })
		 },
		 data(){
			 return{
				 id:0,
				 orderInfo:{}
			 }
		 },
		 method:{
			 
		 }
	 }
</script>

<style lang="less"  scoped>
	.container{
		margin: 20upx;
		box-shadow: 10upx 10upx 10upx rgba(0,0,0,0.2);
		.content{
			padding: 30upx;
			>view{
				margin: 20upx 0;
				padding: 20upx 0;
				border-bottom: 1px solid #eee;
				font-size: 30upx;
				color: #666;
				>view{
					color: #000;
					font-size:28upx;
					font-weight: 600;
					margin: 20upx;
					margin-left: 20upx;
				}
			}
		}
	}
</style>
