<template>
	<view class="container">
		<view class="ttt">
			<view class="table" @click="addHongbao()">
				添加红包
			</view>
		</view>
		<view class="yshou" style="margin-bottom: 500rpx;">
			<view class="yshou-page">
				<block v-for="(item,index) in itemList" :key="index">
					<view class="card">
						<view>
							{{item.name}}
						</view>
						<text class="card-title"> 金额</text>
						<view class="padding-top card-price">
							<text style="margin-left: 20rpx;" class="card-price-1"><text class="card-price-2"> {{item.price}}元</text></text>
						</view>
						<view class="time">
							有效期:{{item.createtime}}---{{item.endtime}}
						</view>
						<view class="padding-top card-date">
							<!-- <text style="margin-right: 10rpx;margin-top: 10rpx;height: 10rpx;padding-bottom: 10rpx;">{{item.intime}}</text> -->
							<view @click="Deletetable(item.id)" style="color: #FFFFFF;border-radius: 10rpx;display: flex;flex-direction: row;align-items: center;justify-content: center;font-size: 25rpx;height: 50rpx;width: 120rpx;background: #FF5B5B;">
								删除
							</view>
						</view>
					</view>
				</block>
				<view class="nothing" v-if="itemList.length==0">
					还没有优惠红包哦，快添加吧！
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shopid: "",
				itemList: []
			}
		},
	
		onLoad(e) {
			this.shopid = e.shopid
			this.pageInit()
		},
		methods: {
			addHongbao() {
				uni.navigateTo({
					url: "../hongbao/hongbao?shopid=" + this.shopid
				})
			},
			pageInit(){
				uni.request({
					url: 'http://ww.0816fc.net/index.php/Home/Api/cardList',
					method: "post",
					data: {
						store_id: this.shopid
					},
					success: res => {
						console.log(res)
						if (res.data) {
							this.itemList = res.data
						} else {
							uni.showToast({
								title: "服务器崩溃啦😫",
								icon: "none"
							})
						}
					}
				})
			},
			Deletetable(id) {
				uni.request({
					url: this.$bashUrl + '/index.php/Home/Api/delCard',
					method: 'post',
					data: {
						id
					},
					success: (res) => {
						if (res.data) {
							uni.showToast({
								title: "删除成功!"
							})
						} else {
							uni.showToast({
								tiele: "删除失败请联系工作人员",
								icon: "none"
							})
						}
						this.pageInit()
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.des,
	.time {
		margin: 10upx;
		font-size: 24upx;

	}

	.ttt {
		width: 90%;
		margin: 0 auto;
	}
	.nothing{
		position: absolute;
		left: 50%;
		text-align: center;
		top: 50%;
		transform: translate(-50%,-50%);
		margin: auto;
		color: #999;
		font-size: 30upx;
		
	}
	.table {
		border-radius: 40rpx;
		height: 100rpx;
		width: 90%;
		display: flex;
		justify-content: center;
		background: #3462F7;
		align-items: center;
		color: #FFFFFF;
		position: fixed;
		bottom: 50rpx;
	}

	page {
		background: #FBFBFB;
	}

	.yshou-page {
		width: 90%;
		margin: 0 auto;
		padding-top: 50rpx;
	}

	.card {
		padding-left: 30rpx;
		padding-top: 20rpx;
		background: #FFFFFF;
		box-shadow: 0px 2px 2px #DCDCDC;
		margin-bottom: 30rpx;
	}

	.card-title {
		color: #474747;
		font-size: 25rpx;
	}

	.padding-top {
		padding-top: 10rpx;
	}

	.card-price {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.card-price-1 {
		margin-left: -10rpx;
		font-size: 45rpx;
		color: #FF5B5B;
	}

	.card-price-daoz {
		font-size: 25rpx;
		color: #4D4D4D;
		padding-right: 50rpx;
	}

	.card-date {
		color: #4D4D4D;
		font-size: 25rpx;
		display: flex;
		justify-content: flex-end;
		padding-right: 50rpx;
		padding-bottom: 45rpx;
	}

	.card-date-xq {
		padding-left: 20rpx;
	}
</style>
