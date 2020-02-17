<template>
	<view>
		<view class="box-swiper">
			<tab-control :current="current" :values="items" bgc="#fff" :scrollFlag='true' @clickItem="onClickItem"></tab-control>
			<!-- 使用 swiper 配合 滑动切换 -->
			<swiper class="swiper" style="height: 100%;" :current='current'>
				<swiper-item v-for="(item,index) in items" :key='index'>
					<view class="swiperItem">{{item}}</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="box-swiper-border">
			<view class="box-swiper-text">
				当前有<text style="color: #FF5B5B;">{{paidui}}</text>位顾客排队
			</view>
		</view>
		<view v-if="current==0">
			<blcok v-for="(item,index) in a" :key="index">
				<view class="user-item">
					<view class="user-item-box">
						<!-- <image style="width: 90rpx;height: 90rpx;border-radius: 50%;background-color: #B2B2B2;" src="" mode=""></image> -->
						<view class="user-item-txt">
							<!-- 						<text>用户名</text> -->
							<view class="user-item-txt-1">
								<view style="font-size: 35rpx;">{{item.phone}}</view>
								<view class="user-item-txt-2">
									<text>排号:</text>
									<text style="font-size: 30rpx;color: #007AFF;padding-left: 35rpx;padding-top: 5rpx;">{{index+1}}</text>
								</view>
							</view>
						</view>
					</view>
					<view class="user-item-item">
						<view class="orderdetails">
							<text   @click="toDetail(item.id)"> 查看订单详情 > </text>
						</view>
						<view class="userBtn">

							<view @click="quxiao(item.id)" class="user-item-item-1 user-item-item-left">
								取消
							</view>
							<view @click="tongzhi(item.id)" class="user-item-item-1 user-item-item-right">
								确认通知
							</view>
						</view>
					</view>
					<view class="fenge"></view>
				</view>
			</blcok>
		</view>
		<view v-if="current==1">
			<blcok v-for="(item,index) in b" :key="index">
				<view class="user-item">
					<view class="user-item-box">
						<!-- <image style="width: 90rpx;height: 90rpx;border-radius: 50%;background-color: #B2B2B2;" src="" mode=""></image> -->
						<view class="user-item-txt">
							<!-- 						<text>用户名</text> -->
							<view class="user-item-txt-1">
								<view style="font-size: 35rpx;">{{item.phone}}</view>
								<view class="user-item-txt-2">
									<text>排号:</text>
									<text style="font-size: 30rpx;color: #007AFF;padding-left: 35rpx;padding-top: 5rpx;">{{index+1}}</text>
								</view>
							</view>
						</view>
					</view>
					<view class="fenge"></view>
				</view>
			</blcok>
		</view>
		<view v-if="current==2">
			<blcok v-for="(item,index) in c" :key="index">
				<view class="user-item">
					<view class="user-item-box">
						<!-- <image style="width: 90rpx;height: 90rpx;border-radius: 50%;background-color: #B2B2B2;" src="" mode=""></image> -->
						<view class="user-item-txt">
							<!-- <text>用户名</text> -->
							<view class="user-item-txt-1">
								<view style="font-size: 35rpx;">{{item.phone}}</view>
								<view class="user-item-txt-2">
									<text>排号:</text>
									<text style="font-size: 30rpx;color: #007AFF;padding-left: 35rpx;padding-top: 5rpx;">{{index+1}}</text>
								</view>
							</view>
						</view>
					</view>
					<!-- 					<view class="user-item-item">
						<view @click="quxiao(item.id)" class="user-item-item-1 user-item-item-left">
							留言取消
						</view>
						<view @click="tongzhi(item.id)" class="user-item-item-1 user-item-item-right">
							确认通知
						</view>
					</view> -->
					<view class="fenge"></view>
				</view>
			</blcok>
		</view>

	</view>
</template>

<script>
	import tabControl from '@/components/tabControl-tag/tabControl-tag.vue';
	export default {
		components: {
			tabControl
		},
		data() {
			return {
				current: 0,
				items: ['排队中', '已接待', '已取消'],
				a: [],
				b: [],
				c: [],
				paidui: 0,
				shopid: 0
			}
		},
		onLoad(e) {
			this.shopid = e.shopid

		},
		onShow() {
			var that = this
			this.pageInit()
		},
		methods: {
			toDetail(id) {
				uni.navigateTo({
					url: "../paiduiorderDetails/paiduiorderDetails?id="+id
				})
			},
			onClickItem: function(val) {
				this.current = val.currentIndex
			},
			pageInit() {
				var that = this
				that.a = []
				that.b = []
				that.c = []
				uni.request({
					url: this.$bashUrl + '/index.php/home/Api/store_line/',
					method: 'POST',
					data: {
						id: this.shopid,
					},
					success: (res => {
						console.log(res)
						for (var i = 0; i < res.data.length; i++) {
							if (res.data[i].state == 0) {
								that.a.push(res.data[i])
							} else if (res.data[i].state == 1) {
								that.b.push(res.data[i])
							} else if (res.data[i].state == 2) {
								that.c.push(res.data[i])
							}
						}
						that.paidui = that.a.length
					}),
					fail: (err => {
						console.log(err)
					})
				})
			},
			// 排队中取消状态
			tongzhi: function(id) {
				var that = this
				uni.request({
					url: this.$bashUrl + '/index.php/home/Api/store_linetype/',
					method: 'POST',
					data: {
						id: id,
						type: 1,
					},
					success: (res => {
						uni.showToast({
							title: '通知成功'
						});
						this.a = []
						this.b = []
						this.c = []
						this.pageInit()
					}),
					fail: (err => {
						console.log(err)
					})
				})
			},
			quxiao: function(id) {
				var that = this
				uni.request({
					url: this.$bashUrl + '/index.php/home/Api/store_linetype/',
					method: 'POST',
					data: {
						id: id,
						type: 2,
					},
					success: (res => {
						uni.showToast({
							title: '取消成功',
							icon: 'none'
						})
						this.a = []
						this.b = []
						this.c = []
						this.pageInit()
					})
				})
			}
		}
	}
</script>

<style>
	@import url("paidui.css");
</style>
