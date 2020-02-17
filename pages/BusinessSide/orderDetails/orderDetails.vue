<template>
	<view class="container">
		<view :class="['box-header',bgcolor]">
			<view class="header">
				<view class="title">
					{{stateTitle}}
				</view>
				<view class="titleText">
					{{stateText}}
				</view>
			</view>
		</view>
		<view class="box-title">
			<view class="titleInfo">
				<view class="user">
					<image src="../../../static/Bussines-img/person.png" mode=""></image>
					<text>用户:{{orderInfo.user_phone}}</text>
				</view>
				<view class="time">
					<image src="../../../static/Bussines-img/time.png" mode=""></image>
					<text>时间:{{orderInfo.intime}}</text>
				</view>
			</view>
		</view>
		<view class="box-content">
			<view class="contentBody">
				<view class="content">
					<view class="content-title">
						订单详情
					</view>
					<view class="content-info">
						<view class="number">
							<view class="left">
								人数:
							</view>
							<view class="right">
								{{orderInfo.num}}
							</view>

						</view>
						<view class="tableNumber">
							<view class="left">
								桌子号:
							</view>
							<view class="right">
								{{tablename}}
							</view>

						</view>
						<view class="orderNumber">
							<view class="left">
								订单号 :
							</view>
							<view class="right">
								{{orderInfo.orderid}}
							</view>
						</view>
						<view class="orderlist">
							订单列表 :
							<view class="list" v-for="(item,index) in orderlist" :key='index'>
								{{item}} x 1
							</view>
						</view>
						<view class="total">
							总价 : <text>￥{{orderInfo.money}}</text>
						</view>
					</view>
				</view>
			</view>


		</view>
		<view class="remind" @tap="remind" v-if="orderInfo.state==0">
			<button class="btn" style="">去提醒</button>
		</view>
	</view>
</template>

<script>
	export default {

		onLoad(e) {
			this.ordersid = e.id
			this.pageInit()
			
		},
		onShow() {},
		data() {
			return {
				ordersid: 0,
				orderInfo: {},
				state: 0,
				bgcolor: '',
				stateTitle: '',
				stateText: '',
				orderlist: [],
				tablename :""
			}
		},
		methods: {
			remind(){
				uni.navigateTo({
					url:'../yudin/yudin?shopid='+this.orderInfo.store_id
				})
			},
			getTable(){
				uni.request({
					url: this.$bashUrl + '/index.php/home/Api/table_names/',
					method: 'POST',
					data: {
						id: Number(this.orderInfo.table_id)
					},
					success:res=>{
						console.log(res)
					    this.tablename = res.data[0].table_name
					},
					fail(err){
						console.log(err)
					}
				})
			},
			pageInit() {
				uni.request({
					url: this.$bashUrl + '/index.php/home/Api/my_order_info/',
					method: 'POST',
					data: {
						good_id: this.ordersid
					},
					success: res => {
						console.log(res)
						console.log(res.data.infos.state)
						this.orderInfo = res.data.infos
						this.orderlist = this.orderInfo.goods.split(',')
						this.orderlist.pop()
						this.state = res.data.infos.state
						if (this.state == 0) {
							this.bgcolor = "box-header0"
							this.stateTitle = '待审核'
							this.stateText = '请尽快确定订单'
						} else if (this.state == 2) {
							this.bgcolor = "box-header2"
							this.stateTitle = '已确认'
							this.stateText = '已确认用户就餐~'
						} else if (this.state == 3) {
							this.bgcolor = "box-header3"
							this.stateTitle = '已取消用户就餐'
						}
						this.getTable()
					}
				})
			}
		}

	}
</script>

<style lang="less" scoped>
	.box-header {
		position: relative;
		width: 750upx;
		height: 340upx;
		border-bottom-left-radius: 30upx;
		border-bottom-right-radius: 30upx;
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		-ms-flex-direction: column;
		flex-direction: column;
		color: #fff;

		.header {
			padding: 30rpx;
			width: 90%;
			margin: 0 auto;

			.titleText {
				font-size: 25upx;
				margin: 20upx 0;
			}

			.title {
				font-weight: bolder;
				font-size: 40upx;
			}
		}
	}

	.box-header0 {
		background: #427EFF;
	}

	.box-header2 {
		background: #ffb34a;
	}

	.box-header3 {
		background: #c6c3c6;
	}

	.box-title {
		-webkit-box-shadow: 0 5px 10px -5px #CCCCCC;
		box-shadow: 0 5px 10px -5px #CCCCCC;
		position: absolute;
		border-radius: 10upx;
		background: #FFFFFF;
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		-ms-flex-pack: center;
		justify-content: center;
		height: 170upx;
		width: 92%;
		left: 30upx;
		top: 280upx;

		.titleInfo {
			padding: 30upx 20upx;
			width: 100%;

			view {
				margin: 10upx 0;

				image {
					width: 40upx;
					height: 40upx;
					margin-right: 30upx;
					vertical-align: middle;
				}
			}
		}
	}

	.box-content {
		-webkit-box-shadow: 0 5px 10px -5px #CCCCCC;
		box-shadow: 0 5px 10px -5px #CCCCCC;
		position: absolute;
		border-radius: 10upx;
		background: #FFFFFF;
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		-ms-flex-pack: center;
		justify-content: center;
		left: 30upx;
		top: 500upx;

		.contentBody {
			width: 90vw;

			.content {

				padding: 30upx 20upx;

				.content-title {
					font-size: 45upx;
					font-weight: bold;
				}

				.content-info {
					font-size: 30upx;
					color: #C6C3C6;

					view {
						text-align: center;
						display: flex;
						margin: 20upx 0;

						.left {
							flex: 1;
						}

						.right {
							flex: 3;
							color: #000;
						}
					}

					.orderlist {
						display: block;
						text-align: left;
						color: #000;

						.list {
							padding-left: 30upx;
						}
					}

					.total {
						text-align: right;
						margin-bottom: 100upx;
						text {
							padding: 0 5upx;
							color: #DD524D;
							font-size: 35upx;
						}
					}
				}
			}
		}
	}
	.remind{
	}
	.btn {
		background: #3374FF;
		color: #fff;
		position: fixed;
		bottom: 0;
		width: 100%;
		font-size: 35upx;
		height: 80upx;
	}
</style>
