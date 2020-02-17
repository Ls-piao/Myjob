<template>
	<view class="body">
		<view class="face-wapper">
			<image class="face-wapper-img" src="../../static/Icon/sad.png"></image>
		</view>
		<view class="face-title"><text>欢迎来到莫等闲~</text></view>
		<view class="login-box">
			<view class="info-wapper">
				<label class="words-lbl">
					<image class="info-img" src="../../static/Icon/username.png"></image>
				</label>
				<view class="words-inp">
					<input cursor="2" class="line" v-model="phoneNumber" maxlength="13" type="number" placeholder="必填 手机号码"
					 placeholder-class="graywords" />
				</view>

			</view>
			<view class="info-wapper">
				<label class="words-lbl">
					<image class="info-img" src="../../static/Bussines-img/perso.png"></image>
				</label>
				<view class="words-inp">
					<input cursor="2" class="line" v-model="recommendphone" maxlength="13" type="number" placeholder="选填 推荐人电话"
					 placeholder-class="graywords" />
				</view>

			</view>

			<!-- 			<view class="info-wapper">
				<label class="words-lbl">
					<image class="info-img" src="../../static/Icon/password.png"></image>
				</label>
				<view class="words-inp">
					<input class="line" name="password" type="text" value="" password="true" placeholder="密码" placeholder-class="graywords" />
				</view>
			</view> -->
			<!-- <view class="pone-code"> -->
			<!-- 				<view class="pone-code-inp">
					<input class="line" maxlength="4" name="password" type="text" value="" placeholder="请输入四位验证码" placeholder-class="codewords" />
				</view> -->
			<!-- 				<view class="pone-code-txt" >
					获取验证码
				</view> -->
			<!-- </view> -->
		</view>
		<view class="login-content">
			<view class="login-btn" @click="toDeCode">马上登陆</view>
			<!-- 	<view class="login-content-txt">
				<view @click="tologIn">已有账号?</view>
				<view class="login">立即登录</view>
			</view> -->
		</view>
		<view class="tip">
			用户需同意莫等闲APP使用 <text @tap="toprivate">《用户隐私权限》</text> ,以及 <text @tap="touserservice">《用户服务条款》</text>后再使用
		</view>
		<!-- <view class="login-txt">
			<text>其它方式登录</text>
			<image class="login-img" data-logintype="weixin" src="../../static/Icon/weChat.png"></image>
			 @tap="appoAuthLogin" 
		</view> -->
		<view class="isShow" v-if="isShow">
			<view class="content">
				<view class="title">
					服务协议和隐私政策
				</view>
				<view class="txt">
					<view class="">

						请你务必审慎阅读、充分理解“服务协议”和“隐私政策”
					</view>
					<view class="">
						你可阅读 <text class="mip" @click="touserservice">《服务协议》</text>和<text class="mip" @click="toprivate">《隐私政策》</text>了解详细信息，如：你同意请点击“同意”开始接受我们的服务。
					</view>
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
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				serverUrl: "",
				phoneNumber: '',
				qrcode: 0,
				isShow: true,
				recommendphone: ''
			}
		},
		methods: {
			exit() {
				// #ifdef APP-PLUS  
				plus.runtime.quit();
				// #endif
				console.log('exit')
			},
			close() {
				this.isShow = false
			},
			toprivate() {
				uni.navigateTo({
					url: "/pages/private/private"
				})
			},
			touserservice() {
				uni.navigateTo({
					url: "/pages/private/userprivate"
				})
			},
			tologIn: function() {
				uni.navigateTo({
					url: '/pages/sigIn/sigIn'
				});
			},
			toDeCode: function() {
				// 发送验证码并存入获取的电话号码
				var that = this
				if (this.phoneNumber) {
					uni.request({
						url: this.$bashUrl + '/index.php/home/Api/register/',
						method: "POST",
						data: {
							phone: this.phoneNumber,
							r_phone:this.recommendphone
						},
						success(res) {
							that.qrcode = res.data
							uni.redirectTo({
								url: '/pages/decode/decode?id=' + that.qrcode + '&phone=' + that.phoneNumber,
							});
						},
						fail(err) {
							console.log('获取错误')
						}
					})
				} else {
					uni.showToast({
						title: '请您先输入电话',
						duration: 2000
					})
				}
			}
			// 	appoAuthLogin:function(event){
			// 		var that = this
			// 		// 获取用户的登录类型
			// 		var logintype = event.currentTarget.dataset.logintype
			// 		// 授权登录
			// 		uni.login({
			// 			provider: logintype,
			// 			success:function(loginRes){
			// 				// 授权登录成功以后,获取用户的信息
			// 				uni.getUserInfo({
			// 					provider: logintype,
			// 					success(info){
			// 						var userInfo = info.userInfo
			// 						var fave = ""
			// 						var nickname = ""
			// 						var	openIdOrUid = ""
			// 						// 由于各平台的
			// 						if(logintype == "weixin"){
			// 							face = userInfo.avatarUrl
			// 							nickname = userInfo.nickName
			// 							openIdOrUid = userInfo.openId
			// 						}
			// 						// 调用开发者后台，执行一键登录或注册
			// 						uni.request({
			// 							url: that.serverUrl + "" + logintype,
			// 							data:{
			// 								"openIdOrUid":openIdOrUid,
			// 								"nickname":nickname,
			// 								"face":face
			// 							},
			// 							method:"POST",
			// 							success:function(result){
			// 								if(result.data.status == 200{
			// 									var userInfo = result.data.data
			// 									// 保存用户信息到全局的缓存中
			// 									uni.setStorageSync("globalUser",userInfo)
			// 									// 微信登录成功，跳转到我的账户页面
			// 									uni.switchTab({
			// 									    url: '/pages/me/me'
			// 									});
			// 								}
			// 							}
			// 						})
			// 					}
			// 				})
			// 			},
			// 			fail:function(err){
			// 				console.log("用户未同意授权")
			// 			}
			// 		})
			// 	}
		}
	}
</script>
<style scoped lang="less">
	@keyframes hide {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}

	.isShow {
		animation: hide 1s linear both;
		position: fixed;
		z-index: 99999;
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

	@import url("sigUp.css");

	.tip {
		margin: 20rpx 40rpx;
		font-size: 26upx;
		position: fixed;
		bottom: 100upx;
		left: 0;

	}

	.tip>text,
	.mip {
		color: #007AFF;
		text-decoration: underline;
	}
</style>
