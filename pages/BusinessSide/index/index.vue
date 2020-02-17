<template>
	<view class="box">
		<view class="box-header">
			<view class="box-header-1">
				<view class="header-title">

					<view class="box-header-top-title">
						<text class="box-name">{{name}}</text>
					</view>
					<view class="box-header-top-title-right">
						<switch style="transform: scale(0.7)" :checked="status==10" @change="switchChange" />
						<text class="box-name" style="display:inline-block;width: 140upx;text-align: center;">{{status==10?"正在营业":"已打烊"}}</text>
					</view>
				</view>
				<view class="box-header-top">
					<view class="box-header-top-1" @click="ToshopEdi">
						<image class="box-header-top-1-img" src="../../../static/Bussines-img/682c118e697277bfda115aa35b7e135.png" mode=""></image>
						<text class="box-header-top-1-text">商品管理</text>
					</view>
					<view class="box-header-top-1" @click="Toshopstting">
						<image class="box-header-top-1-img" src="../../../static/Bussines-img/a330aa794de148d9a4bad90996052e7.png" mode=""></image>
						<text class="box-header-top-1-text">提现列表</text>
					</view>
					<view class="box-header-top-1" @click="Topzhanghu">
						<image class="box-header-top-1-img" style="height: 50rpx;" src="../../../static/Bussines-img/e60ccbc45e9c32af25601b2a95276da.png"
						 mode=""></image>
						<text class="box-header-top-1-text">账户管理</text>
					</view>
					<view class="box-header-top-1" @click="Topjia">
						<image class="box-header-top-1-img" src="../../../static/Bussines-img/e01423cc0299ec4384962d66288dcc1.png" mode=""></image>
						<text class="box-header-top-1-text">评价管理</text>
					</view>
			<!-- 		<view class="box-header-top-1" @tap="yonghu">
						<image class="box-header-top-1-img" src="../../../static/Bussines-img/person.png" mode=""></image>
						<text class="box-header-top-1-text">商户中心</text>
					</view> -->
				</view>
			</view>
		</view>
		<view class="box-title">
			<view class="box-header-top-d">
				<view class="box-title-item" @click="Toyudin">
					<image class="box-header-top-1-img" style="height: 43rpx;width: 47rpx;" src="../../../static/Bussines-img/0f3e7bd5819c17b4381358fcc379cbf.png"
					 mode=""></image>
					<text class="box-title-item-text">预定</text>
				</view>
				<view class="box-title-item" @click="Topaidui">
					<image class="box-header-top-1-img paidui" style="height: 43rpx;" src="../../../static/Bussines-img/9aae08e6beabeeef881fbdaef43e0b5.png"
					 mode=""></image>
					<text class="box-title-item-text">排队</text>
				</view>
				<view class="box-title-item" @click="Tocaiwu">
					<image class="box-header-top-1-img" style="height: 47rpx;" src="../../../static/Bussines-img/22244a94d445379aaa3f81c3f2d5307.png"
					 mode=""></image>
					<text class="box-title-item-text">桌号管理</text>
				</view>
				<view class="box-title-item" @click="Toyshou">
					<image class="box-header-top-1-img" style="width: 37rpx;" src="../../../static/Bussines-img/5f11e3f77ba63d7e3aa111fd1827fb3.png"
					 mode=""></image>
					<text class="box-title-item-text">预约时间</text>
				</view>
				<view class="box-title-item" @click="Tohongbao">
					<image class="box-header-top-1-img" style="width: 37rpx;" src="../../../static/quan4.png" mode=""></image>
					<text class="box-title-item-text">红包管理</text>
				</view>
			</view>
		</view>
		<view class="box-dindan">
			<view class="box-dindan-top">
				<view class="box-dindan-box">
					<view class="box-dindan-tag">
						<block v-for="(item,index) in tag" :key="index">
							<view :class="[b,{'current':index == tap}]" @click="tagClick" :data-id="index">
								<text>{{item}}</text>
							</view>
						</block>
					</view>
					<!-- 						<view class="box-dindan-all">
							<text class="box-dindan-all-text">查看更多</text>
							<image class="box-dindan-all-img" src="../../../static/Icon/left.png" mode=""></image>
							</view> -->
				</view>
				<view class="box-dindan-price" v-if="tap==0">
					<view class="box-dindan-price-a">
						<view class="box-dindan-price-a-1">
							<text class="box-dindan-price-title">营业额</text>
							<text class="box-dindan-price-count red-price">{{moneylist.all_money_j?moneylist.all_money_j:0}} 元</text>
						</view>
						<view class="box-dindan-price-a-1">
							<text class="box-dindan-price-title">可提现</text>
							<text class="box-dindan-price-count">{{moneylist.balance}} 元</text>
						</view>
					</view>
					<view class="box-dindan-price-a">
						<view class="box-dindan-price-a-1">
							<text class="box-dindan-price-title">实付金额</text>
							<text class="box-dindan-price-count">{{moneylist.moeny_j?moneylist.moeny_j:0}} 元</text>
						</view>
						<view class="box-dindan-price-a-1">
							<text class="box-dindan-price-title">订单数</text>
							<text class="box-dindan-price-count">{{moneylist.num_j}} 单</text>
						</view>
					</view>
				</view>
				<view class="box-dindan-price" v-if="tap==1">
					<view class="box-dindan-price-a">
						<view class="box-dindan-price-a-1">
							<text class="box-dindan-price-title">营业额</text>
							<text class="box-dindan-price-count red-price">{{moneylist.all_money_z?moneylist.all_money_z:0}} 元</text>
						</view>
						<view class="box-dindan-price-a-1">
							<text class="box-dindan-price-title">可提现</text>
							<text class="box-dindan-price-count">{{moneylist.balance}} 元</text>
						</view>
					</view>
					<view class="box-dindan-price-a">
						<view class="box-dindan-price-a-1">
							<text class="box-dindan-price-title">实付金额</text>
							<text class="box-dindan-price-count">{{moneylist.moeny_z?moneylist.moeny_z:0}} 元</text>
						</view>
						<view class="box-dindan-price-a-1">
							<text class="box-dindan-price-title">订单数</text>
							<text class="box-dindan-price-count">{{moneylist.num_z}} 单</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="box-news" v-if="zuotian">
			
			<view class="box-news-top">
				<block v-for="(item,index) in orders" :key="index">
						<view class="fengei"></view>
					<view class="box-news-content" @click.prevent="toDetails(item.id)">
						<text class="box-news-title box-news-padding">
							{{item.goods?item.goods:'无菜品消息'}}
						</text>
						<view class="box-news-padding">
							<image class="box-news-padding-img-1" src="../../../static/imgs/276.png" mode=""></image>
							<text class="box-news-padding-p">就餐人数</text>
							<text class="box-news-padding-n">{{item.num}}</text>
						</view>
						<view class="box-news-padding box-news-title box-news-padding-phone">
							<text>{{item.user_phone}}</text>
							<text class="a-time">{{item.intime}}</text>
						</view>
						<view class="box-news-padding box-news-padding-code1">
							<text class="box-news-padding-title">订单号:</text>
							<view class="box-news-padding-code">
								<text>EZ</text><text>{{a[index]}}</text>
							</view>
						</view>
						<view class="box-news-padding box-news-padding-bottom">
							<text class="red-price">￥{{item.money?item.money:'面议'}}</text>
							<text class="orderState" v-if="item.state==0" style="float: right;color: #DD524D;">未完成</text>
							<text class="orderState" v-else-if="item.state==3" style="float: right;color: #DD524D;">已取消</text>
							<text class="orderState" style="float: right;color: #00C777;" v-else>已完成</text>
							<view class="red-box" v-if="state == 1">
								折扣买单
							</view>
						</view>
					</view>
					<view class="fengei"></view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				a: [],
				b: 'box-dindan-tag-1',
				tag: {
					0: '今日',
					1: '昨日'
				},
				tap: 0,
				moneylist: {},
				orders: [],
				phone: '',
				tixian: '',
				shopid: 0,
				zuotian: true,
				jintian: true,
				name: '',
				status: 10
			}
		},
		onLoad: function(option) {
			this.shopid = option.shopid
		},
		onShow: function() {
			this.phone = uni.getStorageSync('phone')
			var that = this;
			uni.request({
				// 金额
				url: this.$bashUrl + '/index.php/home/Api/store_home/',
				method: 'POST',
				data: {
					store_id: that.shopid
				},
				success: (res => {
					console.log(res)
					that.moneylist = res.data
					that.tixian = res.data.balance
					that.name = that.moneylist.store_name
					that.status = res.data.status
				})
			})
			// 订单
			uni.request({
				url: this.$bashUrl + '/index.php/home/Api/new_orders/',
				method: 'POST',
				data: {
					store_id: that.shopid
				},
				success: (res => {
					console.log(res.data)
					if (res.data.length == 0) that.zuotian = false
					that.orders = res.data
					var numchange = 201922140000;
					for (var i = 0; i < that.orders.length; i++) {
						that.a[i] = numchange++;
					}
				}),
				fail: (err => {
					console.log(err)
				})
			})
		},
		methods: {
			switchChange(e) {
				console.log(e.detail.value)
				if (e.detail.value) {
					this.status = 10
				} else {
					this.status = 20
				}
				uni.request({
					url: this.$bashUrl + '/index.php/home/Api/OpenDoor/',
					method:"post",
					data:{
						status:this.status,
						id:this.shopid
					},
					success:res=>{
						if(res){
							if(this.status==10){
							uni.showToast({
								title:'店铺已开始营业'
							})
							}else if(this.status==20){
								uni.showToast({
									title:'店铺已打烊'
								})
							}
						}else{
							uni.showToast({
								title:'修改店铺失败，请退出重试'
							})
						}
					}
				})
			},
			toDetails(id) {
				uni.navigateTo({
					url: "/pages/BusinessSide/orderDetails/orderDetails?id=" + id
				})
				console.log(id)
			},
			tagClick: function(e) {
				this.tap = e.currentTarget.dataset.id;
			},
			Toyudin: function(e) {
				uni.navigateTo({
					url: '/pages/BusinessSide/yudin/yudin?shopid=' + this.shopid,
				})
			},
			Tohongbao() {
				uni.navigateTo({
					url: '/pages/BusinessSide/addHongbao/addHongbao?shopid=' + this.shopid
				})
			},
			Toyshou: function(e) {
				uni.navigateTo({
					url: '/pages/BusinessSide/yshou/yshou?shopid=' + this.shopid,
				})
			},
			Topaidui: function(e) {
				uni.navigateTo({
					url: '/pages/BusinessSide/paidui/paidui?shopid=' + this.shopid,
				})
			},
			ToshopEdi: function() {
				uni.navigateTo({
					url: '/pages/BusinessSide/goodsLists/goodsLists?shopid=' + this.shopid
				})
			},
			Tocaiwu: function() {
				uni.navigateTo({
					url: '/pages/BusinessSide/caiwu-duizhang/caiwu-duizhang?shopid=' + this.shopid,
				})
			},
			Topjia: function(e) {
				uni.navigateTo({
					url: '/pages/BusinessSide/pj-guanli/pj-guanli?shopid=' + this.shopid,
				})
			},
			yonghu: function() {
				uni.navigateTo({
					url: '/pages/BusinessSide/userOrder/userOrder?shopid=' + this.shopid,
				})
			},
			Topzhanghu: function(e) {
				// 传入余额
				console.log(this.tixian)
				uni.navigateTo({
					url: '/pages/BusinessSide/user-guanli/user-guanli?money=' + this.tixian + '&shopid=' + this.shopid,
				})
			},
			Toshopstting: function(e) {
				uni.navigateTo({
					url: '/pages/BusinessSide/tixianList/tixianList?shopid=' + this.shopid
				})
			}
		}
	}
</script>

<style>
	@import url("index.css");
</style>
