<template>
	<view class="container">
		<view class="box" v-for="(item,index) in Cashlist" :key="index">
			<view class="header">
				补贴状态:
				<text v-if="item.state==0" class="fail"> 未到账</text>
				<text v-else class="success"> 已到账</text>
			</view>
			<view class="content">
				<view class="">
				订单编号:	1000000{{item.id}}
				</view>
				<view class="">
					补贴时间: {{item.intime}} 
				</view>
				<view class="">
				补贴金额: {{item.cash}}元
				</view>
				<view class="" v-if="item.state==1">
					到账时间: {{item.outtime}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: uni.getStorageSync('phone'),
				Cashlist: []
			}
		},
		onLoad() {
			uni.request({
				url: this.$bashUrl + '/index.php/home/Api/t_cash_list',
				method: "POST",
				data: {
					phone: this.phone
				},
				success: res => {
					console.log(res)
					this.Cashlist = res.data.reverse()
				}
			})
		}
	}
</script>

<style lang="less" scoped>
	.container {
		width: 100vw;
		height: 100%;
		background: #fafafa;
		font-size: 30upx;
		.box {
			width: 85%;
			background: #fff;
			margin: 30upx auto;
			padding: 40upx;
			border-radius: 50upx;
			.header{
				padding: 20upx;
				border-bottom: 1px solid #ccc;
				.fail{
					color: #DD524D;
				}
				.success{
					color: #00C777;
				}
			}
			.content{
				padding: 20upx;
			}
		}
	}
</style>
