<template>
	<view class="box">
		<!-- <view class="11" @tap="totest">123123</view> -->
		<view class="header">
			<view class="h-address" @click="oncity">
				<view class="h-address-text">
					<image class="h-address-img" src="../../static/Icon/address.png"></image>
					<text>{{ region }}</text>
				</view>
			</view>
			<view class="header-search">
				<view class="h-search" @click="ToSearch">
					<image class="h-search-img uni-icon" src="../../static/Icon/search.png"></image>
					<text style="font-size: 25rpx;">搜索商品/品牌/商家</text>
				</view>
				<image @click="openCode" class="h-qrcode" src="../../static/Icon/vrcode.png"></image>
			</view>
		</view>
	
		<popup-layer ref="popupRef" :direction="'right'">
			<view style="width:750upx;height: 100%;">
				<citySelect @back_city="back_city" @region_city="region_city"></citySelect>
			</view>
		</popup-layer>

		<view class="b-swiper">
			<swiper class="swiper swiper-box" @touchstart="startx($event)" @touchend="endx($event)" :interval="interval"
			 :duration="duration" scroll-left="120">
				<block v-for="(item, index) in imgList" :key="index">
					<swiper-item>
						<view class="swiper-item uni-bg-red">
							<image class="swiper-item-img" :src="item.img" @click="toyaoqing"> </image>
						</view>
					</swiper-item>
				</block>
			</swiper>
			<view class="item-box-content">
				<view :class="[a, { 'item-box-crrunt': current1 == 0 }]"></view>
				<view :class="[a, { 'item-box-crrunt': current1 == 1 }]"></view>
				<view :class="[a, { 'item-box-crrunt': current1 == 2 }]"></view>
			</view>
			<view class="item-tip">
				<view>
					<image src="../../static/2020-1-icon/header1.png" mode=""></image>
					线上点餐     
				</view>
				<view class="itemmid">
					<image src="../../static/2020-1-icon/header2.png" mode=""></image>
					预订到店免排队     
				</view>
				<view>
					<image src="../../static/2020-1-icon/header3.png" mode=""></image>
					24小时在线服务     
				</view>
			</view>
		</view>
		<view class="configuration">
			<view class="configuration-item" @click="Toshoping" data-id="2">
				<image class="configuration-item-img" src="../../static/2020-1-icon/dingcan.png"></image>
				<text>餐饮美食</text>
			</view>
			<view class="configuration-item" @click="Toshoping" data-id="3">
				<image class="configuration-item-img" src="../../static/2020-1-icon/car.png"></image>
				<text>车业</text>
			</view>
			<view class="configuration-item" @click="Toshoping" data-id="4">
				<image class="configuration-item-img" src="../../static/2020-1-icon/hospital.png"></image>
				<text>医院</text>
			</view>
			<view class="configuration-item" @click="Toshoping" data-id="5">
				<image class="configuration-item-img" src="../../static/2020-1-icon/cup.png"></image>
				<text>生活服务</text>
			</view>
			<view class="configuration-item" @click="Toshoping" data-id="2">
				<image class="configuration-item-img" src="../../static/2020-1-icon/bank.png"></image>
				<text>银行排号</text>
			</view>
			<view class="configuration-item" @click="nothing" data-id="2">
				<image class="configuration-item-img" src="../../static/2020-1-icon/daikuan.png"></image>
				<text>我要贷款</text>
			</view>
			<view class="configuration-item" @click="nothing" data-id="2">
				<image class="configuration-item-img" src="../../static/2020-1-icon/shop.png"></image>
				<text>商城购物</text>
			</view>
			<view class="configuration-item" @click="nothing" data-id="2">
				<image class="configuration-item-img" src="../../static/2020-1-icon/hotel.png"></image>
				<text>酒店</text>
			</view>
			<view class="configuration-item" @click="nothing" data-id="2">
				<image class="configuration-item-img" src="../../static/2020-1-icon/hair.png"></image>
				<text>休闲娱乐</text>
			</view>
			<view class="configuration-item" @click="nothing" data-id="2">
				<image class="configuration-item-img" src="../../static/2020-1-icon/more.png"></image>
				<text>更多</text>
			</view>
		</view>
		<view class="hot-gongao">
			<view class="hot-title">最新公告</view>
			<view class="hot-text" style="color:#8E8E93;">莫等闲商城正式上线了！</view>
		</view>
		<view class="shop">
			<view class="shop-hot">
				<text>精选商家</text>
				<view class="shop-all" @click="Toshoping" data-id="2">
					<text class="s-all">全部</text>
					<image class="ss-img" src="../../static/Icon/left.png" mode=""></image>
				</view>
			</view>
			<view class="shop-scroll">
				<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll">
					<block v-for="(item, index) in dataList" :key="index">
						<view :id="'demo' + index" class="scroll-view-item_H uni-bg-red" @click="TogoodsDatils" :data-id="item.id">
							<view class="shop-card">
								<view class="shop-card-pic">
									<view class="shop-card-pic-a">
										<!-- 显示图片 -->
										<!-- <image class="shop-card-pic-img" :src="imgUrl+item.img" mode=""></image> -->
										<!-- 测试图片 -->
										<view class="stauts-1" v-if="item.status==20">
											已打烊
										</view>
										<image class="shop-card-pic-img" :src="imgUrl+item.img" mode=""></image>
									</view>
									<!-- <text class="shop-card-pic-text">前方10位</text> -->
								</view>
								<view class="shop-card-title">
									<text class="shop-card-title-name danhangtext">{{ item.name }}</text>
									<view class="shop-card-title-car">{{ item.type_name }}</view>
									<view class="shop-card-title-jieshao">
										<image class="shop-card-title-jieshao-img" src="../../static/Icon/start.png" mode=""></image>
										<text class="shop-card-title-price">5.0</text>
										<!-- <text class="shop-card-title-time">¥50/次</text> -->
										<text class="shop-card-title-qm">{{item.distance?item.distance:""}}</text>
									</view>
									<view class="shop-card-title-book">
										<view class="shop-card-title-book-tag">
											<view class="shop-card-title-book-tag-y">预约</view>
											<view class="shop-card-title-book-tag-m">秒订</view>
										</view>
										<view class="shop-card-title-book-price">
											<text class="shop-card-title-book-price-n">9</text>
											<text class="shop-card-title-book-price-z">折</text>
										</view>
									</view>
								</view>
							</view>
						</view>
					</block>
				</scroll-view>
			</view>
		</view>

		<view class="advertising">
			<image class="advertising-img" src="../../static/2020-1-icon/5c9881bd3f436_03.png" mode=""></image>
		</view>
		<view class="brand">
			<view class="shop-hot cc"><text>热门品牌</text></view>
			<view class="brand-a">
				<view class="brand-list">
					<block v-for="(item, index) in hotShop" :key="index">
						<view class="brand-list-item" @click="TogoodsDatils" :data-id="item.id">
							<view class="status-2" v-if="item.status==20">
								已打烊
							</view>
							<image class="brand-list-img" :src="imgUrl + item.img" mode=""></image>
							<text class="brand-list-txt">{{ item.name }}</text>
							<!-- <block v-for="(item,index) in ppai" :key="index">
								<view class="brand-list-item" @click="TogoodsDatils">
									
									<image class="brand-list-img" :src="item.imgUrl" mode=""></image>
									<text class="brand-list-txt">{{item.title}}</text>
								</view>
							</block> -->
						</view>
					</block>
				</view>
			</view>
			<view class="discount">
				<image class="discount-1" src="../../static/Icon/jpai.png"></image>
				<image class="discount-2" src="../../static/Icon/zxiang.png"></image>
			</view>
			<view class="renqi-tuijian shop">
				<view class="item-list">
					<block v-for="(item, index) in dataList" :key="index">
						<view class="item-list-1" @click="TogoodsDatils" :data-id="item.id" >
							<view class="status" v-if="item.status==20">
								已打样
							</view>
							<image class="item-list-img" :src="imgUrl + item.img" loading="lazy" mode=""></image>
							<view class="shop-card-title shop-card-title-1">
								<text class="shop-card-title-name">{{ item.name }}</text>
								<view class="shop-card-title-car">{{item.type_name}} </view>
								<view class="shop-card-title-jieshao">
									<image class="shop-card-title-jieshao-img" src="../../static/Icon/start.png" mode=""></image>
									<text class="shop-card-title-price">5.0</text>
									<!-- <text class="shop-card-title-time">| ¥11/人 |</text> -->
									<text class="shop-card-title-qm">{{item.distance?item.distance:""}}</text>
								</view>
								<view class="">
									<view class="shop-card-title-book-tag-1">
										<view class="shop-card-title-book-price">
											<text class="shop-card-title-book-price-n">9</text>
											<text class="shop-card-title-book-price-z">折</text>
										</view>
										<view class="shop-card-title-book-tag-y">预约</view>
										<view class="shop-card-title-book-tag-m">秒订</view>
									</view>
								</view>
							</view>
						</view>
					</block>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import citySelect from '@/components/linzq-citySelect/linzq-citySelect.vue';
	import popupLayer from '@/components/popup-layer/popup-layer.vue';
	import qqmapsdk from '../../sdk/qqmap-wx-jssdk.js'
	const QQMapWX = new qqmapsdk({
		key: 'IFIBZ-YVHCX-HNP4H-TK34M-35AMT-D2FV4'
	});
	export default {
		components: {
			citySelect,
			popupLayer
		},
		mounted() {
			this.$refs.popupRef.close();
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
					// console.log(res)
					uni.hideLoading()
					var lat1 = 0
					var lat2 = 0
					var lng1 = 0
					var lng2 = 0
					uni.getLocation({
						type: 'gcj02',
						geocode: true,
						success: res => {
							// console.log(res)
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
									lat1 = res.result.location.lat
									lng1 = res.result.location.lng
								}
							})
							res.data.forEach((item, index) => {
								if (item.lat && item.lng) {
									item.distance = that.$dis(lat1, lng1, Number(item.lat), Number(item.lng))
								}
							})
							if (res.data.length > 0) {
								this.dataList = this.dataList.concat(res.data)
								// console.log(this.dataList)
							} else {
								uni.showToast({
									title: "没有更多数据啦！",
									icon: "none"
								})
							}
						}
					})

				}
			})
		},
		data() {
			return {
				region: '定位中...',
				// 轮播图控制变量
				indicatorDots: true,
				indicatorColor: '#ECECEC',
				indicatorActiveColor: '#3374FF',
				autoplay: true,
				interval: 7000,
				duration: 800,
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				dataList: [],
				imgUrl: '',
				hotShop: [],
				// 轮播图指示点
				current: 0,
				current1: 0,
				a: 'item-box',
				imgList: [{
						img: '../../static/imgs/213123123.png',
						xiaobiao: 0
					},
					{
						img: '../../static/imgs/213123123.png',
						xiaobiao: 1
					},
					{
						img: '../../static/imgs/213123123.png',
						xiaobiao: 2
					}
				],
				start: 0,
				startY: 0,
				limit: 20,
				page: 1,
				latitude: 0,
				longitude: 0
			};
		},
		onLoad: function() {
			// console.log(111)
			var that = this
			that.imgUrl = that.$imgUrl
			uni.request({
				url: that.$bashUrl + '/index.php/home/Api/home/',
				method: 'POST',
				data: {
					type: 'all',
					page: that.page,
					limit: that.limit
				},
				success: res => {
					console.log(res)
					var arr = [];
					var lat1 = 0
					var lat2 = 0
					var lng1 = 0
					var lng2 = 0
					uni.getLocation({
						type: 'wgs84',
						geocode: true,
						success: res => {
							// console.log('获取地理位置成功')
							// uni.showLoading({
							// 	title:"获取地理位置成功"
							// })
							// console.log(res)
							lat1 = res.latitude
							lng1 = res.longitude;
						},
						fail:(err)=>{
								// console.log('获取地理位置fail')
								// uni.showLoading({
								// 	title:"fail"
								// })
						},
						complete: () => {
							QQMapWX.reverseGeocoder({
								location: {
									latitude: lat1,
									longitude: lng1
								},
								success: res => {
									// console.log(res)
									lat1 = res.result.location.lat
									lng1 = res.result.location.lng
								}
							})
							// console.log(lat1, lng1)
							res.data.forEach((item, index) => {
								if (item.hot < 6) {
									arr.push(item)
								}
								if (item.lat && item.lng) {
									item.distance = that.$dis(lat1, lng1, Number(item.lat), Number(item.lng))
								}
							})
							that.hotShop = arr.slice(0, 6)
							// console.log(that.hotShop);
							// res.data.forEach((item,index)=>{
							// 	that.getDistance()
							// })
							// let arr1 = [] //营业
							// let arr2 = [] //打样
							// res.data.forEach(item=>{
							// 	if(item.status==10){
							// 		arr1.push(item)
							// 	}else{
							// 		arr2.push(item)
							// 	}
							// })
							// arr1 = arr1.concat(arr2)
							// console.log(arr2)
							that.dataList = res.data;
							
						}
					})
				}
			});
			// success: (res => {
			// 	console.log(res)
			// 	that.dataList = res.data
			// })
		},
		methods: {
			toyaoqing(){
				uni.navigateTo({
					url:"../wallet/wallet"
				})
			},
			// 经纬度转换成三角函数中度分表形式。
			rad(d) {
				return Math.PI * d / 180.0;
			},
			// 根据经纬度计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度

			totest() {
				// console.log(1)
				uni.navigateTo({
					url: "../count/count" 
					// url: "../decode/decode" 
				})
			},
			oncity: function() {
				var that = this;
				this.$refs.popupRef.show();
			},
			back_city: function(e) {
				// console.log(e);
				if (e !== 'no') {
					this.region = e.cityName;
					uni.setStorageSync("region", this.region)
					this.$refs.popupRef.close();
				} else {
					this.$refs.popupRef.close();
				}
			},
			region_city: function(e) {
				// console.log("region_city" + e);
				this.region = e;
				uni.setStorageSync("region", this.region)
			},
			// 打开二维码
			openCode: function() {
				uni.scanCode({
					success: function(res) {
						// console.log('条码类型：' + res.scanType);
						// console.log('条码内容：' + res.result);
					}
				});
			},
			startx: function(e) {
				e.preventDefault();
				// 记录位置
				(this.start = e.changedTouches[0].pageX), (this.startY = e.changedTouches[0].pageY);
			},
			endx: function(e) {
				// 滑动结束,判断位置
				console.log(this.star);
				e.preventDefault();
				var moveEndX = e.changedTouches[0].pageX;
				var moveEndY = e.changedTouches[0].pageY;
				var X = moveEndX - this.start;
				var Y = moveEndY - this.startY;
				console.log(X);
				console.log(Y);
				if (Math.abs(X) > Math.abs(Y) && X > 0) {
					// console.log('左');
					// 左滑动轮播状态集合，妈的写个轮播图这么费劲，用组件还是有坏处啊，还不如自己写一个
					var map = {
						'0': 0,
						'1': 0,
						'2': 1
					};
					this.current1 = map[this.current1];
				} else if (Math.abs(X) > Math.abs(Y) && X < 0) {
					// console.log('右');
					var map = {
						'0': 1,
						'1': 2,
						'2': 2
					};
					this.current1 = map[this.current1];
				}
			},
			scroll: function(e) {
				this.old.scrollTop = e.detail.scrollTop;
			},
			goTop: function(e) {
				this.scrollTop = this.old.scrollTop;
				this.$nextTick(function() {
					this.scrollTop = 0;
				});
				uni.showToast({
					icon: 'none',
					title: '纵向滚动 scrollTop 值已被修改为 0'
				});
			},
			// 统一存放跳转方法
			TogoodsDatils: function(event) {
				var shopID = event.currentTarget.dataset.id;
				uni.navigateTo({
					url: '/pages/goods-details/goods-details?id=' + shopID
				});
			},
			ToSearch: function() {
				uni.navigateTo({
					url: '/pages/search/search'
				});
			},
			ToSelectAddress: function() {
				uni.navigateTo({
					url: '/pages/select/address'
				});
			},
			nothing(){
				uni.showToast({
					title:"暂无改功能~",
					icon:"none"
				})
			},
			Toshoping: function(event) {
				var currentID = event.currentTarget.dataset.id;
				uni.navigateTo({
					url: '/pages/shoplist/shoplist?typeid=' + currentID,
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
		}
	};
</script>

<style>
	@import url('index.css');

	.item-box-content {
		margin-top: -20rpx;
	}

	.item-box-content {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.item-box {
		height: 15rpx;
		width: 15rpx;
		background: #ececec;
		border-radius: 100%;
		margin-right: 10rpx;
	}

	/* 选中指示点 */
	.item-box-crrunt {
		background: #3d7bff;
		width: 40rpx;
		border-radius: 20rpx;
	}

	.yearBg {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 600rpx;
		z-index: -1199;

	}
</style>
