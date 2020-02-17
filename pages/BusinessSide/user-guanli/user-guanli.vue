<template>
	<view>
		<lbt />
		<view class="box" style="margin:0 auto;width: 90%;margin-top: 35rpx;">
			<view class="box1" style="display: flex;flex-direction: row;align-items: center;">
				<text style="color: #666666;font-size: 30rpx;padding-right: 10rpx;">提现金额</text>
				<text style="color: #ADADAD;">（收取1%手续费）</text>
			</view>
			<input style="width: 100%;border-radius: 5rpx;border: 1rpx solid #A9A9A9;margin-top: 25rpx; height: 90rpx;" v-model="tixian1" type="number" placeholder="请输入提现金额" placeholder-style="margin-left:20rpx;font-size:30rpx;color:#CCCCCC;padding-left:20rpx;"  />
			<view style="margin-bottom: 40rpx;font-size:30rpx;color: #6B6B6B;display: flex;flex-direction: row;justify-content: space-between;margin-top: 35rpx;">
				<view class="">可提余额<text style="color: #FF5F5F;padding: 0 5rpx;">￥{{tixian}}</text>人民币</view>
				<text style="font-size: 30rpx;color: #3377FF;margin-right: 10rpx;" @click="ktixian">全部提现</text>
			</view>
			<view style="color: #FFFFFF;width: 100%;height: 90rpx;margin: 0 auto;background: #3377FF;display: flex;justify-content: center;align-items: center;" @click="liji">
				立即提现
			</view>
<!-- 			<view style="font-size:25rpx;color:#3377FF;display: flex;justify-content: flex-end;margin-top: 60rpx;margin-right: 20rpx;">
				<view style="align-items: center;display: flex;justify-content: center;height: 70rpx;width: 180rpx;border: 1rpx solid #3D7BFF;">
					银行卡管理
				</view>
			</view> -->
		</view>	
	</view>
</template>

<script>
	import lbt from '@/components/jing-swiper/jing-swiper.vue';
	export default {
		components:{
			lbt
		},
		data() {
			return {
				tixian: 0,
				tixian1: '',
				shopid: ''
			}
		},
		onLoad:function(option) {
			this.tixian = option.money
			this.shopid = option.shopid
		},
		methods: {
			ktixian:function(){
				this.tixian1 = this.tixian
			},
			liji:function(){
				var that = this
				if(this.tixian1==0&&this.tixian1==''){
					uni.showToast({
						title: '提现金额不能为空',
						icon:'none'
					});
				}else{
					uni.showLoading({
					    title: '加载中'
					});
					uni.request({
						url: this.$bashUrl+ '/index.php/home/Api/store_cash/',
						method: 'POST',
						data:{
							id: this.shopid,
							cash: this.tixian1
						},
						success:(res=>{
							uni.hideLoading();
							console.log(res.data)
							if(res.data == 1){
								uni.showToast({
									title: '提现成功',
									icon:'none'
								});
								// uni.navigateTo({
								// 	url: '/pages/BusinessSide/tixianList/tixianList?shopid=' + this.shopid
								// })
								this.tixian = this.tixian - this.tixian1
								this.tixian1 = ''
							}else{
								uni.hideLoading();
								uni.showToast({
									title: '余额不足',
									icon:'none'
								})
							}
						})
					})	
				}
			}
		}
	}
</script>

<style>
@import url("user-guanli");
</style>
