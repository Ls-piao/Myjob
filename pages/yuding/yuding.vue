<template>
	<view class="box">
		<image class="box-img" src="../../static/Icon/yudin-topbar.png"></image>
		<view class="box-swiper">
			<tab-control :current="current" :values="items" bgc="#fff" :scrollFlag='true' @clickItem="onClickItem"></tab-control>
			<!-- 使用 swiper 配合 滑动切换 -->
			<swiper class="swiper" style="height: 100%;" :current='current'>
				<swiper-item v-for="(item,index) in items" :key='index'>
					<view class="swiperItem">{{item}}</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="content">
			<sl-filter :themeColor="themeColor" :menuList="menuList" themeBorder="#007AFF" @result="result" themeColor="#FFFFFF"></sl-filter>
		</view>
		<view class="renqi-tuijian">
			<view class="item-list">
				<block v-for="(item,index) in itemList" :key="index">
					<view class="item-list-1" @click="TogoodsDatils" :data-id="item.id">
						<view class="item-list-1-2">
							<view class="status" v-if="item.status==20">
								已打烊
							</view>
							<image class="item-list-img" :src="imgUrl+item.img" mode=""></image>
						</view>
						<view class="shop-card-title shop-card-title-1">
							<text class="shop-card-title-name">{{item.name}}</text>
							<view class="shop-card-title-car">
								{{item.type_name}}
							</view>
							<view class="shop-card-title-jieshao">
								<image class="shop-card-title-jieshao-img" src="../../static/Icon/start.png" mode=""></image>
								<text class="shop-card-title-price">5</text>
								<!-- <text class="shop-card-title-time">¥50/次 </text> -->
								<text class="shop-card-title-qm">{{item.distance?item.distance:''}}</text>
							</view>
							<view class="">
								<view class="shop-card-title-book-tag-1">
									<view class="shop-card-title-book-price">
										<text class="shop-card-title-book-price-n">9</text>
										<text class="shop-card-title-book-price-z">折</text>
									</view>
									<view class="shop-card-title-book-tag-y">
										预定
									</view>
									<view class="shop-card-title-book-tag-m">
										热门
									</view>
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	import tabControl from '@/components/tabControl-tag/tabControl-tag.vue';
	import slFilter from '@/components/sl-filter/sl-filter.vue';
	import qqmapsdk from '../../sdk/qqmap-wx-jssdk.js'
	const QQMapWX = new qqmapsdk({
		key: 'IFIBZ-YVHCX-HNP4H-TK34M-35AMT-D2FV4'
	});
	export default {
		components: {
			tabControl,
			slFilter
		},
		data() {
			return {
				items: ['推荐', '最新', '附近'],
				current: 0,
				themeColor: '#000000',
				filterResult: '',
				menuList: [{
					'title': '筛选',
					'isMutiple': true,
					'key': 'jobType',
					'detailList': [{
							'title': '推荐',
							'value': 'all'
						},
						{
							'title': '餐饮美食',
							'value': 'food'
						},
						{
							'title': '汽车',
							'value': 'car'
						},
						{
							'title': '其他',
							'value': 'other'
						}
					]
				}],
				itemList: [],
				originList:[],
				imgUrl: '',
				page:1
			}
		},
		onLoad: function(option) {
			this.imgUrl = this.$imgUrl
			var that = this
			uni.request({
				url: this.$bashUrl + '/index.php/home/Api/home/',
				method: 'POST',
				data: {
					type: 'all',
					page: 1,
					limit: 20
				}, 
				success: (res => {
					console.log(res)
					var lat1 = 0
					var lat2 = 0
					var lng1 = 0
					var lng2 = 0
					uni.getLocation({
						type: 'gcj02',
						geocode: true,
						success: res => {
							console.log(res)
							lat1 = res.latitude
							lng1 = res.longitude;
						},
						complete: () => {
							QQMapWX.reverseGeocoder({
								location: {
									latitude: lat1,
									longitude: lng1
								},
								success: res => {
									console.log(res)
									lat1 = res.result.location.lat
									lng1 = res.result.location.lng
								}
							})
							console.log(lat1, lng1)
							res.data.forEach((item, index) => {
								this.originList.push(item)
								if (item.lat && item.lng) {
									this.$set(item,'distance',that.$dis(lat1, lng1, Number(item.lat), Number(item.lng)))
								}
							})
						}
					})
					that.itemList = res.data
					
				})
			})
		},
		methods: {
			onReachBottom() {
				var that = this
				this.page++
				uni.showLoading({
					title: "拼命加载中"
				})
				uni.request({
					url: this.$bashUrl + '/index.php/home/Api/home/',
					method: 'POST',
					data: {
						type: 'all',
						page: this.page,
						limit: this.limit
					},
					success: res => {
						console.log(res)
						uni.hideLoading()
						var lat1 = 0
						var lat2 = 0
						var lng1 = 0
						var lng2 = 0
						uni.getLocation({
							type: 'gcj02',
							geocode: true,
							success: res => {
								console.log(res)
								lat1 = res.latitude
								lng1 = res.longitude;
							},
							complete: () => {
								this.QQMapWX.reverseGeocoder({
									location: {
										latitude: lat1,
										longitude: lng1
									},
									success: res => {
										console.log(res)
										lat1 = res.result.location.lat
										lng1 = res.result.location.lng
									}
								})
								console.log(lat1, lng1)
								res.data.forEach((item, index) => {
									if (item.lat && item.lng) {
										this.$set(item,'distance',that.$dis(lat1, lng1, Number(item.lat), Number(item.lng)))
									}
								})
							}
						})
						if (res.data.length > 0) {
							res.data.forEach((item, index) => {
								this.itemList.push(item)
								
								
							})
						} else {
							uni.showToast({
								title: "没有更多数据啦！",
								icon: "none"
							})
						}
					}
				})
			},
			result: function(val) {
				// console.log('filter_result:' + JSON.stringify(val));
				this.filterResult = JSON.stringify(val, null, 2)
				console.log(this.filterResult)
			},
			onClickItem: function(val) {
				this.current = val.currentIndex
				if(val.currentIndex == 0){
					this.itemList = []
					this.originList.forEach(item=>{
						this.itemList.push(item)
					})
					console.log(this.itemList)
				}
				if(val.currentIndex==1){
					this.itemList = []
					this.originList.forEach(item=>{
						this.itemList.push(item)
					})
					this.itemList.sort(function(a,b){
						 	console.log('最新')
						 return b.hot - a.hot
					})
				}
				if(val.currentIndex==2){
					this.itemList = []
					this.originList.forEach(item=>{
						this.itemList.push(item)
					})
					console.log(this.itemList)
					this.itemList.sort(function(a,b){
						 return parseInt(b.distance) - parseInt(a.distance)
					})
				}
			},
			TogoodsDatils: function(event) {
				var shopID = event.currentTarget.dataset.id;
				uni.navigateTo({
					url: '/pages/goods-details/goods-details?id=' + shopID
				})
			}
		}
	}
</script>

<style>
	@import url("yuding.css");
</style>
