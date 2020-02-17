<template>
	<view>
		<view class="box-swiper">
				<tab-control :current="current" :values="items" bgc="#fff" :scrollFlag='true' @clickItem="onClickItem" ></tab-control>
		<!-- 使用 swiper 配合 滑动切换 -->
		<swiper class="swiper" style="height: 100%;" :current='current'>
		<swiper-item v-for="(item,index) in items" :key='index'><view class="swiperItem">{{item}}</view></swiper-item></swiper>
		</view>
		<view class="aaa" v-if="current === 0">
			<block v-for="(item,index) in a" :key="index">
				<view class="yudin-content">
					<view class="yudin-content-box">
						<view class="yudin-content-top">
							<view class="yudin-font">
								<view class="yudin-content-top-title">
									<text class="yudin-content-top-title-2" style="margin-left: -10rpx;">{{item.user_phone}}</text>
								</view>
								<view class="padding-top padding-top-1">
									<image src="../../../static/imgs/296.png" class="box-news-padding-img-1 img-1" mode=""></image>
									<text>{{item.num}}</text>
									<text>人就餐</text>
								</view>
								<view class="padding-top">
									<image src="../../../static/imgs/297.png" mode="" class="box-news-padding-img-1 img-2"></image>
									<!-- <text>2019/10/10</text>
									<text class="xqi">星期三</text>
									<text class="xqtime">20:00</text> -->
									<text>{{item.intime}}</text>
								</view>
								<view class="padding-top">
									<image src="../../../static/imgs/298.png" class="box-news-padding-img-1 img-3" mode=""></image>
									<text>大桌</text>
								</view>
							</view>
							<image class="yudin-content-top-img" src="../../../static/Icon/pi1.png" mode=""></image>
							</view>
							<view class="yudin-content-bottom">
								<view class="yudin-content-bottom-1 yudin-content-bottom-button">留言取消</view>
								<view class="yudin-content-bottom-2 yudin-content-bottom-button" @click="confirmAnorder(item.id,index)">确认通过</view>
							</view>
						</view>
				</view>
				<view class="fengei"></view>
			</block>
		</view>
		<view class="bbb" v-if="current === 1">
			<block v-for="(item,index) in b" :key="index">
				<view class="yudin-content">
					<view class="yudin-content-box">
						<view class="yudin-content-top">
							<view class="yudin-font">
								<view class="yudin-content-top-title">
									<text class="yudin-content-top-title-2" style="margin-left: -10rpx;">{{item.user_phone}}</text>
								</view>
								<view class="padding-top padding-top-1">
									<image src="../../../static/imgs/296.png" class="box-news-padding-img-1 img-1" mode=""></image>
									<text>{{item.num}}</text>
									<text>人就餐</text>
								</view>
								<view class="padding-top">
									<image src="../../../static/imgs/297.png" mode="" class="box-news-padding-img-1 img-2"></image>
									<!-- <text>2019/10/10</text>
									<text class="xqi">星期三</text>
									<text class="xqtime">20:00</text> -->
									<text>{{item.intime}}</text>
								</view>
								<view class="padding-top">
									<image src="../../../static/imgs/298.png" class="box-news-padding-img-1 img-3" mode=""></image>
									<text>大桌</text>
								</view>
							</view>
							<image class="yudin-content-top-img" src="../../../static/Icon/pi1.png" mode=""></image>
							</view>
							<view class="yudin-content-bottom">
								<view class="yudin-content-bottom-1 yudin-content-bottom-button" @click="callphone" :data-id="item.user_phone">电话联系</view>
								<view class="yudin-content-bottom-2 yudin-content-bottom-button" @click="orderCompleted(item.id)" v-if="item.pay_state == 1">开始备餐</view>
							</view>
						</view>
				</view>
				<view class="fengei"></view>
			</block>
		</view>
		<view class="ccc" v-if="current === 2">
			<block v-for="(item,index) in c" :key="index">
				<view class="yudin-content">
					<view class="yudin-content-box">
						<view class="yudin-content-top">
							<view class="yudin-font">
								<view class="yudin-content-top-title">
									<text class="yudin-content-top-title-2" style="margin-left: -10rpx;">{{item.user_phone}}</text>
								</view>
								<view class="padding-top padding-top-1">
									<image src="../../../static/imgs/296.png" class="box-news-padding-img-1 img-1" mode=""></image>
									<text>{{item.num}}</text>
									<text>人就餐</text>
								</view>
								<view class="padding-top">
									<image src="../../../static/imgs/297.png" mode="" class="box-news-padding-img-1 img-2"></image>
									<!-- <text>2019/10/10</text>
									<text class="xqi">星期三</text>
									<text class="xqtime">20:00</text> -->
									<text>{{item.intime}}</text>
								</view>
								<view class="padding-top">
									<image src="../../../static/imgs/298.png" class="box-news-padding-img-1 img-3" mode=""></image>
									<text>大桌</text>
								</view>
							</view>
							<image class="yudin-content-top-img" src="../../../static/Icon/pi1.png" mode=""></image>
							</view>
							<view style="color: #A7A7AB;font-size: 25rpx;display: flex;justify-content: flex-end;margin-right: 30rpx;">
								已取消
							</view>
						</view>
				</view>
				<view class="fengei"></view>
			</block>
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
				current: 0,
				items: ['待确认', '已确认', '已取消'],
				a: [],
				b: [],
				c: [],
				itemList:[{
					
				},{
					
				},{
					
				}],
				store_id: 0
			}
		},
		onLoad:function(option){
			this.store_id = option.shopid
		},
		onShow:function(){
			var that = this
			uni.request({
				url: this.$bashUrl+ '/index.php/home/Api/new_orders/',
				method: 'POST',
				data:{
					store_id: this.store_id,
				},
				success:(res=>{
					console.log(res.data)
					for(var i=0;i<res.data.length;i++){
						if(res.data[i].state==0){
							that.a.push(res.data[i])
						}else if(res.data[i].state==1){
							that.b.push(res.data[i])
						}else if(res.data[i].state==2){
							that.c.push(res.data[i])
						}
					}
					console.log(that.a)
				}),fail:(err=>{
					console.log(err)
				}) 
			})
		},
		methods: {
			onClickItem:function(val) {
				this.current = val.currentIndex
				console.log("点击了事件"+val.currentIndex)
			},
			// 打电话
			callphone:function(e){
				var phone = e.currentTarget.dataset.id
				uni.makePhoneCall({
				    phoneNumber: phone
				});
			},
			// 订单确认
			confirmAnorder:function(value){
				var that = this
				uni.request({
					url: this.$bashUrl+ '/index.php/home/Api/query_order/',
					method: 'POST',
					data:{
						// type:1为确认，type:2为完成
						type: 1,
						order_id: value
					},
					success:(res=>{
						uni.request({
							url: this.$bashUrl+ '/index.php/home/Api/new_orders/',
							method: 'POST',
							data:{
								store_id: this.store_id,
							},
							success:(res=>{
								that.a = []
								that.b = []
								that.c = []
								for(var i=0;i<res.data.length;i++){
									if(res.data[i].state==0){
										that.a.push(res.data[i])
									}else if(res.data[i].state==1){
										that.b.push(res.data[i])
									}else if(res.data[i].state==2){
										that.c.push(res.data[i])
									}
								}
							}),fail:(err=>{
								console.log(err)
							}) 
						})
					}),fail:(err=>{
						console.log('失败');
					}) 
				})
				uni.showToast({
					title: '已确认通过',
					icon:'none'
				});
			},
			// 订单已完成
			orderCompleted:function(value,index){
				// 删除指定元素
				var that = this
				uni.request({
					url: this.$bashUrl+ '/index.php/home/Api/query_order/',
					method: 'POST',
					data:{
						// type:1为确认，type:2为完成
						type: 2,
						order_id: value
					},
					success:(res=>{
						that.a = []
						that.b = []
						that.c = []
						uni.request({
							url: this.$bashUrl+ '/index.php/home/Api/new_orders/',
							method: 'POST',
							data:{
								store_id: this.store_id,
							},
							success:(res=>{
								console.log(res.data)
								for(var i=0;i<res.data.length;i++){
									if(res.data[i].state==0){
										that.a.push(res.data[i])
									}else if(res.data[i].state==1){
										that.b.push(res.data[i])
									}else if(res.data[i].state==2){
										that.c.push(res.data[i])
									}
								}
							}),fail:(err=>{
								console.log(err)
							}) 
						})
					}),fail:(err=>{
						console.log('失败');
					})
				})
				uni.showToast({
					title: '订单已确认完成',
					icon:"none"
				});
			}
		}
	}
</script>

<style>
@import url("yudin.css");
</style>
