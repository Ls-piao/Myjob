<template>
	<view class="container">
		<view class="state">
			<view class="stats-text">
				<image :src="orderList.state==0?'../../static/wait.png':'../../static/right.png'" mode="" class="icon"></image>
				<text v-if="orderList.pay_state!=0"> {{orderList.state==0?'等待餐厅确认':'预约成功'}}</text>
				<text v-else-if="orderList.pay_state==0&&orderList.state==0">请先付款</text>
			</view>
			<view class="state-content">
				<view class="state-state">
					状态：
					<text v-if="orderList.pay_state!=0" :class="orderList.state==0||orderList.state==3?'wait':'right'">
						{{orderList.state==0?'待商家确认':'已预约'}} </text>
					<text v-else> 未付款 </text>
				</view>
				<evan-steps :active="waiState" primaryColor="green">
					<evan-step :title="orderList.intime" description="请先支付订单"></evan-step>
					<evan-step :title="orderList.intime" description="订单预约提交成功,等待商家处理"></evan-step>
					<evan-step :title="orderList.state==0?'待商家确认':'已预约'" :description="orderList.state_content"></evan-step>
				</evan-steps>
			</view>
		</view>
		<view class="order">
			<view class="orderShop">
				<view class="shopName">
					<text> {{name}}</text>
				</view>
			</view>
			<view class="orderDetails">
				<view class="orderTime">
					就餐时间:{{orderList.point_time}}
				</view>
				<view class="orderTime">
					就餐桌号:{{tablename}}
				</view>
				<view class="orderNum">
					就餐人数:{{orderList.num}}
				</view>
				<view class="orderPhone">
					顾客电话:{{orderList.user_phone}}
				</view>
				<view class="orderPhone">
					商家电话:{{storephone}}
				</view>
				<view class="orderMenu">
					订单列表:
					<view class="menuGoods" v-for="(item,index) in goodList" :key="index">
						<view>
							{{item}} x 1
						</view>
					</view>
				</view>
				<view class="total">
					总计: <text> {{orderList.money}}</text>
				</view>

			</view>
			<view class="btn" v-if="orderList.pay_state==0&&orderList.state==0" @tap="requestPayment(orderList.goods,orderList.id)">
				<text> {{time}}</text>
				<text> 去付款 </text>
			</view>
			<view class="btn" v-if="orderList.state==0&&orderList.pay_state!=0" @tap="refund(orderList.id)">
				<text> 取消并申请退款 </text>
			</view>
		</view>

	</view>



</template>

<script>
	import EvanSteps from '@/components/evan-steps/evan-steps.vue'
	import EvanStep from '@/components/evan-steps/evan-step.vue'
	import UniIcons from '@/components/uni-icons/uni-icons.vue'
	import EvanIcons from '@/components/evan-icons/evan-icons.vue'
	export default {
		components: {
			EvanSteps,
			EvanStep,
			UniIcons,
			EvanIcons
		},
		onLoad(e) {
			this.phone = uni.getStorageSync('phone')
			console.log(this.phone)
			this.orderid = Number(e.orderid)
			console.log(this.orderid)
			uni.request({
				url: this.$bashUrl + '/index.php/home/Api/my_order_info/',
				method: 'POST',
				data: {
					good_id: this.orderid
				},
				success: res => {
					console.log(res)
					this.orderList = res.data.infos
					if (this.orderList.orderid == 0) {
						this.orderId = this.randomOrder(0)
					} else {
						this.orderId = Number(this.orderList.orderid)
					}
					this.storephone = res.data.store_phone
					this.name = res.data.store_name
					this.goodList = res.data.infos.goods.split(',')
					this.goodList.pop()
					console.log(this.goodList)
					uni.request({
						url: this.$bashUrl + '/index.php/home/Api/table_names/',
						method: 'POST',
						data: {
							id: Number(this.orderList.table_id)
						},
						success: res => {
							console.log(res)
							this.tablename = res.data[0].table_name
						},
						fail(err) {
							console.log(err)
						}
					})
					if(this.orderList.pay_state==0&&this.orderList.state==0){
						this.waiState = 0
						let time = this.orderList.intime.replace(/-/g,'/')
						console.log(time-1)
						let d = new Date(time).getTime()+5*1000*60
						let now = new Date().getTime()
						let s = d - now
												
						console.log(d)
						console.log(now)
						console.log(s)
						if(s <= 0){
							uni.showToast({
								title:"订单已超时",
								icon:"none"
							})
							setTimeout(()=>{
								uni.request({
									url: this.$bashUrl + '/index.php/home/Api/cancel_apriont',
									method: "post",
									data: {
										id:this.orderList.id
									},
									success: res => {
										console.log(res)
										uni.showToast({
											title: '已取消预约'
										})
										uni.navigateBack({
											delta: 1
										})
									},
									fail: err => {
								
									}
								})
							},1000)
						}else{
						this.deTime(s, this.orderList.id)
						}
					}else if(this.orderList.pay_state==0&&this.orderList.state==1){
							this.waiState = 1
					}
					else{
						if (this.orderList.pay_state == 0) {
							
							// let all = d + 5000 * 60
							// let now = all - d
							// this.deTime(now, this.orderList.id)
						} else {
							if (this.orderList.state == 0) {
								this.waiState = 2
							} else {
								this.waiState = 3
							}
						}
					}
					

				}
			})
			
		},
		methods: {
			async requestPayment(e, index) {
				// 提交订单到后台商家
				var that = this


				if (parseFloat(this.zprice) != 0.00 && parseFloat(this.zprice) != 0) {
					console.log('正在支付')
					uni.showLoading({
						title: '正在支付...'
					});
					// 传入price,body,订单号（随机生成）
					// e.id为支付通道
					let orderId = '';
					orderId = this.orderId
					console.log(orderId)
					let price = this.zprice
					let body = "莫等闲-预定支付";
					let orderInfo1 = await this.getOrderInfo(orderId, price, body);



					if (!orderInfo1.appid) {
						uni.showToast({
							title: '支付信息有误',
							icon: 'none'
						});
						uni.hideLoading();
						return false;
					}
					// 生成签名支付签名算法
					var obj = {
						appid: orderInfo1.appid, //id 应用id
						partnerid: orderInfo1.partnerid, //商户号 
						prepayid: orderInfo1.prepayid, //预支付
						package: 'Sign=WXPay',
						noncestr: orderInfo1.noncestr,
						timestamp: orderInfo1.timestamp, //时间戳
						sign: orderInfo1.sign
					}
					let orderInfo = JSON.stringify(obj)

					uni.requestPayment({
						provider: 'wxpay',
						orderInfo: orderInfo,
						success: (e) => {
							// that.dddd = e

							uni.request({
								url: this.$bashUrl + '/index.php/home/Api/user_order/',
								method: 'POST',
								data: {
									id: this.orderid,
									price: parseInt(this.orderList.money),
									goods: this.orderList.goods_id,
								},
								success(res) {
									uni.showToast({
										title: "支付成功!",
										icon: "none"
									})
									uni.hideLoading();
									// 成功后跳转到tab页面
									setTimeout(function() {
										uni.switchTab({
											url: '/pages/reserve/reserve'
										});
									}, 2000);
								},
								fail(err) {
									uni.hideLoading();
									console.log(err)
								}
							})
						},
						fail: (e) => {

							uni.hideLoading();
						},
						complete: () => {
							uni.switchTab({
								url: 'pages/reserve/reserve'
							})
						}
					})
				} else {
					uni.showToast({
						title: '订单不能为空',
						icon: 'none'
					});
				}
			},
			randomOrder(value) {
				for (var i = 0; i < 6; i++) //6位随机数，用以加在时间戳后面。
				{
					value += Math.floor(Math.random() * 10);
				}
				return new Date().getTime() + value; //时间戳，用来生成订单号。
			},
			getOrderInfo(orderId, price, body) {
				console.log('=============================')
				console.log(orderId)
				console.log('=============================')
				let goodsList = this.orderList.goods_id.split(',')
				let appid = "";
				// #ifdef APP-PLUS
				// appid = plus.runtime.appid;
				// #endif
				let url = 'https://ww.0816fc.net/index.php/home/Pay/pay'

				console.log(this.orderid)
				return new Promise((resolve) => {
					uni.request({
						url: url,
						method: "POST",
						data: {
							id: this.orderid,
							orderId: orderId,
							body: body,
							price: parseInt(this.orderList.money),
							goods: goodsList,
						},
						success: (result) => {
							console.log(result)
							resolve(result.data)
						},
						fail: (e) => {
							console.log(e)
							resolve(e);
						}
					})
				})
			},
			toShop(id) {

			},
			toPay() {

			},
			refund(id){
				uni.showModal({
					title:'取消并申请退款',
					content:'申请退款联系客服人员 加wx:sjrfsjz',
					confirmText:'确认',
					success:(res)=>{
						if(res.confirm){
						uni.request({
							url: this.$bashUrl + '/index.php/home/Api/cancel_apriont',
							method: "post",
							data: {
								id
							},
							success: res => {
								console.log(res)
								uni.showToast({
									title: '已取消预约'
								})
								uni.navigateBack({
									delta: 1
								})
							},
							fail: err => {
						
							}
						})
						uni.navigateBack({
							delta:1
						})
						}
					}
				})
			},
			deTime(all, id) {
				var timer = setInterval(() => {
					all-=1000
					var time = (Math.floor(all / 1000 / 60) + '').padStart(2, "0") + ":" + (Math.floor(all /1000% 60) + '').padStart(2,"0")
					this.time = time
					if (this.time < 0) {
						clearInterval(timer)
						uni.request({
							url: this.$bashUrl + '/index.php/home/Api/cancel_apriont',
							method: "post",
							data: {
								id
							},
							success: res => {
								console.log(res)
								uni.showToast({
									title: '已取消预约'
								})
								uni.navigateBack({
									delta: 1
								})
							},
							fail: err => {
					
							}
						})
					}
				}, 1000)
				
			
			}
		},
		data() {
			return {
				phone: 0,
				tablename: '',
				orderList: [],
				goodList: [],
				orderid: 0,
				name: '',
				waiState: 1,
				time: "05:00",
				storephone:'',
				orderId: 0
				
			}
		},

	}
</script>

<style lang="less" scoped>
	.stats-text {
		font-size: 30upx;
		border-top: 1px solid #ececec;
		border-bottom: 1px solid #ececec;
	}

	.icon {
		width: 50upx;
		height: 50upx;
		vertical-align: middle;
		padding: 30upx;
	}

	.state-content {
		padding: 30upx;
	}

	.state-state {
		margin: 30upx 0;
		;

		.wait {
			color: #DD524D;
		}

		.right {
			color: #00C777;
		}
	}

	.order {
		border-top: 30upx solid #ececec;
		border-bottom: 30upx solid #ececec;
	}

	.shopName {
		font-size: 40upx;
		padding: 30upx;

		image {
			width: 10upx;
			height: 20upx;
			float: right;
			margin-top: 20upx;
		}
	}

	.orderDetails {
		padding: 30upx;
		color: #8c8c8c;
		font-size: 30upx;

		>view {
			margin: 20upx 0;
		}

		.orderMenu {
			.menuGoods {
				font-size: 25upx;
				color: #000000;
				margin: 15upx;
			}
		}
	}

	.total {
		margin-bottom: 80upx;

		text {
			font-size: 35upx;
			color: #DD524D;
		}
	}

	.btn {
		background: #DD524D;
		width: 100%;
		height: 80upx;
		font-size: 30upx;
		color: #fff;
		border-radius: 15upx;
		display: flex;
		justify-content: center;
		align-items: center;

		text {

			text-align: center;
		}
	}
</style>
