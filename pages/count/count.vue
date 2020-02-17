<template>
	<view class="container">
		<view class="header">
			<view class="shopname">
				{{shopname}}
			</view>
			<view class="list">
				<view class="time">
					<text class="tt"> 就餐时间:</text> <text>{{time}}</text>
				</view>
				<view class="num">
					<text class="tt">用餐人数:</text> <text>{{num}}</text>
				</view>
				<view class="allcount">
					<text class="tt"> 总&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价:</text> <text class="price">￥{{allCount}}</text>
				</view>
				<!-- 	<view class="youhui">
					<text class="tt"> 满减优惠:</text>
					<picker mode="selector" class="picker" :range="pics" :value="index" @change="chosecards">
						<view>
							{{pics[index]}}
						</view>
					</picker>
				</view> -->

			</view>
		</view>
		<view class="user">
			<view class="name">
				<text class="tt">姓名:</text> <input type="text" v-model="username" placeholder="请输入名字" />
				<radio-group @change="radioChange" class="radiogroup">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
						<view>
							<radio :value="item.value" :checked="index === current" />
						</view>
						<view>{{item.name}}</view>
					</label>
				</radio-group>

			</view>
			<view class="phone">
				<text class="tt">电话:</text> <input type="text" placeholder="请输入电话号码" v-model="userphone" />
			</view>
		</view>
		<view class="des">
			<view class="title">
				备注
			</view>
			<textarea v-model="des" placeholder="请输入您的要求我们尽量安排~" />
			</view>
		<!-- <view class="trums">
			<radio-group @change="payChange" class="radiogroup2">
				<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in payitems" :key="item.value">
					<view>{{item.name}}</view>
					<view>
						<radio :value="item.value" :checked="index === paycurrent" />
					</view>
				</label>
			</radio-group>
		</view> -->
		<view class="pay">
			<view class="tip">
				目前只支持微信支付！
			</view>
			<view class="bottom">
				<view class="price-bottom">
					<text class="tt">合计:</text><text class="price">￥{{realCount}}</text>
				</view>
				<view class="primary" style="background: #3374FF;" @tap="requestPayment(paytype)">确认支付</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				discounts: "无",
				showCards: false,
				cards: ['-1', "-2", "-3"],
				index: 0,
				allCount: 200,
				order_id:300,
				goodsList:[],
				items:[{
					value:'man',
					name:'先生'
				},
				{
					value:'woman',
					name:'女士'
				}],
				pics:[-1,-2,-3],
				time:0,
				num:0,
				shopname:'店名',
				username:'',
				userphone:'',
				des:'',
				current:0,
				payitems:[
					{
						value:'weixin',
						name:'微信支付'
					},
					{
						value:'zhifubao',
						name:'支付宝支付'
					}
				],
				paycurrent:0,
				paytype:''
				
			}
		},
		methods: {
			async requestPayment(type) {
				// 提交订单到后台商家
				if(type=='weixin'){
					
				}
				var that = this
				if (parseFloat(this.realCount) != 0.00 && parseFloat(this.realCount) != 0) {
					console.log('正在支付')
					uni.showLoading({
						title: '正在支付...'
					});
					// 传入price,body,订单号（随机生成）
					// e.id为支付通道
					let orderId = '';
					orderId = this.randomOrder(orderId)
					console.log(orderId)
					let price = this.realCount
					let body = "莫等闲-预定支付";
					let orderInfo1 = await this.getOrderInfo(orderId, price, body);
					// console.log(orderInfo1)


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
					var obj2 = {
						appid: orderInfo2.appid, //id 应用id
						partnerid: orderInfo2.partnerid, //商户号 
						prepayid: orderInfo2.prepayid, //预支付
						package: 'Sign=AliPay',
						noncestr: orderInfo2.noncestr,
						timestamp: orderInfo2.timestamp, //时间戳
						sign: orderInfo2.sign
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
									id: this.order_id,
									price: this.realCount,
									goods: this.goodsList,
									pay_state: 1
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
						complete: (ok) => {
							console.log(ok)
							uni.navigateBack({
								delta:1
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
							id: this.order_id,//订单号
							orderId: orderId,//随机生成的order
							body: body,//文字内容
							price: price,//价格
							goods: this.goodsList,//商品列表
						},
						success: (result) => {
							console.log(result)
							resolve(result.data)
						},
						fail: (e) => {
							resolve(e);
						}
					})
				})
			},
			chosecards(e) {
				console.log(e)
				this.index = e.target.value
			},
			radioChange(e){
				console.log(e)
				   for (let i = 0; i < this.items.length; i++) {
				                if (this.items[i].value === e.target.value) {
				                    this.current = i;
				                    break;
				                }
				            }
			},
			payChange(e){
				for (let i = 0; i < this.items.length; i++) {
				             if (this.items[i].value === e.target.value) {
				                 this.paycurrent = i;
				                 break;
				             }
				         }
				this.paytype = e.target.value
			}
			
		},
	computed:{
		realCount(){
			// return this.allCount - Math.abs(this.cards[this.index])
			return this.allCount 
		}
	},
		onLoad(e) {
			this.order_id = e.order_id
			this.allCount = e.price
			this.goodsList = e.goodslist.split(',')
			console.log(this.goodsList)
			uni.request({
				url: this.$bashUrl + '/index.php/home/Api/my_order_info/',
				method: 'POST',
				data: {
					good_id: this.order_id
				},
				success:res=>{
					console.log(res)
					this.time=res.data.infos.point_time
					this.num = res.data.infos.num
					this.shopname = res.data.store_name
				}
				})
		}
	}
</script>

<style lang="less" scoped>
	.radiogroup{
		display: flex;
		.uni-list-cell-pd{
						display: flex;
						margin: 0 10upx;
		}
	}
	.radiogroup2{
		.uni-list-cell-pd{
						display: flex;
						margin: 0 10upx;
						justify-content: space-between;
						padding: 20upx;
		}
	}
	.picker {
		display: inline-block;
		float: right;
		color: red;
	}

	.count {
		.price {
			float: right;
			color: #ff6700;
			font-size: 40upx;
			font-weight: 600;
		}
	}

	.container {
		font-size: 32upx;
		background: #f7f7f7;
		height: 100%;
		.header{
			border-top: 1px solid #eee;
			background: #fff;
			.shopname{
				margin: 30upx;
				font-size: 40rpx;
				font-weight: 600;
			}
			.list{
				width: 80%;
				margin: 0 auto;
				>view{
					margin: 10upx 0;
					.tt{
						color: #999;
						display: inline-block;
						width: 150upx;
						text-align: center;
					}
					text{
						&:nth-child(2){
							float: right;
						}
					}
				}
				.allcount{
					.price{
						color: #FF5025;
					}
				}
			}
			
		}
		.user{
			margin:30upx 0;
			background: #fff;
			padding:0 40upx;
			>view{
				display: flex;
				.tt{
					display: inline-block;
					width: 100upx;
					letter-spacing: 8rpx;
				}
				padding: 20upx 0;
				input{
					margin: 0 10upx;
				}
			}
			.name{
				border-bottom: 1px solid #eee;
				input{
					width: 240upx;
				}
			
			}
		}
		.des{
			background: #fff;
			padding: 0 40upx;
			.title{
				padding: 10upx 0;
				border-bottom: 1px solid #eee;
			}
			textarea{
				margin: 20upx 0;
			}
		}
		.pay {
			position: fixed;
			bottom: 0;
			width: 100%;
			left: 0;
			height: 150upx;
			.tip {
				color: #666;
				font-size: 22upx;
				margin-left: 30upx;
			}
			.bottom{
				display: flex;
				width: 100%;
				height: 100%;
				background: #fff;
				line-height: 4;
				.price-bottom{
					width: 50%;
					padding-left: 40upx;
					.tt{
						display: inline-block;
						width: 100upx;
						letter-spacing: 8rpx;
					}
					.price{
						font-weight: 600;
						font-size: 40upx;
						color: #FF5025;
					}
				}
				.primary{
					flex: 1;
					width: 100%;
					height: 100%;
					text-align: center;
					color: #fff;
					background: #3374FF;
				}
			}
		}
	}
</style>
