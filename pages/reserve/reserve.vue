<template>
	<view class="a">
		<tab-control :current="current" :values="items" bgc="#fff" :fixed="true" :scrollFlag='true' @clickItem="onClickItem">
			<!-- 使用 swiper 配合 滑动切换 -->
			<swiper class="swiper" style="height: 100%;" :current='current'>
				<swiper-item v-for="(item,index) in items" :key='index'>
					<view class="swiperItem">{{item}}</view>
				</swiper-item>
			</swiper>
		</tab-control>

		<view class="itemList" v-if="current==0">
			<block v-for="(item,index) in itemList" :key="index">
				<!-- <view class="item-boxa">
					<view class="lefta">
						<view class="itemList-title">
							<text class="itemList-title-h">{{item.store_name}}</text>
							<text :class="item.states === '待确认' ? 'aa' : 'bb'">{{item.states}}</text>
						</view>
						<view class="itemList-center">
							<image class="itemList-center-img" :src="imgUrl+item.img"></image>
							<view class="itemList-center-text">
								<text class="itemList-center-text-1">就餐时间:   {{item.point_time}}</text>
								<view>就餐人数:  <text class="itemList-center-text-2">{{item.num}}人</text></view>
							</view>
						</view>
						<view class="itemList-text">
							<view class="itemList-text-t">
								<view class="itemList-text-t-1">
									<text class="itemList-text-t-1-1">预约订座</text>
								</view>
								<view class="itemList-text-t-2">下单时间:<text class="itemList-text-t-3">{{item.intime}}</text></view>
							</view>
							<view class="itemList-text-b">
								<text class="itemList-text-b-a">
									{{item.state_content}}
								</text>
							</view>
						</view>
					</view>
				</view> -->
				<!-- 预约订单 -->
				<view class="item-boxa" @click="ReservationItem(item)">
					<view class="lefta">
						<view class="itemList-title">
							<text class="itemList-title-h">{{item.store_name}}</text>
							<text v-if="!item.goods_id" class="aa">您还未选择商品！</text>
							<text v-else-if="item.pay_state==0" class="aa">未付款</text>
							<text v-else :class="item.states === '待确认' ? 'aa' : 'bb'">{{item.states}}</text>
						</view>
						<view class="itemList-center">
							<image class="itemList-center-img" :src="imgUrl+item.img"></image>
							<view class="itemList-center-text">
								<text class="itemList-center-text-1">就餐时间: {{item.point_time}}</text>
								<view>就餐人数: <text class="itemList-center-text-2">{{item.num}}人</text></view>
							</view>
						</view>
						<view class="itemList-text">
							<view class="itemList-text-t">
								<view class="itemList-text-t-1">
									<text class="itemList-text-t-1-1">预约订座</text>
								</view>
								<view class="itemList-text-t-2">下单时间:<text class="itemList-text-t-3">{{item.intime}}</text></view>
								<text v-if="itam.pay_state==1" style="color: #00C777;font-size: 20upx;">已支付</text>

							</view>
							<view class="itemList-text-b">
								<text class="itemList-text-b-a">
									{{item.state_content}}
								</text>
							</view>
						</view>
					</view>
				</view>
			</block>
		</view>
		<view class="itemList" v-else-if="current==1">
			<block v-for="(item,index) in itemList4" :key="index">
				<!-- 排队订单 -->
				<view class="item-boxa" v-if="item.type == 1">
					<view class="lefta">
						<view class="itemList-title">
							<text class="itemList-title-h">{{item.store_name}}</text>
							<text :class="item.state == 0 ? 'aa' : 'bb'">{{item.state==0?"待确认":"已完成"}}</text>
						</view>
						<view class="itemList-center">
							<image class="itemList-center-img" :src="imgUrl+item.img"></image>
							<view class="itemList-center-text">
								<text class="itemList-center-text-1">排队号数: {{item.num}}</text>
								<view>前方人数: <text class="itemList-center-text-2">{{item.people}}人</text></view>
							</view>
						</view>
						<view class="itemList-text">
							<view class="itemList-text-t">
								<view class="itemList-text-t-1">
									<text class="itemList-text-t-1-1">{{item.state==0?"正在排队":"已完成"}}</text>
								</view>
								<view class="itemList-text-t-2">取号时间:<text class="itemList-text-t-3">{{item.intime}}</text></view>
								<view class="itemList-text-t-cancel">
									<button v-if="item.state==0" @tap="delYuyue(item.id)" style="font-size: 20rpx;background: #DD524D;color: #fff;">取消预约</button>
								</view>
							</view>
							<view class="itemList-text-b">
								<text class="itemList-text-b-a">
									{{item.state_content}}
								</text>
							</view>
						</view>
					</view>
				</view>
			</block>
		</view>
		<view class="itemList" v-else-if="current==2">
			<!-- 全部订单 -->
			<block v-for="(item,index) in itemList" :key="index">
				<view class="item-boxa">
					<view class="lefta">
						<view class="itemList-title">
							<text class="itemList-title-h">{{item.store_name}}</text>
							<text class="cc">{{item.zhuangtaia}}</text>
						</view>
						<view class="itemList-center">
							<image class="itemList-center-img" :src="imgUrl+item.img"></image>
							<view class="itemList-center-text">
								<text class="itemList-center-text-1">就餐时间:{{item.point_time}}</text>
								<view>就餐人数: <text class="itemList-center-text-2">{{item.num}}人</text></view>
							</view>
						</view>
						<view class="sada">
							<view class="itemList-text">
								<view class="itemList-text-t">
									<view class="itemList-text-t-1">
										<text class="itemList-text-t-1-1">预约订座</text>
									</view>
									<view class="itemList-text-t-2">下单时间:<text class="itemList-text-t-3">{{item.intime}}</text></view>
								</view>
							</view>
							<view class="itemList-text-button">
								<view v-if="item.comment_type==0" @click="ToPingjia" :data-id="item.id">
									去评价
								</view>
								<view v-else>
									已评价
								</view>
							</view>
						</view>
					</view>
				</view>
			</block>
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
				items: ['预约', '排队'],
				// items: ['预约', '排队', '订单评价'],
				current: 0,
				itemList: [],
				imgUrl: '',
				itemList1: [],
				itemList2: [],
				itemList4: [],
				Did: '',
				phone: '',
				newlength: 0,
				time: '05:00',
				isCancel:false
			}
		},
		onShow: function() {
			let now  = new Date().getTime()
			this.pageInit()
		},
		methods: {
			deTime(all, id) {
				var timer = setInterval(() => {
					all--;
					var time = (Math.floor(all / 1000 / 60) + '').padStart(2, "0") + ":" + (Math.floor(all % 60) + '').padStart(2,
						"0")
					this.time = time
				}, 1000)
				if (all < 0) {
					console.log('删除订单')
					clearInterval(timer)
					uni.request({
						url: this.$bashUrl + '/index.php/home/Api/cancel_line',
						method: "post",
						data: {
							id
						},
						success: res => {
							console.log(res)
							
						},
						fail: err => {
			
						}
					})
				}
			},
			toComment(id) {
				uni.navigateTo({
					url: '/pages/pingjia/pingjia?id=' + id,
				})
			},
			pageInit() {
				this.phone = uni.getStorageSync('phone')
				this.imgUrl = this.$imgUrl
				var that = this
				uni.request({
					url: this.$bashUrl + '/index.php/home/Api/my_orders/',
					method: 'POST',
					data: {
						id: this.phone
					},
					success: (res => {
						console.log("--------------------------------------")
						console.log(res)
						console.log("--------------------------------------")

						if (!res.data) {
							return false;
						}
						that.itemList1 = []
						that.itemList2 = []
						res.data.reverse()
						console.log(res.data)
						let now = new Date().getTime()
						let arr = []
						res.data.forEach(item=>{
							let d = new Date(item.intime).getTime()+5*60*1000
							if(d - now <0 && item.pay_state==0){
								uni.request({
									url: this.$bashUrl + '/index.php/home/Api/cancel_apriont',
									method: "post",
									data: {
										id:item.id
									},
									success: res => {
									
									},
									fail: err => {
								
									}
								})
							}else{
								arr.push(item)
							}
						})
						console.log(arr)
						that.itemList = arr
						// 分组显示
						that.newlength = that.itemList.length
						for (var i = 0; i < that.itemList.length; i++) {
							// && that.itemList[i].state == 0
							if (that.itemList[i].state == 1) {
								// 已确认,待确认
								that.itemList1.push(that.itemList[i])
							} else if (that.itemList[i].state == 2) {
								// 待评价
								that.itemList2.push(that.itemList[i])
							}
						}
					})
				})
				uni.request({
					url: this.$bashUrl + '/index.php/home/Api/my_lines/',
					method: 'POST',
					data: {
						phone: this.phone
					},
					success: (res => {
						console.log(res)
						that.itemList4 = []
						that.itemList2 = []
						console.log(res)
						for (var i = 0; i < res.data.length; i++) {
							if (res.data[i].state == 0 || res.data[i].state == 1) {
								// 可使用
								that.itemList4.push(res.data[i])
							} else if (res.data[i].state == 1) {
								// 待评价
								// that.itemList.push(res.data[i])
							} else {
								// 什么都不做
							}

							// if(res.data[i].pay_state=='0'){
							// 		var all = 300
							// 		time = ""
							// 		this.deTime(all,time)

							// }
						}




					})
				})
			},
			delYuyue(id) {
				uni.request({
					url: this.$bashUrl + '/index.php/home/Api/cancel_line',
					method: "post",
					data: {
						id
					},
					success: res => {
						console.log(res)
						uni.showToast({
							title: "取消成功"
						})
						this.pageInit()
					},
					fail: err => {
						uni.showToast({
							title: "取消失败"
						})
						this.pageInit()
					}
				})
			},
			ReservationItem: function(order)

			{
				
				if (!order.goods_id) {
					console.log('无商品')
					uni.navigateTo({
						url: '/pages/dianchan/dianchan?aid=' + order.store_id + '&orderid=' + order.id
					})
				} else {
					console.log(123123)
					uni.navigateTo({
						url: '../orderDetails/orderDetails?orderid=' + order.id
					})
				}

			},
			onClickItem: function(val) {
				this.current = val.currentIndex
				// console.log("点击了事件"+val.currentIndex)
			},
			ToPingjia: function(e) {
				var currentaa = e.currentTarget.dataset.id
				uni.navigateTo({
					url: '/pages/pingjia/pingjia?id=' + currentaa,
				})
			},
		}
	}
</script>

<style>
	@import url("reserve.css");
</style>
