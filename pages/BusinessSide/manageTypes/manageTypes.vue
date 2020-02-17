<template>
	<view>
		<view class="header">
			<button style="background: #3374FF;color:#fff" @tap="toCreate">新建</button>
		</view>
		<view class="aa">
			
			<block v-for="(item,index) in typeList" :key="index">
				<checkbox-group class="typerow">
					<label>
						<checkbox :value="item.id" :data-checked="item.checked" :data-id="item.id" :data-index="index" :checked="item.checked" @tap="tabCheck" />{{item.name}}
					</label>
				</checkbox-group>
			</block>
		</view>

		<view class="delBtn"  @tap="delTypes"  style="position: fixed;bottom: 0;width: 100%;height: 100rpx;background: #EE799F;display: flex;justify-content: center;align-items: center;color: #FFFFFF;font-size: 30rpx;">
			删除
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				shopid: 0,
				name: '',
				people: '',
				checkedList: [],
				typeList: [],
				checked: false
			}
		},
		onLoad: function(option) {
		
			this.shopid = option.id
			uni.request({
				url: this.$bashUrl + '/index.php/home/Api/type_lists',
				method: "post",
				data: {
					store_id: option.id
				}
			}).then(res => {
				this.typeList = res[1].data
				this.typeList.map(item => item.checked = this.checked)
			})
		},
		methods: {
			
			toCreate(){
				uni.redirectTo({
					url:'../addTypes/addTypes?id='+this.shopid,
				});
			},
			tabCheck(e) {
				this.typeList[e.target.dataset.index].checked = !this.typeList[e.target.dataset.index].checked
				if (!e.target.dataset.checked) {
					this.checkedList.push(e.target.dataset.id)
				} else {
						let index = this.checkedList.findIndex(item => item == e.target.dataset.id)
				if (index){
					this.checkedList.splice(index,1)
				}
				}
			},
			delTypes() {
				var that = this
				if(this.checkedList.length==0){
					uni.showToast({
						title: '请先勾选要删除的类别',
						icon: 'none'
					})
				}else{
					uni.request({
						url:this.$bashUrl+'/index.php/home/Api/type_mange',
						method:'post',
						data:{
							type:'dell',
							type_id :this.checkedList
						},
						success:(res=>{
							console.log(res)
							uni.showToast({
								title: '类别删除成功',
								icon: 'none'
							});
							uni.navigateBack({
								delta:1
							})
						}),
						fail: (err => {
							uni.showToast({
								title: '未添加成功',
								icon: 'none'
							});
						})
					})
				}
			},
			addType: function() {
			
				// var that = this
				// uni.request({
				// 	url: this.$bashUrl + '/index.php/home/Api/new_table/',
				// 	method: 'POST',
				// 	data: {
				// 		id: this.shopid,
				// 		name: this.name,
				// 		num: this.people
				// 	},
				// 	success: (res => {
				// 		console.log(res)
						// uni.showToast({
						// 	title: '类别添加成功',
						// 	icon: 'none'
						// });
				// 		setTimeout(function() {
				// 			uni.navigateTo({
				// 				url: '/pages/BusinessSide/caiwu-duizhang/caiwu-duizhang?shopid=' + that.shopid
				// 			})
				// 		}, 1000)
				// 	}),
					// fail: (err => {
					// 	uni.showToast({
					// 		title: '未添加成功',
					// 		icon: 'none'
					// 	});
					// })
				// })
			}

		}
	}
</script>

<style scoped lang="less">
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

	.typerow {
		padding: 20upx;

		.data-v-348cedcf {
			margin-right: 40upx;
		}
	}
</style>
