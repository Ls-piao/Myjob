 <template>
 	<view>
		<view class="ttt">
			<view class="table" @click="onShowDatePicker('time')">
				添加时间
			</view>
		</view>
		<view class="yshou" style="margin-bottom: 500rpx;">
			<view class="yshou-page">
				<block v-for="(item,index) in itemList" :key="index">
					<view class="card">
						<text class="card-title">预约时间</text>
						<view class="padding-top card-price">
							<text style="margin-left: 20rpx;" class="card-price-1"><text class="card-price-2"> {{item.name}}</text></text>
						</view>
						<view  class="padding-top card-date">
							<text style="margin-right: 10rpx;margin-top: 10rpx;height: 10rpx;padding-bottom: 10rpx;">{{item.intime}}</text>
							<view @click="Deletetable(item.id)" style="color: #FFFFFF;border-radius: 10rpx;display: flex;flex-direction: row;align-items: center;justify-content: center;font-size: 25rpx;height: 50rpx;width: 120rpx;background: #FF5B5B;">
								删除
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
		  <mx-date-picker :show="showPicker" :type="type" :value="value" :show-tips="true" :begin-text="'入住'" :end-text="'离店'" :show-seconds="true" @confirm="onSelected" @cancel="onSelected" />
	</view>
 </template>
 
 <script>
	import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue";
 	export default {
		components: {
		    MxDatePicker
		},
 		data() {
 			return {
				itemList:[],
				shopid: 0,
				showPicker: false,
				time: '15:00:00',
				type: 'rangetime',
				value: ''           
 			}
 		},
 		onLoad:function(option){
 			this.shopid = option.shopid
 		},
 		onShow:function(){
 			var that = this
 			uni.request({
 				url: this.$bashUrl+ '/index.php/home/Api/time_list/',
 				method: 'POST',
 				data:{
					id: this.shopid
 				},
 				success:(res=>{
					that.itemList = res.data
					for(var i =0;i<res.data.length;i++){
						that.itemList[i].name = res.data[i].name.slice(0,5)
					}
					console.log(that.itemList)
 				})
 			})
 		},
 		methods: {
			onShowDatePicker(type){//显示
				this.type = type;
				this.showPicker = true;
				this.value = this[type];
			},
			onSelected(e) {//选择
				this.showPicker = false;
				if(e) {
					this[this.type] = e.value; 
					//上传营业时间
					var that = this
					uni.request({
						url: this.$bashUrl+ '/index.php/home/Api/new_time/',
						method: 'POST',
						data:{
							id: this.shopid,
							time: this.time
						},
						success:(res=>{
							var that = this
							uni.request({
								url: this.$bashUrl+ '/index.php/home/Api/time_list/',
								method: 'POST',
								data:{
									id: this.shopid
								},
								success:(res=>{
									that.itemList = res.data
									for(var i =0;i<res.data.length;i++){
										that.itemList[i].name = res.data[i].name.slice(0,5)
									}
								})
							})
							uni.showToast({
								title: '时间添加成功',
								icon:"none"
							});
						}),
						fail() {
							uni.showToast({
								title:'时间添加失败',
								icon:'none'
							})
						}
					})
				}
			},
			Deletetable:function(id){
				var that = this
				uni.request({
					url: this.$bashUrl+ '/index.php/home/Api/del_time/',
					method: 'POST',
					data:{
						id: id
					},
					success:(res=>{
						var that = this
						uni.request({
							url: this.$bashUrl+ '/index.php/home/Api/time_list/',
							method: 'POST',
							data:{
								id: this.shopid
							},
							success:(res=>{
								that.itemList = res.data
								for(var i =0;i<res.data.length;i++){
									that.itemList[i].name = res.data[i].name.slice(0,5)
								}
							})
						})
						uni.showToast({
							title: '删除成功',
							icon:'none'
						})
					})
				})
			}
 		}
 	}
 </script>
 <style>
 @import url('yshou.css');
 .test{
     text-align: center;
     padding: 10px 0;
 }
 </style>
 
 
 