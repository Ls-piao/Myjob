<template>
	<view class="yshou">
		<view class="yshou-page">
			<block v-for="(item,index) in itemList" :key="index">
				<view class="card">
					<text class="card-title">提现金额</text>
					<view class="padding-top card-price">
						<text class="card-price-1">￥<text class="card-price-2">{{item.money}}</text></text>
						<text v-if="item.state == 1" class="card-price-daoz">已到账</text>
						<text v-else class="card-price-daoz">未到账</text>
					</view>
					<view class="padding-top card-date">
						<text>{{item.intime}}</text>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemList:[],
				shopid: ''
			}
		},
		onLoad:function(option){
			this.shopid = option.shopid
		},
		onShow:function(){
			var that = this
			uni.request({
				url: this.$bashUrl+ '/index.php/home/Api/cash_list/',
				method: 'POST',
				data:{
					id: this.shopid,
				},
				success:(res=>{
					console.log(res)
					that.itemList = res.data
					console.log(that.itemList)
				})
			})
		},
		methods: {
			
		}
	}
</script>

<style>
	@import url("tixianList.css");
</style>
