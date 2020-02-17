<template>
	<view class="box">
		<view class="userName">
			<view class="user-img">
				<image style="height:100rpx;width:100rpx;" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2519824424,1132423651&fm=26&gp=0.jpg"
				 mode=""></image>
			</view>
			<view class="user-number">
				<text class="user-number-name">融峰会员</text>
				<text class="user-number-pone">{{poneNumber}}</text>
			</view>
			<!-- 			<view class="shopname" @click="ToshopSide" v-if="show">
				商家端
			</view>
			<view class="shopname" @click="Tosigup" v-if="!show">
				注册/登录
			</view> -->
		</view>
		<view class="store" v-if="shopshow && show" style="margin-bottom: 50rpx;">
			<view class="box-imgs">
				<image class="xiangqing-box-img" src="../../static/Icon/home.png" mode="" v-if="shopshow && show"></image>
				<image class="xiangqing-box-img xiangqing-box-img-1" src="../../static/imgs/start.png" mode="" v-if="!show" style="margin-top: 20rpx;"></image>
			</view>
			<view class="box-text" v-if="shopshow && show">
				<view class="xinagqing-box-1" @click="ToshopSide" v-if="shopshow && show">
					<text class="xiangqing-box-text">商家中心</text>
					<image class="xinagqing-box-1-img" src="../../static/Icon/left.png" mode=""></image>
				</view>
				<view class="xinagqing-box-1" @click="Tosigup" v-if="!show" style="margin-top: 20rpx;">
					<text class="xiangqing-box-text">登录 / 注册</text>
					<image class="xinagqing-box-1-img" src="../../static/Icon/left.png" mode=""></image>
				</view>
			</view>
		</view>



		<view class="xiangqing x-list">
			<view class="list" @click="todindan">
				<view class="listImg">
					<image class="xiangqing-box-img" src="../../static/imgs/file.png" mode=""></image>
				</view>
				<view class="listContent">
					<view class="xiangqing-box-text text"> 订单</view>
					<image class="xinagqing-box-1-img" src="../../static/Icon/left.png" mode=""></image>
				</view>

			</view>
			<view class="list" @click="toMyteam">
				<view class="listImg">
					<image class="xiangqing-box-img" src="../../static/Icon/team.png" mode=""></image>
				</view>
				<view class="listContent">
					<view class="xiangqing-box-text text"> 分享好友</view>
					<image class="xinagqing-box-1-img" src="../../static/Icon/left.png" mode=""></image>
				</view>

			</view>

			<!-- <view class="list" @click="toHongbao">
				<view class="listImg">
					<image class="xiangqing-box-img" src="../../static/hongbao.png" mode=""></image>
				</view>
				<view class="listContent">
					<view class="xiangqing-box-text text"> 我的卡包</view>
					<image class="xinagqing-box-1-img" src="../../static/Icon/left.png" mode=""></image>
				</view>
			</view> -->
			<view class="list" @click="toWallet">
				<view class="listImg">
					<image class="xiangqing-box-img" src="../../static/recommend.png" mode=""></image>
				</view>
				<view class="listContent">
					<view class="xiangqing-box-text text"> 推荐中心</view>
					<image class="xinagqing-box-1-img" src="../../static/Icon/left.png" mode=""></image>
				</view>
			</view>
			<view class="list" @click="tixianList" v-if="show">
				<view class="listImg">
					<image class="xiangqing-box-img" src="../../static/Icon/tuichu.png" mode=""></image>
				</view>
				<view class="listContent">
					<view class="xiangqing-box-text text"> 退出登陆</view>
					<image class="xinagqing-box-1-img" src="../../static/Icon/left.png" mode=""></image>
				</view>

			</view>
			<view class="list" @click="login" v-if="!show">
				<view class="listImg">
					<image class="xiangqing-box-img" src="../../static/login.png" mode=""></image>
				</view>
				<view class="listContent">
					<view class="xiangqing-box-text text"> 立即登陆</view>
					<image class="xinagqing-box-1-img" src="../../static/Icon/left.png" mode=""></image>
				</view>

			</view>


			<!-- 	<view class="box-imgs">
				<image class="xiangqing-box-img" src="../../static/imgs/file.png" mode=""></image>
				<image class="xiangqing-box-img xiangqing-box-img-1" src="../../static/imgs/start.png" mode="" v-if="show"></image>
			</view>
			<view class="box-text">
				
				<view class="xinagqing-box-1 xinagqing-box-border" @click="todindan">
					<text class="xiangqing-box-text" >订单</text>
					<image class="xinagqing-box-1-img" src="../../static/Icon/left.png" mode=""></image>
				</view>
				<view class="xinagqing-box-1 xinagqing-box-border" @click="toMyteam">
					<text class="xiangqing-box-text" >我的团队</text>
					<image class="xinagqing-box-1-img" src="../../static/Icon/left.png" mode=""></image>
				</view>
				<view @click="tixianList" class="xinagqing-box-1 xinagqing-box-2" v-if="show">
					<text class="xiangqing-box-text">退出登陆</text>
					<image class="xinagqing-box-1-img" src="../../static/Icon/left.png" mode=""></image>
				</view>
			</view> -->
		</view>
		<view class="bottom">
			<text class="yinsi" @tap="toPrivate">隐私政策</text>
			<text>Copyright©2019</text>
			<text>四川融峰集团 版权所有</text>
		</view>
		<!-- <view class="isShow" v-if="isShow">
			<view class="content">
				<view class="title">
					赋予协议和隐私政策
				</view>
				<view class="txt">
					为了帮助您通过访问我们的网站尽可能充分地获取信息和服务，有时我们需要了解您的某些个人信息。本隐私权保护政策意在帮助您了解我们是如何收集、使用以及安全存储您提供的个人信息。随着科技发展、业务运作的调整及客户的需求，我们会不断审查我们的 <text> 隐私权</text>保护措施，从而使我们的 <text> 隐私权</text>保护政策亦随之不断改进。为使您了解我们的最新政策，欢迎您随时光临我们的网站查询我们的最新隐私权保护政策。
				</view>
				<view class="btns">
					<view class="left" @tap="exit">
						暂不使用
					</view>
					<view class="right" @tap="close">
						同意
					</view>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				poneNumber: '',
				show: false,
				shopshow: false,
				shopid: 0,
				isTeam: 0,
				isShow: false
			}
		},
		// 每次页面显示时从缓存中取出已保存的登录信息
		onShow: function() {
			var that = this
			var phone = uni.getStorageSync('phone')
			console.log(phone)
			this.poneNumber = this.passwordTl(phone)
			// 判断用户是否登录
			if (uni.getStorageSync('phone')) {
				this.show = true
				console.log(that.show)
			} else {
				this.show = false
			}
			// 是否是代理商
			console.log(phone)
			uni.request({
				url: this.$bashUrl + '/index.php/home/Api/is_team/',
				method: "POST",
				data: {
					phone: phone
				},
				success: res => {
					console.log(res)
					this.isTeam = res.data
				}
			})


			// 判断用户是否是商家用户			
			uni.request({
				url: this.$bashUrl + '/index.php/home/Api/is_store/',
				method: "POST",
				data: {
					phone: phone
				},
				success(res) {
					console.log(res.data)
					if (res.data != 0) {
						console.log('执行商家')
						that.shopshow = true
						that.shopid = res.data
					}
				},
				fail(err) {
					console.log('获取错误')
				}
			})
		},
		onLoad: function(options) {
			// 取出登录或注册全局用户信息
			var phone = uni.getStorageSync('phone');
			// 默认取得手机号码
			this.poneNumber = this.passwordTl(phone)
		},
		methods: {
			toWallet() {
				uni.navigateTo({
					url: "/pages/wallet/wallet"
				})
			},
			exit() {
				// #ifdef APP-PLUS  
				plus.runtime.quit();
				// #endif
				console.log('exit')
			},
			close() {
				this.isShow = false
			},
			toPrivate() {
				uni.navigateTo({
					url: "/pages/private/private"
				})
			},
			toHongbao() {
				uni.navigateTo({
					url: "../qrCode/qrCode"
				})
			},
			//分销商入口
			toMyteam() {
				// uni.navigateTo({
				// 	url:'../toAgent/toAgent'
				// })
				// 如果是分销商进入团队
				let phone = uni.getStorageSync('phone')
				if (phone) {

					if (this.isTeam != "0") {
						uni.navigateTo({
							url: '../myTeam/myTeam'
						})
					} else {
						//如果不是进入注册
						uni.navigateTo({
							url: '../toAgent/toAgent'
						})

					}
				} else {
					uni.showToast({
						title: "请先登录",
						icon: "none"
					})
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/sigUp/sigUp'
						})
					}, 1500)

				}
			},
			passwordTl: function(tl) {
				let phone = tl.toString();
				// 默认处理字符串电话号码，不接受数字号码
				var reg = /^(\d{3})\d{4}(\d{4})$/
				return (phone.substr(0, 3) + '****' + phone.substr(7))
			},
			todindan() {
				uni.switchTab({
					url: '/pages/reserve/reserve'
				});
			},
			ToshopSide: function() {
				// 商家端入口
				uni.navigateTo({
					url: '/pages/BusinessSide/index/index?shopid=' + this.shopid,
				})
			},
			Tosigup: function() {
				// 注册页面入口
				uni.navigateTo({
					url: '/pages/sigUp/sigUp'
				})
			},
			login() {
				uni.navigateTo({
					url: '/pages/sigUp/sigUp'
				})
			},
			tixianList() {
				// 清除缓存,并重新跳转到该页面
				uni.clearStorageSync()
				uni.showToast({
					title: '已退出账户',
					icon: 'none'
				});
				setTimeout(function() {
					uni.navigateTo({
						url: '/pages/sigUp/sigUp'
					})
				}, 1000);
			}
		}
	}
</script>
<style lang="less" scoped>
	@import url("me.css");
	.x-list{
		z-index: 99;
		margin-bottom: 300upx;
	}
	.bottom {
		position: fixed;
		bottom: 40upx;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
		color: #A9A9A9;
	}

	.isShow {
		position: fixed;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.4);

		.content {
			width: 63%;
			position: absolute;
			left: 50%;
			top: 20%;
			transform: translateX(-50%);
			text-align: center;
			background: #fff;
			padding: 20upx;
			border-radius: 15upx;
			margin: 0 auto;
			font-size: 26upx;

			.title {
				text-align: center;
			}

			.txt {
				margin: 20upx;
				text-align: left;

				text {
					color: #3374FF;
				}
			}

			.btns {
				margin-top: 20upx;
				display: flex;
				justify-content: space-evenly;

				.left {
					text-align: center;
					border-right: 1px solid #ccc;
					padding-right: 60upx;

				}

				.right {
					text-align: center;
					color: #3374FF
				}
			}
		}
	}

	.yinsi {
		color: #2F9BFE;
		text-decoration: underline;
	}

	.list {
		width: 100%;
		height: 100%;
		display: flex;

		.listImg {
			padding: 32upx 20upx;

			image {
				width: 40upx;
				height: 44upx;
			}

		}

		.listContent {
			flex: 1;

			.text {
				padding: 30rpx 20rpx;

			}

			.xinagqing-box-1-img {
				float: right;
				right: 36upx;
				top: -57rpx;
				position: relative;
			}
		}
	}

	.box {
		height: 100vh;
		background: #FAFAFA;
	}

	.mmm {
		margin-left: 300rpx;
		height: 60rpx;
		width: 80rpx;
		font-size: 30rpx;
		color: #007AFF;
		border: #007AFF 1rpx solid;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
</style>
