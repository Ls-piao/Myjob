<template>
	<view class="a">
		<tab-control :current="current" :values="items" bgc="#fff" :fixed="true" :scrollFlag='true' @clickItem="onClickItem"></tab-control>
		<!-- 使用 swiper 配合 滑动切换 -->
		<swiper class="swiper" style="height: 100%;" :current='current'>
			<swiper-item v-for="(item,index) in items" :key='index'>
				<view class="swiperItem">{{item}}</view>
			</swiper-item>
		</swiper>
		<view class="a-box">
			<view class="item-list" v-if="current==0">
				<block v-for="(item,index) in itemList" :key="index">
					<view class="item-list-1" @click="TogoodsDatils" :data-id="item.id">
						<view class="item-list-1-2">
							<image class="item-list-img" :src="imgUrl+item.img" mode=""></image>
						</view>
						<view class="shop-card-title shop-card-title-1">
							<text class="shop-card-title-name">{{item.name}}</text>
							<view class="shop-card-title-car">
								{{item.type_name}}
							</view> 
							<view class="shop-card-title-jieshao">
								<image class="shop-card-title-jieshao-img" src="../../static/Icon/start.png" mode=""></image>
								<text class="shop-card-title-price">6.0</text>
								<text class="shop-card-title-time">¥50/次 </text>
								<text class="shop-card-title-qm">{{item.distance}}</text>
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
			<view class="item-list" v-if="current==1">
				<block v-for="(item,index) in itemList1" :key="index">
					<view class="item-list-1" @click="TogoodsDatils" :data-id="item.id">
						<view class="item-list-1-2">
							<image class="item-list-img" :src="imgUrl+item.img" mode=""></image>
						</view>
						<view class="shop-card-title shop-card-title-1">
							<text class="shop-card-title-name">{{item.name}}</text>
							<view class="shop-card-title-car">
								{{item.type_name}}
							</view>
							<view class="shop-card-title-jieshao">
								<image class="shop-card-title-jieshao-img" src="../../static/Icon/start.png" mode=""></image>
								<text class="shop-card-title-price">6.0</text>
								<text class="shop-card-title-time">¥50/次 </text>
								<text class="shop-card-title-qm">{{item.distance?item.distance:"haoyuan o "}}</text>
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
			<view class="item-list" v-if="current==2">
				<block v-for="(item,index) in itemList2" :key="index">
					<view class="item-list-1" @click="TogoodsDatils" :data-id="item.id">
						<view class="item-list-1-2">
							<image class="item-list-img" :src="imgUrl+item.img" mode=""></image>
						</view>
						<view class="shop-card-title shop-card-title-1">
							<text class="shop-card-title-name">{{item.name}}</text>
							<view class="shop-card-title-car">
								{{item.type_name}}
							</view>
							<view class="shop-card-title-jieshao">
								<image class="shop-card-title-jieshao-img" src="../../static/Icon/start.png" mode=""></image>
								<text class="shop-card-title-price">6.0</text>
								<text class="shop-card-title-time">¥50/次 </text>
								<text class="shop-card-title-qm">{{item.distance}}</text>
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
			<view class="item-list" v-if="current==3">
				<block v-for="(item,index) in itemList3" :key="index">
					<view class="item-list-1" @click="TogoodsDatils" :data-id="item.id">
						<view class="item-list-1-2">
							<image class="item-list-img" :src="imgUrl+item.img" mode=""></image>
						</view>
						<view class="shop-card-title shop-card-title-1">
							<text class="shop-card-title-name">{{item.name}}</text>
							<view class="shop-card-title-car">
								{{item.type_name}}
							</view>
							<view class="shop-card-title-jieshao">
								<image class="shop-card-title-jieshao-img" src="../../static/Icon/start.png" mode=""></image>
								<text class="shop-card-title-price">6.0</text>
								<text class="shop-card-title-time">¥50/次 </text>
								<text class="shop-card-title-qm">{{item.distance}}</text>
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
	
	export default {
		components: {
			tabControl
		},
		data() {
			return {
				items: ['餐饮美食', '车业', '附近', '生活服务'],
				current: 0,
				itemList: [],
				itemList1: [],
				itemList2: [],
				itemList3: [],
				imgUrl: '',
				requesttype: 0,
				page: 1
			}
		},
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
							switch (item.type) {
								case '2':
									console.log('美食');
									this.itemList = this.itemList.concat(item);
									break
								case '3':
									console.log('车业');
									this.itemList1 = this.itemList1.concat(item);
									break
								case '4':
									console.log('附近');
									this.itemList2 = this.itemList2.concat(item);
									break
								case '5':
									console.log('生活服务');
									this.itemList3 = this.itemList3.concat(item);
									break
								default:
									console.log('参数出错');
							}
						})

						// this.dataList = this.dataList.concat(res.data)
						// console.log(this.dataList)
					} else {
						uni.showToast({
							title: "没有更多数据啦！",
							icon: "none"
						})
					}
				}
			})
		},
		onLoad: function(option) {
			this.imgUrl = this.$imgUrl
			var that = this
			this.requesttype = option.typeid
			uni.request({
				url: this.$bashUrl + '/index.php/home/Api/home/',
				method: 'POST',
				data: {
					type: this.requesttype,
					page: 1,
					limit: 20
				},
				success: (res => {
					// 类别分类：2是美食，3是车业，4是附近，5是生活服务 
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
					switch (that.requesttype) {
						case '2':
							console.log('美食');
							that.itemList = res.data;
							break
						case '3':
							console.log('车业');
							that.itemList1 = res.data;
							break
						case '4':
							console.log('附近');
							that.itemList2 = res.data;
							break
						case '5':
							console.log('生活服务');
							that.itemList3 = res.data;
							break
						default:
							console.log('参数出错');
					}
				})
			})
			this.current = option.id
		},
		methods: {
			onClickItem: function(val) {
				var that = this
				this.current = val.currentIndex
				var a = val.currentIndex + 2
				console.log("点击了事件" + a)
				if (that.requesttype == 2) {
					console.log('美食')
					uni.request({
						url: this.$bashUrl + '/index.php/home/Api/home/',
						method: 'POST',
						data: {
							type: a,
							page: 1,
							limit: 20
						},
						success: (res => {
							that.itemList1 = res.data
						})
					})
				} else if (that.requesttype == 3) {
					console.log('车业')
					uni.request({
						url: this.$bashUrl + '/index.php/home/Api/home/',
						method: 'POST',
						data: {
							type: a,
							page: 1,
							limit: 20
						},
						success: (res => {
							that.itemList1 = res.data
						})
					})
				} else if (that.requesttype == 4) {
					console.log('附近')
					uni.request({
						url: this.$bashUrl + '/index.php/home/Api/home/',
						method: 'POST',
						data: {
							type: a,
							page: 1,
							limit: 20
						},
						success: (res => {
							that.itemList2 = res.data
						})
					})
				} else if (that.requesttype == 5) {
					console.log('生活服务')
					uni.request({
						url: this.$bashUrl + '/index.php/home/Api/home/',
						method: 'POST',
						data: {
							type: a,
							page: 1,
							limit: 20
						},
						success: (res => {
							that.itemList2 = res.data
						})
					})
				}
			},
			TogoodsDatils: function(event) {
				var shopID = event.currentTarget.dataset.id;
				uni.navigateTo({
					url: '/pages/goods-details/goods-details?id=' + shopID,
				})
			},
		}
	}
</script>

<style>
	@import url("shoplist.css");
</style>
