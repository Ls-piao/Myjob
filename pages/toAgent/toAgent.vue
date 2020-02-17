<template>
	<view class="container">
		<image src="../../static/myteam/bg.png" class="bgurl" mode=""></image>
		<view class="box">

			<view class="content">
				<view class="person">
					<text class="left">推荐人ID</text><input type="number" v-model="teamid" class="right" />
				</view>
				<view class="price">
					<text class="left"> 价格</text> <text class="right">{{zprice}}元</text>
				</view>


			</view>
			<button type="primary" @tap="requestPayment" class="btn" style="background: #3D7BFF !important;">成为商务经理</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: uni.getStorage('phone'),
				agentperson: '',
				zprice:1299,
				teamid:''
			}
		},
		methods: {
			toPay() {
				// uni.navigateBack({
				// 	delta: 1
				// })
			},
			async requestPayment() {
				// 提交订单到后台商家
				var that = this
				
				if(this.teamid){
				if (parseFloat(this.zprice) != 0.00 && parseFloat(this.zprice) != 0) {
					console.log('正在支付')
					uni.showLoading({
						title: '正在支付...'
					});
					// 传入price,body,订单号（随机生成）
					// e.id为支付通道
					let orderId = this.randomOrder(0);
					console.log(orderId)
					let price = this.zprice
					let body = "莫等闲-预定支付";
					let orderInfo1 = await this.getOrderInfo(orderId, price, body);
					
			
			
					if (!orderInfo1.appid) {
						uni.showToast({
							title: '推荐人ID有误',
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
							uni.showToast({
								title: "支付成功!",
								icon: "none"
							})
							uni.switchTab({
								url: 'pages/me/me'
							})
						},
						fail: (e) => {
			
							uni.hideLoading();
						}
					})
				} else {
					uni.showToast({
						title: '订单不能为空',
						icon: 'none'
					});
				}
				}else{
					uni.showToast({
						title: '推荐人ID不能为空',
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
				let appid = "";
				// #ifdef APP-PLUS
				// appid = plus.runtime.appid;
				// #endif
				let url = 'https://ww.0816fc.net/index.php/home/Pay/pay'
				return new Promise((resolve) => {
					uni.request({
						url: url,
						method: "POST",
						data: {
							orderId: orderId,
							body: body,
							price: this.zprice,
							t_id:this.teamid,
							phone:this.phone
						},
						success: (result) => {
							console.log(result)
							resolve(result.data)
						},
						fail: (e) => {
							console.log(e)
							if(e.data == 3){
								uni.showToast({
									title: "推荐人ID有误",
									icon: "none"
								})
								return
							}
							resolve(e);
						}
					})
				})
			},
		},
		onLoad(){
			let phone = uni.getStorageSync('phone')
			this.phone = Number(phone)
		}
	
	}
</script>

<style lang="less" scoped>
	.container {
		background: #fafafa;
		.box{
			width: 90%;
			margin: 0 auto;
			margin-top: 698rpx;

		}
		.bgurl {
			position: absolute;
			left: 0;
			top: 0;
			width: 100vw;
			height: 100vh;
			z-index: -9999;
		}
	}

	.header {
		width: 100%;
		height: 400rpx;
		border: 1px solid red;
	}

	.content {
		padding-top: 100upx;
		margin-bottom: 100upx;

		>view {
			padding: 30upx;
			display: flex;
			height: 30upx;
			border-radius: 60upx;
			align-items: center;
			background: #fff;
			margin: 20upx 0;

			.left {
				width: 150upx;
				text-align: center;
				border-right: 1px solid #eee;
			}

			.right {
				flex: 1;
				padding: 0 20upx;
			}
		}


		.price {
			.right {
				font-size: 34upx;
				color: #ff8000;
			}
		}

	}

	.content,
	.btn {
		width: 80%;
		margin: 0 auto;

	}
</style>
