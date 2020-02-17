<template>
	<view class="contianer">
		<view class="header">
			<image src="../../static/wallet/icon.png" mode="" @click="show"></image>
			<view> 会员:{{phone}}</view>
		</view>
		<view class="count">
			<image src="../../static/wallet/bg.png" mode=""></image>
			<view class="content">
				<view class="count-top">
					获取补助金额:
				</view>
				<view class="allcount">
					￥{{allcount}}
				</view>
				<view class="kcount">
					可领取补助金额： ￥{{k_count}}
				</view>
			</view>
		</view>
	
		<view class="list">
			<view class="title">
				推荐用户列表
			</view>
			<view class="box" v-for="(item,index) in userList" :key="index">
				<view class="left">
					<view class="userphone">
						{{item.phone}}
					</view>

				</view>
				<view class="price">
					+<text>￥{{item.money}}</text>
				</view>
			</view>
			<!-- <view class="tip"> -->
			<view class="tip" v-if="userList.length<=0">
				<view>

					您还没有推荐任何用户哟！快去推荐吧！推荐即可获得累计奖励,邀请好友到店消费后即可获得该单消费的1.5%奖励，快去邀请好友下载APP吧！
				</view>
			</view>
		</view>
		    <drawer :show="drawerShow" @cancel="cancel" @ensure="ensure">
		        <view @click="cancel" class="cancel">
		            <image src="../../static/shou.png" mode=""></image>
		        </view>
		        <view class="user">
		            <image src="../../static/huiyuan.png" mode=""></image>
		            会员:{{phone}}
		        </view>
		        <view class="itemlist">
		
		            <view class="item">
		                <image src="../../static/alcount.png" mode=""></image> 获取补助金额：<text> ￥{{allcount}}</text>
		            </view>
		            <view class="item">
		                <image src="../../static/kcount.png" mode=""></image>可领取补助金额：<text> ￥{{k_count}}</text>
		            </view>
		            <view class="item" @click="toyinhangka">
		                <image src="../../static/card.png" mode=""></image>银行卡
		            </view>
		            <view class="item" @click="toMoney(k_count,1)">
		                <image src="../../static/tixian.png" mode=""></image>领取补助
		            </view>
		            <view class="item" @click="toLog">
		                <image src="../../static/log.png" mode=""></image>领取补助记录
		            </view>
		        </view>
		    </drawer>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				drawerShow: false,
				phone: uni.getStorageSync('phone'),
				allcount: '0',
				k_count: '0',
				userList: []
			}
		},
		onLoad() {
			uni.request({
				url: this.$bashUrl + '/index.php/home/Api/t_lists/',
				method: "post",
				data: {
					phone: this.phone
				},
				success: res => {
					if (res.data) {
						for(let i in res.data){
							if(typeof res.data[i] == 'object'){
								this.userList.push(res.data[i])
							}
						}
						this.allcount = res.data.allmoney
						this.k_count = res.data.k_money
						
					}
				}
			})
		},
		methods: {
			toLog() {
				uni.navigateTo({
					url: "../tixianLog/tixianLog"
				})
			},

			toMoney(count, type) {
				uni.navigateTo({
					url: "../withdraw/withdraw?k_cash=" + count + "&type=" + type
				})
			},
			toyinhangka() {
				uni.navigateTo({
					url: "../editor/editor"
				})
			},
			show() {
				this.drawerShow = true;
			},
			//取消
			cancel() {
				if (this.drawerShow) {

					console.log('您点击了取消按钮')
					this.drawerShow = false;
				}
			},
		}
	}
</script>

<style lang="less" scoped>
	.cancel {
		position: absolute;
		color: #3374FF;
		right: 20rpx;
		top: 35rpx;

		image {
			width: 50upx;
			height: 50upx;
		}
	}

	.user {
		margin: 40upx;
		font-size: 30upx;
		font-weight: 600;

		image {
			border-radius: 50%;
			width: 50upx;
			margin-right: 30upx;
			height: 50upx;
			vertical-align: middle;
		}
	}

	.itemlist {
		margin: 20upx;

		.item {
			margin: 20upx;

			image {
				width: 50upx;
				height: 50upx;
				margin-right: 30upx;
				vertical-align: middle;
			}

			text {
				color: #ff6700;
				font-weight: 600;
			}
		}
	}

	.contianer {
		width: 90%;
		margin: 20upx auto;

		.header {
			margin: 20upx 0;
			display: flex;

			image {
				width: 70upx;
				height: 70upx;
				vertical-align: middle;
				margin-right: 20upx;
			}
			>view{
				line-height: 70upx;
				font-size: 30upx;
				font-weight: 600;
			}
		}
		.count{
			position: relative;
			height: 300upx;
			margin-bottom: 20upx;
			>image{
				width: 100%;
				height: 300upx;
				position: absolute;
				z-index: -999;
			}
			.content{
				padding-top: 40upx;
				color: #fff;
				padding-left: 20upx;
				.count-top{
				font-size: 24upx;
					
				}
				.allcount{
					font-size: 70upx;
					font-weight: 600;
					margin:20upx 0 20upx 20upx
				}
				.kcount{
					font-size: 26upx;
				}
			}
		}
		.list {
			.title {
				background: #f7f7f7;
				color: #666;
				font-size: 24upx;
			}

			.tip {
				height: 100vh;

				>view {
					width: 80%;
					margin: 50% auto;
					color: #ccc;
					font-size: 28upx;
					text-align: center;
				}
			}

			.box {
				height: 100upx;
				box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 30upx;
				margin: 20upx 0;

				.price {
					text {

						color: #ff6700;
						font-size: 36upx;
						font-weight: 600;
					}
				}
			}
		}
	}
</style>
