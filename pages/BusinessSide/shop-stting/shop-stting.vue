<template>
	<view>
		<view class="fengei"></view>
		<view style="background: #FFFFFF;height: 150rpx;width: 100%;">
			<view style="align-items: center;width: 90%;margin: 0 auto;display: flex;flex-direction:row;padding-top: 40rpx;justify-content: space-between;">
				<text style="color: #898989;">商户logo</text>
				<image style="margin-top:-20rpx;height: 100rpx;width: 100rpx;padding-top: 10rpx;" src="../../../static/imgs/1297.png" mode=""></image>
			</view>
		</view>
		<view class="fengei"></view>
		<view class="aa">
			<view class="a" >
				<text style="color: #666666;">商户名称</text>
				<input style="margin-left: 30rpx;" type="text" placeholder="请输入您的商户名称" placeholder-style="color:#B2B2B2;"/>
			</view>
			<view class="a" >
				<text style="color: #666666;">商户简介</text>
				<input style="margin-left: 30rpx;" type="text" placeholder="请输入您的商户名称" placeholder-style="color:#B2B2B2;"/>
			</view>
			<view class="a" >
				<text style="color: #666666;">联系人</text>
				<input style="margin-left: 70rpx;" type="text" placeholder="请输入联系人" placeholder-style="color:#B2B2B2;"/>
			</view>
			<view class="a" >
				<text style="color: #666666;">手机号</text>
				<input style="margin-left: 70rpx;" type="text" placeholder="请输入手机号"  placeholder-style="color:#B2B2B2;"/>
			</view>
		</view>
		<view style="position: fixed;bottom: 0;width: 100%;height: 100rpx;background: #3D7BFF;display: flex;justify-content: center;align-items: center;color: #FFFFFF;font-size: 30rpx;">
			保存
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.aa{
	width: 90%;
	margin: 0 auto;
	background: #FFFFFF;
}
.a{
	padding-bottom: 20rpx;
	height: 90rpx;
	display: flex;
	padding-top: 20rpx;
	flex-direction: row;
	align-items: center;
	border-bottom: 1rpx solid #DEDEDE;
}
.fengei{
	height: 25rpx;
	width: 100%;
	background: #F3F3F3;
}
</style>
