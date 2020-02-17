<template>
	<view class="">
	<!-- 	<view @tap="change">
			打开
		</view> -->
		<view class="box">
			<text class="box-1">输入短信验证码</text>
			<view class="box-2">
				验证码已发送至{{phone1}},请在下方输入框内输入4位数字验证码
			</view>
		</view>
		<uni-de-code type="middle" v-model="ivalue" @finish="inputValue"></uni-de-code>
		<view class="vlogShow" v-if="vlogshow">
			<view class="redBox">
				<view class="close" @click="close(0)">
					<image src="../../static/cancel.png" mode=""></image>
				</view>
				<image class="redbg" src="../../static/redbox.png" mode=""></image>
				<view class="open" @tap="open">
					打开
				</view>
			</view>
		</view>
		<view class="priceShow vlogShow" v-if="openshow">
			<view class="redBox">
				<view class="close" @click="close(1)">
					<image src="../../static/cancel.png" mode=""></image>
				</view>
				<image src="../../static/open.png" class="redbg" mode=""></image>
				<view class="txtContent">
					<view class="price">
						<text class="num">{{price}}</text>
						元
					</view>
					<view class="type">
						无门槛红包
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniDeCode from "../../components/wakary-input/wakary-input.vue"
	import digitalRolling from "@/components/digital-rolling/digital-rolling.vue"
	export default {
		components: {
			digitalRolling,
			uniDeCode
		},
		data() {
			return {
				ivalue: Number,
				inputval: Number,
				panduan: 1,
				qcode: 0,
				phone1: 0,
				vlogshow: false,
				openshow: false,
				digitTo: '0',
				digitFrom: '0',
				start: 0
			}
		},
		onReady: function() {
			// 页面跳转后初始化状态
			this.panduan += 1
		},
		onLoad: function(option) {
			this.phone = option.phone
			this.qcode = option.id
			var reg = /(\d{3})\d{4}(\d{4})/;
			this.phone1 = this.phone.replace(reg, '$1****$2')

		},
		computed: {
			price() {
				let pr = Math.random() * 100
				if (pr < 70) {
					 let a = parseInt(Math.random() * 5+1)
					return	a
				} else {
					let b = parseInt(Math.random() * 5 + 5)
					return  b
				}
			}
		},
		watch: {
			inputval: {
				immediate: true,
				handler: function(newVal) {
					// 进入页面初始化
					// 验证短信码是否争取，正确跳转，不正确显示
					var that = this
					if (Number(this.qcode) == Number(this.inputval)) {
						// 成功后,隐藏手机键盘
						uni.hideKeyboard()
						uni.showLoading({
							title: '验证中',
							success: function() {
								uni.setStorageSync("phone", that.phone)
								setTimeout(function() {
									uni.hideLoading()
									// 成功后跳转
									uni.switchTab({
										url: '/pages/me/me?nowphone=' + that.phone
									})
								}, 2000);
							}
						});
					} else if (Number(this.qcode) != Number(this.inputval) && this.panduan != 1) {
						uni.showToast({
							title: '验证码错误',
							duration: 3000,
							icon:'none',
							success:res=>{
								setTimeout(()=>{
									uni.redirectTo({
										url:"/pages/sigUp/sigUp"
									})
								},2000)
							}
						})
					}
				}
			}
		},
		methods: {

			close(type) {
				switch (type) {
					case 0:
						console.log(0)
						this.vlogshow = false
						break;
					case 1:
						console.log(1)
						this.openshow = false
						break;
					default:
						break;
				}
			},
			open() {
				this.vlogshow = false
				this.openshow = true
			},
			change() {
				this.vlogshow = true
			},
			inputValue: function(e) {
				this.inputval = e
			}
		}
	}
</script>
<style scoped>
	.close {
		width: 50upx;
		hieght: 50upx;
		border-radius: 50%;
		position: absolute;
		right: -40upx;
		top: -60upx;
	}

	.close>image {
		width: 50upx;
		height: 50upx;
	}

	@keyframes hide {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}

	.priceShow {
		animation: hide 0.5s linear both;
	}

	.open {
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
		background: radial-gradient(#ffc745, #ff5025);
		text-align: center;
		line-height: 100upx;
		font-size: 28upx;
		font-weight: 600;
		position: absolute;
		left: 50%;
		top: 25%;
		transform: translate(-50%, -50%);
	}

	.vlogShow {
		position: fixed;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.4);
	}

	.txtContent {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translateX(-50%);
		text-align: center;
		margin: 0 auto;
		font-size: 26upx;
	}

	.num {
		font-size: 100upx;
	}

	.price {
		color: #fff;
		margin: 20upx;
	}

	.type {
		font-size: 34upx;
		color: #fff;
	}

	.redBox {
		width: 400upx;
		height: 510upx;
		position: relative;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.redbg {
		width: 100%;
		height: 100%;
	}

	.box {
		width: 85%;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
	}

	.box-1 {
		margin-top: 50rpx;
		font-size: 40rpx;
		font-weight: 600;
		color: #000000;
	}

	.box-2 {
		padding-top: 20rpx;
		margin: 0 auto;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		color: #A4A4A4;
		font-size: 30rpx;
		padding-bottom: 70rpx;
	}
</style>
