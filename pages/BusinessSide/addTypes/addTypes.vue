<template>
	<view>
		<view class="aa">
			<view class="a">
				<text style="color: #666666;">类名</text>
				<input v-model="name" style="margin-left: 30rpx;" type="text" placeholder="请输入您的类名" placeholder-style="color:#B2B2B2;" />
			</view>
		</view>
		<view @click="addTypes" style="position: fixed;bottom: 0;width: 100%;height: 100rpx;background: #3D7BFF;display: flex;justify-content: center;align-items: center;color: #FFFFFF;font-size: 30rpx;">
			新建
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				shopid: 0,
				name: '',
				people: ''
			}
		},
		onLoad: function(option) {
			this.shopid = option.id
		},
		methods: {
			addTypes: function() {
				if (this.name) {
					uni.request({
						url: this.$bashUrl + '/index.php/home/Api/type_mange',
						method: 'POST',
						data: {
							type: 'add',
							store_id: this.shopid,
							name: this.name
						},
						success: (res => {
							console.log(res)
							uni.showToast({
								title: '添加类型成功'
							});
							setTimeout(function() {
								uni.navigateBack({
									delta: 1
								})
							}, 1000)
						}),
						fail: (err => {
							uni.showToast({
								title: '未添加成功',
								icon: 'none'
							});
						})
					})
				}else{
					uni.showToast({
						title:"请输入类名",
						icon:'none'
					})
				}
			}
		}
	}
</script>

<style>
	.aa {
		width: 90%;
		margin: 0 auto;
		background: #FFFFFF;
	}

	.a {
		padding-bottom: 20rpx;
		height: 90rpx;
		display: flex;
		padding-top: 20rpx;
		flex-direction: row;
		align-items: center;
		border-bottom: 1rpx solid #DEDEDE;
	}

	.fengei {
		height: 25rpx;
		width: 100%;
		background: #F3F3F3;
	}
</style>
