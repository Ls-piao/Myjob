<template>
	<view class="page">
		<view class="h-search">
			<image class="h-search-img" src="../../../static/Icon/search.png"></image>
			<view style="margin-top: -8rpx;" class="h-address-text">
				<text style="font-size: 25rpx;">请输入关键字~</text>
			</view>
		</view>
		<view class="aaa">
			<block v-for="(item,index) in itemList" :key="index">
				<view class="yudin-content">
					<view class="yudin-content-box">
						<view style="display: flex;">
							<view style="position: relative;">
								<image class="yudin-content-top-img" src="../../../static/Icon/pi1.png" mode=""></image>
								<text v-if="!item.istrue" style="color: #FFFFFF;font-size: 40rpx;position: absolute;left: 40rpx;top: 70rpx;">下架了</text>
							</view>
							<view style="margin-left: 20rpx;">
								<text style="">商品名称</text>
								<view style="display: flex;align-items: center;margin-top: 25rpx;">
									<text style="font-size: 30rpx;">￥20.3</text>
									 <view style="color: #3D7BFF;display: flex;justify-content: center;align-items: center;height: 100rpx;width: 150rpx;border: 1px solid #3D7BFF;margin-left: 30rpx;height: 50rpx;font-size: 30rpx;">
										参与优惠
									 </view>
									<!-- <view style="color: #C6C3C6;display: flex;justify-content: center;align-items: center;height: 100rpx;width: 150rpx;border: 1px solid #C6C3C6;margin-left: 30rpx;height: 50rpx;font-size: 30rpx;">
									 	不参与优惠
									 </view> -->
								</view>
							</view>
						</view>
						<view class="yudin-content-bottom">
							<view v-if="item.istrue" class="yudin-content-bottom-1 yudin-content-bottom-button">下架</view>
							<view v-else style="margin-right: 20rpx;" class="yudin-content-bottom-2 yudin-content-bottom-button">上架</view>
							<view class="yudin-content-bottom-1 yudin-content-bottom-button">删除</view>
						</view>
						</view>
				</view>
				<view class="fengei"></view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemList:[{
					user_phone: '',
					num: '',
					intime: 2019-12-21,
					istrue: true
				},{
					user_phone: '',
					num: '',
					intime: 2019-12-21,
					istrue: false
				}]
			}
		},
		onShow() {
		},
		computed:{
		},
		methods: {
			
		}
	}
</script>

<style>
@import url("addGoods.css");
</style>
