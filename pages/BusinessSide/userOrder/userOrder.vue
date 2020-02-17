<template>
	<view class="container">
		<view class="header">
			<view class="count">
				{{award.all_cash}}
			</view>
			<view class="total">
				累计补贴(元)
			</view>
		</view>
		
		
		
		<view class="userBox">
			<view class="boxLeft">
				<image src="../../../static/Bussines-img/9aae08e6beabeeef881fbdaef43e0b5.png" mode=""></image>
			</view>
			<view class="boxRight">
				<view class="username">
					123123
				</view>
				<view class="toMore" @tap="toMore(1)">
					查看详情
				</view>
			</view>
		</view>
		<view class="userBox">
			<view class="boxLeft">
				<image src="../../../static/Bussines-img/9aae08e6beabeeef881fbdaef43e0b5.png" mode=""></image>
			</view>
			<view class="boxRight">
				<view class="username">
					123123
				</view>
				<view class="toMore" @tap="toMore">
					查看详情
				</view>
			</view>
		</view>
		<view class="userBox">
			<view class="boxLeft">
				<image src="../../../static/Bussines-img/9aae08e6beabeeef881fbdaef43e0b5.png" mode=""></image>
			</view>
			<view class="boxRight">
				<view class="username">
					123123
				</view>
				<view class="toMore" @tap="toMore">
					查看详情
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		onLoad: (e) => {
			this.shopid = e.shopid
			this.phone = uni.getStorageSync('phone')
		},
		data(){
			return{
				phone:1,
				shopid:''
			}
		},
		methods:{
			toMore(e){
				uni.navigateTo({
					url:"../userDetails/userDetails?userid="+e
				})
			}
			
		}
	}
</script>

<style lang="less" scoped>
		.container{
			width: 95%;
			margin: 20upx auto;
			.header{
				height: 160upx;
				background: #3D7BFF;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				color: #fff;
				font-size: 28upx;
				.count{
					font-size: 36upx;
					font-weight: bold;
				}
			}
			.userBox{
				display: flex;
				margin: 10upx 0 20upx 0;
				box-shadow: 0 3px 2px rgba(0,0,0,0.2);
				.boxLeft{
					width: 100upx;
					height: 100upx;
						padding: 10px;
					image{
						width: 100upx;
						height: 100upx;
						overflow: hidden;
						border-radius: 50%;
						border: 1px solid #eee;
					

					}
				}
				.boxRight{
					flex: 1;
					display: flex;
					align-items: center;
					position: relative;
					.username{
						font-size: 36rpx;
						color: #ff6700;
						margin-left: 40upx;
					}
					.toMore{
						font-size: 25upx;
						color: #d1d1d1;
						position: relative;
						right: -300upx;
						
					}
				}
			}
		}
</style>
