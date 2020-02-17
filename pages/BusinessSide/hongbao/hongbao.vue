<template>
	<view>
		<view class="aa">
			<view class="a">
				<text style="color: #666666;" class="left">红包名</text>
				<input class="right" v-model="name" style="margin-left: 30rpx;" type="text" placeholder="请输入红包名" placeholder-style="color:#B2B2B2;" />
			</view>
			<view class="a">
				<text style="color: #666666;" class="left">金额</text>
				<input class="right" v-model="num" style="margin-left: 30rpx;" type="text" placeholder="请输入红包金额" placeholder-style="color:#B2B2B2;" />
			</view>
			<view class="a">
				<text style="color: #666666;" class="left">有效期</text>
				<view class="right">

					<input style="margin-left:30upx;width: 200upx;" v-model="startDate" @tap="open('start')" type="date" placeholder="请输入有效期"
					 placeholder-style="color:#B2B2B2;" />
					 <view class="cc">
					 	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--
					 </view>
					<input style="margin-left:30upx;width: 200upx;" v-model="endDate" @tap="open('end')" type="date" placeholder="请输入有效期"
					 placeholder-style="color:#B2B2B2;" />
				</view>
				<uni-calendar ref="calendar" :date="info.date" :insert="info.insert" :lunar="info.lunar" :startDate="info.startDate"
				 :endDate="info.endDate" :range="info.range" @confirm="confirm" />
				<uni-calendar ref="calendar1" :date="info.date" :insert="info.insert" :lunar="info.lunar" :startDate="info.startDate"
				 :endDate="info.endDate" :range="info.range" @confirm="confirm1" />
			</view>

		</view>
		<view @click="addhongbao" style="position: fixed;bottom: 0;width: 100%;height: 100rpx;background: #3D7BFF;display: flex;justify-content: center;align-items: center;color: #FFFFFF;font-size: 30rpx;">
			新建
		</view>
	</view>
</template>
<script>
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
	export default {
		components: {
			uniCalendar
		},
		data() {
			return {
				shopid: 0,
				name: '',
				num:'',
				people: '',
				showCalendar: false,
				info: {
					date: '',
					startDate: '',
					endDate: '',
					lunar: true,
					range: true,
					insert: false,
					selected: []
				},
				startDate: "",
				endDate: ""
			}
		},
		onLoad: function(option) {
			this.shopid = option.shopid
		},
		methods: {
			open(type) {
				if (type == 'start') {

					this.$refs.calendar.open()
				} else if (type == 'end') {
					this.$refs.calendar1.open()
				}
			},
			confirm(e) {
				console.log('confirm 返回:', e)
				this.startDate = e.fulldate
			},
			confirm1(e) {
				console.log('confirm 返回:', e)
				this.endDate = e.fulldate
			},
			addhongbao(){
				uni.request({
					url:this.$bashUrl+'/index.php/Home/Api/cardadd',
					method:"post",
					data:{
						store_id:this.shopid,
						name:this.name,
						price:this.num,
						type:3,
						createtime:this.startDate,
						endtime:this.endDate
					},
					success: (res) => {
						if(res){
							uni.showToast({
								title:'新建成功',
								success:res=>{
									setTimeout(()=>{
										uni.navigateBack({
											delta:1
										})
									},2000)
								}
							})
						}else{
							uni.showToast({
								title:'新建失败，请稍后重试',
								icon:'none'
							})
						}
					}
				})
			}
		}
	}
</script>

<style scoped>
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
	.cc{
		width: 100upx;
		margin-left: 30upx;
	}
	.left{
		width: 200upx;
		font-size: 28upx;
		text-align: center;
	}
	.right{
		flex: 1;
	}
	.fengei {
		height: 25rpx;
		width: 100%;
		background: #F3F3F3;
	}
</style>
