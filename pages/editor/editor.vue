<template>
	<view class="container">
		<view class="name">
			<view class="left">
				姓名
			</view>
			<view class="right">
				<input type="text" v-model="name" />
			</view>
		</view>
		<view class="bank">
			<view class="left">
				银行
			</view>
			<view class="right">
				<input type="text" v-model="bank"  />
			</view>

		</view>
		<view class="bankplace">
			<view class="left">
				开户银行
			</view>
			<view class="right">
				<input type="text" v-model="bankplace" />
			</view>
		</view>
		<view class="card">
			<view class="left">
				银行卡号
			</view>
			<view class="right">
				<input  maxlength="19" type="number"   v-model="card" />
			</view>
		</view>
		<view class="tishi">
			建议输入工商银行卡哟！
		</view>
		<view class="card">
			<view class="left">
				收货地址
			</view>
			<view class="right">
				<input  maxlength="19" type="text"   v-model="region" />
			</view>
		</view>
		<button type="primary" @tap="save" style="background: #3D7BFF;margin-top: 100upx;">保存</button>
	</view>
</template>

<script>
	export default {

		data() {
			return {
			name:'',
			bank:'',
			bankplace:'',
			card:"",
			phone:uni.getStorageSync('phone'),
			region:'',
			userInfo:{}
			}
		},
		onLoad(e) {
			// this.phone = e.phone
			uni.request({
				url:this.$bashUrl+'/index.php/home/Api/user_is',
				method:"POST",
				data:{
					phone:this.phone
				},
				success:res=>{
					console.log(res)
					this.name = res.data.name
					this.bank = res.data.bank
					this.bankplace = res.data.address
					this.card = res.data.card_nu
					this.region = res.data.region
				}
			})
		},
		methods: {
			save(){
				console.log('save')
				uni.request({
					url:this.$bashUrl+'/index.php/home/Api/user_is',
					method:"post",
					data:{
						name:this.name,
						card_nu:this.card,
						bank:this.bank,
						address:this.bankplace,
						phone:this.phone,
						region:this.region
					},
					success:res=>{
						console.log(res)
						uni.showToast({
							title:"保存成功",
							success:res=>{
								uni.navigateBack({
									delta:1
								})
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.tishi{
		text-align: center;
		color: #666;
	}
	.container{
		padding: 20upx;
		font-size: 28upx;
		background: #fafafa;
		>view{
			margin: 20upx 0;
			display: flex;
			border-radius: 20upx;
			align-items: center;
			background: #fff;
			.left{
				width: 140upx;
				text-align: center;
				border-right: 1px solid #eee;
				padding: 20upx;
				line-height: 80upx;
			}
			.right{
				flex: 1;
				padding: 10upx 20upx;
			}
			
		}
	}
	
</style>
