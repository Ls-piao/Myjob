<!-- <template>
	<view class="wrapper">
		<view class="box-swiper">
				<tab-control class="aa" :current="current" :values="items" bgc="#fff" :scrollFlag='true' @clickItem="onClickItem" ></tab-control>
		<swiper class="swiper" style="height: 100%;" :current='current'>
		<swiper-item v-for="(item,index) in items" :key='index'><view class="swiperItem">{{item}}</view></swiper-item></swiper>
		</view>
		<view class="wrapper-content" v-if="current==0">
			<view class="box-dindan-tag">
				<block v-for="(item,index) in tag" :key="index">
					<view :class="[b,{'current':index == tap}]" @click="tagClick" :data-id="index">
						<text>{{item}}</text>
					</view>
				</block>
				<view class="wrapper-top" style="padding-left: 130rpx;" >
					<text style="color: #C6C3C6;font-size: 27rpx;letter-spacing: 3rpx;">查看更多</text>
					<image style="height: 20rpx;width: 10rpx;padding-left: 10rpx;" class="" src="../../../static/Icon/left.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="wrapper-content" v-if="current==1">
			<view class="box-dindan-tag">
				<block v-for="(item,index) in taa" :key="index">
					<view :class="[b,{'current':index == tap}]" @click="tagClick" :data-id="index">
						<text>{{item}}</text>
					</view>
				</block>
				<view class="wrapper-top" style="padding-left: 130rpx;" >
					<text style="color: #C6C3C6;font-size: 27rpx;letter-spacing: 3rpx;">查看更多</text>
					<image style="height: 20rpx;width: 10rpx;padding-left: 10rpx;" class="" src="../../../static/Icon/left.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="wrapper-item" v-if="current==0">
			<view class="wrapper-item-box" v-if="tap==0">
				<view class="box-dindan-price-aaa">
					<view class="box-dindan-price-a-1">
						<text class="box-dindan-price-title">营业额</text>
						<text class="box-dindan-price-count red-price">{{moneylist.all_money_j?moneylist.all_money_j:0}}</text>
					</view>
					<view class="box-dindan-price-a-1 box-dindan-price-a-2">
						<text class="box-dindan-price-title">实付金额</text>
						<text class="box-dindan-price-count">{{moneylist.moeny_j?moneylist.moeny_j:0}}</text>
					</view>
				</view>
				<view class="">
					<view class="box-dindan-price-a-1 box-dindan-price-a-3">
						<text class="box-dindan-price-title">订单数</text>
						<text class="box-dindan-price-count">{{moneylist.num_j}}</text>
					</view>
				</view>
			</view>
			<view class="wrapper-item-box" v-if="tap==1">
				<view class="box-dindan-price-aaa">
					<view class="box-dindan-price-a-1">
						<text class="box-dindan-price-title">营业额</text>
						<text class="box-dindan-price-count red-price">{{moneylist.all_money_z?moneylist.all_money_z:0}}</text>
					</view>
					<view class="box-dindan-price-a-1 box-dindan-price-a-2">
						<text class="box-dindan-price-title">实付金额</text>
						<text class="box-dindan-price-count">{{moneylist.moeny_z?moneylist.moeny_z:0}}</text>
					</view>
				</view>
				<view class="">
					<view class="box-dindan-price-a-1 box-dindan-price-a-3">
						<text class="box-dindan-price-title">订单数</text>
						<text class="box-dindan-price-count">{{moneylist.num_z}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tabControl from '@/components/tabControl-tag/tabControl-tag-1.vue';
	export default {
		components: {
			tabControl
		},
		data() {
			return {
				items: ['日账单', '月账单'],
				current: 0,
				b: 'box-dindan-tag-1',
				tag:{
					0:'今日',
					1:'昨日',
				},
				taa:{
					0:'今月',
					1:'昨月',
				},
				tap: 0,
				moneylist: [],
				shopid: 0
			}
		},
		onLoad:function(option){
			this.shopid = option.shopid
		},
		onShow:function(){
			var that = this
			uni.request({
				url: this.$bashUrl+ '/index.php/home/Api/store_home/',
				method: 'POST',
				data:{
					store_id: this.shopid
				},
				success:(res=>{
					console.log(res)
					that.moneylist = res.data
				})
			})
		},
		methods: {
			onClickItem:function(val) {
				this.current = val.currentIndex
				console.log("点击了事件"+val.currentIndex)
			},
			tagClick:function(e){
				this.tap = e.currentTarget.dataset.id;
			},
		}
	}
</script>

<style lang="less">
@import url('caiwu-duizhang.css');
</style>
 -->
 <template>
 	<view>
		<view class="ttt">
			<view class="table" @click="Toaddtable">
				添加席位
			</view>
		</view>
		<view class="yshou" style="margin-bottom: 500rpx;">
			<view class="yshou-page">
				<block v-for="(item,index) in itemList" :key="index">
					<view class="card" style="position: relative;">
						<text class="card-title">名称</text>
						<view class="padding-top card-price">
							<text style="margin-left: 20rpx;" class="card-price-1"><text class="card-price-2">{{item.table_name}}</text></text>
							<text class="card-price-daoz">人数:{{item.num}}</text>
						</view>
						<view  class="padding-top card-date">
							<text style="margin-right: 10rpx;margin-top: 10rpx;height: 10rpx;padding-bottom: 10rpx;">{{item.intime}}</text>
							<view @click="Deletetable(item.id)" style="color: #FFFFFF;border-radius: 10rpx;display: flex;flex-direction: row;align-items: center;justify-content: center;font-size: 25rpx;height: 50rpx;width: 120rpx;background: #FF5B5B;">
								删除
							</view>
						</view>
						<view style="position: absolute;top: 150rpx;left: 50rpx;">
							<!--  0是未使用，1是已使用，2已占用 -->
							<view @click="changeStats(item.state,item.id)" style="color: #FFFFFF;border-radius: 10rpx;display: flex;flex-direction: row;align-items: center;justify-content: center;font-size: 25rpx;height: 50rpx;width: 120rpx;background: #FF5B5B;">
								<text v-if="item.state == 0" class="stats-text">占用</text>
								<text v-else class="stats-text">取消占用</text>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
	</view>
 </template>
 
 <script>
 	export default {
 		data() {
 			return {
				itemList:[],
				shopid: 0
 			}
 		},
 		onLoad:function(option){
 			this.shopid = option.shopid
 		},
 		onShow:function(){
 			var that = this
 			uni.request({
 				url: this.$bashUrl+ '/index.php/home/Api/table_list/',
 				method: 'POST',
 				data:{
					id: this.shopid
 				},
 				success:(res=>{
					console.log(res.data)
 					that.itemList = res.data
 				})
 			})			
 		},
 		methods: {
			Toaddtable:function(){
				uni.navigateTo({
					url: '/pages/BusinessSide/addTable/addTable?shopid=' + this.shopid,
				})
			},
			Deletetable:function(id){
				var that = this
				uni.request({
					url: this.$bashUrl+ '/index.php/home/Api/del_table/',
					method: 'POST',
					data:{
						id: id
					},
					success:(res=>{
						uni.showToast({
							title: '删除成功',
							icon:"none"
						});
						// 重新请求数据
						uni.request({
							url: this.$bashUrl+ '/index.php/home/Api/table_list/',
							method: 'POST',
							data:{
								id: that.shopid
							},
							success:(res=>{
								
								that.itemList = res.data
							})
						})
					})
				})
			},
			changeStats:function(stats,id){
				// 修改桌子状态
				var map = {'0':1,'2':2}
				var typeId = map[stats]
				uni.request({
					url: this.$bashUrl+ '/index.php/home/Api/use_table/',
					method: 'POST',
					data:{
						id: id,
						type: typeId 
					},
					success:(res=>{
						var that = this
						uni.request({
							url: this.$bashUrl+ '/index.php/home/Api/table_list/',
							method: 'POST',
							data:{
								id: this.shopid
							},
							success:(res=>{
								that.itemList = res.data
							})
						})			
						uni.showToast({
							title: '状态修改成功',
							icon:'none'
						})
					})
				})
			}
 		}
 	}
 </script>
 <style>
 @import url('sit.css');
 </style>
 
 
 