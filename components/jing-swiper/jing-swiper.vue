<template>
	<view class="my-plan-style">
		<!-- 3D轮播 -->
		<view class="">
			<swiper class="imageContainer" @change="handleChange(current)" previous-margin="50rpx" next-margin="50rpx" circular>
				<block v-for="(item,index) in imgList" :key="index" >
					<swiper-item class="swiperitem">
						<image class="itemImg" :class="currentIndex == index ? 'swiperactive': ''" :src="item" lazy-load mode="scaleToFill"></image>
					</swiper-item>
				</block>
			</swiper>
		</view>
		<view class="item-box-content">
			<view :class="[a,{'item-box-crrunt':current1 == 0}]"></view>
			<view :class="[a,{'item-box-crrunt':current1 == 1}]"></view>
			<view :class="[a,{'item-box-crrunt':current1 == 2}]"></view>
		</view>
	</view>
</template>
<script>
	export default {
		data(){
			return {
				a: 'item-box',
				imgList:[
				'/static/imgs/33333.png',
				'/static/imgs/33333.png',
				'/static/imgs/33333.png'
				],
				current: 0,
				current1: 0
			}
		},
		methods:{
			handleChange:function(index){
				if(index<2){
					this.current+=1;
					this.current1+=1
				}else{
					this.current=0;
					this.current1=0
				}
			}
		}
	}	
</script>
<style lang="scss">
	// 3D轮播样式
	.imageContainer {
		width: 100%;
		/* height: 500rpx; */
		/* background: #000; */
		height: 325upx;
		background-color: #fff;
	}
	
	.swiperitem {
		/* height: 500rpx; */
		height: 255upx;
		padding: 0upx 20upx;
		box-sizing: border-box;
		position: relative;
		.swiperText {
			display: flex;
			flex-direction: column;
			align-items: center;
			position: absolute;
			top: 56upx;
			left: 51upx;
			z-index: 998;
			width:162upx;
			height:163upx;
			background:rgba(255,255,255,1);
			border-radius:8upx;
			padding:10upx;
			.name {
				font-size:26upx;
				font-weight:500;
				color:rgba(253,57,91,1);
				line-height:37upx;
				margin-bottom: 10upx;
			}
			.zq,.cz {
				font-size:20upx;
				color:rgba(253,57,91,1);
				line-height:35upx;
			}
			.addNl {
				width:120upx;
				height:26upx;
				background:rgba(253,57,91,1);
				border-radius:13upx;
				font-size:20upx;
				font-weight:500;
				color:rgba(255,255,255,1);
				text-align: center;
				line-height: 26upx;
				margin-top: 10upx;
			}
			
		}
	}
	
	.itemImg {
		position: absolute;
		width: 95%;
		/* height: 380rpx; */
		height: 255upx;
		border-radius: 15rpx;
		z-index: 5;
		top: 5%;
		box-shadow:0px 4upx 15upx 0px rgba(153,153,153,0.24);
	}
	
	.swiperactive {
		width: 95%;
		opacity: 1;
		z-index: 10;
		/* height: 430rpx; */
		height: 287upx;
		top: 0%;
		transition: all .2s ease-in 0s;
		background: #000000;
		border-radius: 40rpx;
	}
	
	.zhankai{
		text-align: center;
		.iconfont{
			margin-left: 5rpx;
		}
	}
	.item-box-content{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-top: -20rpx;
	}
	.item-box{
		height: 15rpx;
		width: 15rpx;
		border-radius: 50%;
		border: 1rpx solid #9E9E9E;
		margin-right: 10rpx;
	}
	.item-box-crrunt{
		background: #444444;
	}
</style>