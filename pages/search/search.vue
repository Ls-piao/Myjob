<template>
	<view class="box">
		<view class="container">
		  <view class='header' style="margin-top: 20rpx;">
		    <view class='search-container'>
		      <image class='icon' src='../../static/Icon/search.png' />
		      <input placeholder-class='in-bar' placeholder="搜索商品/品牌/商家" v-model="searchValue" class='bar' auto-focus='true' />
		    </view>
		    <view class='cancel' style="margin-left: 20rpx;" @click="searchclick">搜索</view>
			</view>
		</view>
		<!-- 历史搜索Or热门搜索 -->
	  <view style="margin-top: 100rpx;margin-bottom: 50rpx;" v-if="!ss">
<!-- 		  <view class="history">
			<view class="title">
			  <text>历史搜索</text>
			  <view class="title-ls" @click="clearlsSearch">
			  	<image class="title-ls-1" src="../../static/Icon/ljt.png" mode=""></image>
				<text class="title-ls-2">清空</text>
			  </view>
			</view>
			<view class="tags tags1">
				<block v-for="(item,index) in lishiSearch" :key="index">
					<view class="tags-2">
						<vtag size="small" inverted="true" circle="true" :text="item"></vtag>
					</view>
				</block>
			</view>
		  </view> -->
		  <view class="history hot-search">
			<view class="title">
			  <text>热门搜索</text>
			</view>
			<view class='tags tags2'>
				<block v-for="(item,index) in hotSearch" :key="index">
					<view class="tags-2">
						<vtag size="small" inverted="true" circle="true" @click="getValue(index)" :text="item"></vtag>
					</view>
				</block>
			</view>
		</view>
	  </view>
		<!-- 搜索 -->
	  <view class="item-list" v-if="ss">
		<block v-for="(item,index) in dataList" :key="index">
			<view class="item-list-1" @click="TogoodsDatils" :data-id="item.id">
				<image class="item-list-img" :src="imgUrl+item.img" mode=""></image>
				<view class="shop-card-title shop-card-title-1">
					<text class="shop-card-title-name">{{item.name}}</text>
					<view class="shop-card-title-car">
						咖啡 | 标签标签
					</view>
					<view class="shop-card-title-jieshao">
						<image class="shop-card-title-jieshao-img" src="../../static/Icon/start.png" mode=""></image>
						<text class="shop-card-title-price">5.0</text><text class="shop-card-title-time">| ¥11/人 |</text><text class="shop-card-title-qm">3.7Km</text>
					</view>
					<view class="">
						<view class="shop-card-title-book-tag-1">
							<view class="shop-card-title-book-price">
								<text class="shop-card-title-book-price-n">9</text>
								<text class="shop-card-title-book-price-z">折</text>
							</view>
							<view class="shop-card-title-book-tag-y">
								预约
							</view>
							<view class="shop-card-title-book-tag-m">
								秒订
							</view>
						</view>
					</view>
				</view>
			</view>
		</block>
	  </view>	
		
	</view>
</template>
<script>
	import vtag from "@/components/uni-tag/uni-tag.vue"
	export default {
		components: {vtag},
		data() {
			return {
				lishiSearch:[],
				searchValue: '',
				hotSearch: ['地古牛','烧仙草','火锅'],
				ss: false,
				dataList: [],
				imgUrl: ''
			}
		},
		onShow:function(){
			this.imgUrl = this.$imgUrl
		},
		methods:{
			clearlsSearch:function(){
				this.lishiSearch = []
			},
			searchclick:function(){
				var that = this
				if(this.searchValue == ''){
					uni.showToast({
						title: '搜索不能为空',
						duration:3000
					});
				}else{
					console.log(this.searchValue)
					uni.request({
						url: this.$bashUrl+ '/index.php/home/Api/search_result/',
						method: 'POST',
						data:{
							search: this.searchValue
						},
						success:(res=>{
							console.log(res)
							if(res.data == ''){
								uni.showToast({
									title: '未入驻商家或商品',
									icon: 'none'
								});
							}else{
								that.ss = true
								that.dataList = res.data
								console.log(that.dataList)
							}
							// 清空输入框
							that.searchValue = ''
						})
					})
				}
			},
			getValue:function(index){
				var that = this
				uni.request({
					url: this.$bashUrl+ '/index.php/home/Api/search_result/',
					method: 'POST',
					data:{
						search: this.hotSearch[index]
					},
					success:(res=>{
						console.log(res)
						if(res.data == ''){
							uni.showToast({
								title: '未入驻商家或商品',
								icon: 'none'
							});
						}else{
							that.ss = true
							that.dataList = res.data
						}
						// 清空输入框
						that.searchValue = ''
					})
				})
			},
			// 商品跳转
			TogoodsDatils: function(event){
				var shopID = event.currentTarget.dataset.id;
				uni.navigateTo({
				    url: '/pages/goods-details/goods-details?id=' + shopID
				})
			 }
		}
	}
</script>

<style>
	@import url("search.css");
</style>
