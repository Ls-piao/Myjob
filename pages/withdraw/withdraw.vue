<template>
	<view class="container">
		<view class="msg">
			补贴收取5%手续费
		</view>
		<view class="count">
			<view class="left">
				金额
			</view>
			<view class="right">
				<input type="text" v-model="count" @input="cash(count)" />
			</view>
		</view>
		<view class="count">
			<view class="left">
				到账金额
			</view>
			<view class="right">
				{{realcount}}
			</view>
		</view>
		<button type="primary" @tap="togetMoney" style="background: #3D7BFF;margin-top: 100upx;">确认领取</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				count: "",
				phone: uni.getStorageSync('phone'),
				k_cash: 0,
				realcount: 0,
				tpye:0
			}
		},
		onLoad(e) {
			this.k_cash = e.k_cash
			this.type = e.type
		},
		methods: {
			cash(count) {
				this.realcount = (count * 0.95).toFixed(2)
			},
			togetMoney() {
				
				var count = Number(this.count)
				console.log(this.k_cash)
				if (count > 0) {
					if (count <= this.k_cash) {
						if(this.type==0){
							
						uni.request({
							url: this.$bashUrl + '/index.php/home/Api/t_cash',
							method: "POST",
							data: {
								phone: this.phone,
								cash: count
							},
							success: res => {
								console.log(res)
								uni.showToast({
									title: "提现处理中"
								})
								setTimeout(() => {
									uni.reLaunch({
										url: "../me/me"
									})
								}, 2000)
							}
						})
						}else if(this.type==1){
							uni.request({
								url: this.$bashUrl + '/index.php/home/Api/t_t_cash',
								method: "POST",
								data: {
									phone: this.phone,
									cash: count
								},
								success: res => {
									console.log(res)
									uni.showToast({
										title: "提现处理中"
									})
									setTimeout(() => {
										uni.reLaunch({
											url: "../me/me"
										})
									}, 2000)
								}
							})
						}
					} else {
						uni.showToast({
							title: '可提现金额不足',
							icon: 'none'
						})
					}
				} else {
					uni.showToast({
						title: '提现金额不能为0',
						icon: 'none'
					})
				}

			}
		}
	}
</script>

<style lang="less" scoped>
	.container {
		padding: 20upx;
		font-size: 28upx;
		background: #fafafa;

		.msg {
			text-align: center;
			height: 30upx;
			padding: 20upx;
			margin: 10upx 0;
			color: #999;
		}

		>view {
			margin: 20upx 0;
			display: flex;
			border-radius: 20upx;
			align-items: center;
			background: #fff;

			.left {
				width: 140upx;
				text-align: center;
				border-right: 1px solid #eee;
				padding: 20upx;
				line-height: 80upx;
			}

			.right {
				flex: 1;
				padding: 10upx 20upx;
			}

		}
	}
</style>
