<template>
	<view class="pjia">
		<view class="box-swiper">
		<tab-control :current="current" :values="items" bgc="#fff" :scrollFlag='true' @clickItem="onClickItem" ></tab-control>
		<!-- 使用 swiper 配合 滑动切换 -->
		<swiper class="swiper" style="height: 100%;" :current='current'>
		<swiper-item v-for="(item,index) in items" :key='index'><view class="swiperItem">{{item}}</view></swiper-item></swiper>
		</view>
		<view class="pjia-box"  v-if="current==0">
			<view class="pjia-box-content" v-for="(item,index) in itemList" :key="index">
				<view class="pjia-box-item">
					<image style="height:80rpx;width:100rpx;border-radius: 100%;" src="../../../static/imgs/st_pic.png" mode=""></image>
					<view style="width: 100%;" class="pjia-box-item-text">
						<text style="color: #3B3B3B;font-size: 35rpx;" class="padding-bottom">{{item.phone}}</text>
						<view class="padding-bottom" style="margin-top:10rpx;display: flex;flex-direction: row;">
							<block v-for="(ite,index) in 5" :key="index">
								<image style="height:30rpx;width:30rpx;margin-right: 10rpx;" :src="index<item.score?'../../../static/imgs/start-sle.png':'../../../static/imgs/start1.png'" mode=""></image>
							</block>
						</view>
						<view style="width:95%;margin-top: 15rpx;color: #8E8E93;font-size: 25rpx;letter-spacing: 3rpx;" class="padding-bottom">
							{{item.content}}
						</view>
						<view style="margin-bottom:40rpx;margin-top: 40rpx;display: flex;flex-direction: row;justify-content: flex-end;align-items: center;" class="padding-bottom">
							<view style="margin-right: 30rpx;font-size: 25rpx;">
								{{item.intime}}
							</view>
							<view @click="replayFunction(item.id)" style="font-size:25rpx;width: 100rpx;height: 60rpx;background: #3D7BFF;color: #FFFFFF;display: flex;flex-direction: row;justify-content: center;align-items: center;">
								回复
							</view>
	<!-- 						<view @click="te" style="margin-left: 20rpx;font-size:25rpx;width: 100rpx;height: 60rpx;border:1rpx solid #929292;color: #929292;display: flex;flex-direction: row;justify-content: center;align-items: center;">
								删除
							</view> -->
						</view>
						<view v-if="item.replay != null"  style="margin-left: -100rpx;margin-bottom: 30rpx;background: #FFFAF1;padding: 15rpx 0;">
							<text style="font-size: 25rpx;">商家回复: </text>
							<text style="color: #8E8E93;padding-left: 20rpx;font-size: 25rpx;">{{item.replay}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="pjia-box"  v-if="current==1">
			<view class="pjia-box-content" v-for="(item,index) in itemList2" :key="index">
						<view class="pjia-box-item">
							<image style="height:80rpx;width:100rpx;border-radius: 100%;" src="../../../static/imgs/st_pic.png" mode=""></image>
							<view style="width: 100%;" class="pjia-box-item-text">
								<text style="color: #3B3B3B;font-size: 35rpx;" class="padding-bottom">{{item.phone}}</text>
								<view class="padding-bottom" style="margin-top:10rpx;display: flex;flex-direction: row;">
									<block v-for="(ite,index) in 5" :key="index">
										<image style="height:30rpx;width:30rpx;margin-right: 10rpx;" :src="index<item.score?'../../../static/imgs/start-sle.png':'../../../static/imgs/start1.png'" mode=""></image>
									</block>
								</view>
								<view style="width:95%;margin-top: 15rpx;color: #8E8E93;font-size: 25rpx;letter-spacing: 3rpx;" class="padding-bottom">
									{{item.content}}
								</view>
								<view style="margin-bottom:40rpx;margin-top: 40rpx;display: flex;flex-direction: row;justify-content: flex-end;align-items: center;" class="padding-bottom">
									<view style="margin-right: 30rpx;font-size: 25rpx;">
										{{item.intime}}
									</view>
									<view @click="replayFunction(item.id)" style="font-size:25rpx;width: 100rpx;height: 60rpx;background: #3D7BFF;color: #FFFFFF;display: flex;flex-direction: row;justify-content: center;align-items: center;">
										回复
									</view>
			<!-- 						<view @click="te" style="margin-left: 20rpx;font-size:25rpx;width: 100rpx;height: 60rpx;border:1rpx solid #929292;color: #929292;display: flex;flex-direction: row;justify-content: center;align-items: center;">
										删除
									</view> -->
								</view>
								<view v-if="item.replay != null"  style="margin-left: -100rpx;margin-bottom: 30rpx;background: #FFFAF1;padding: 15rpx 0;">
									<text style="font-size: 25rpx;">商家回复: </text>
									<text style="color: #8E8E93;padding-left: 20rpx;font-size: 25rpx;">{{item.replay}}</text>
								</view>
							</view>
						</view>
					</view>
		</view>
		<view class="pjia-box"  v-if="current==2">
			<view class="pjia-box-content" v-for="(item,index) in itemList3" :key="index">
						<view class="pjia-box-item">
							<image style="height:80rpx;width:100rpx;border-radius: 100%;" src="../../../static/imgs/st_pic.png" mode=""></image>
							<view style="width: 100%;" class="pjia-box-item-text">
								<text style="color: #3B3B3B;font-size: 35rpx;" class="padding-bottom">{{item.phone}}</text>
								<view class="padding-bottom" style="margin-top:10rpx;display: flex;flex-direction: row;">
									<block v-for="(ite,index) in 5" :key="index">
										<image style="height:30rpx;width:30rpx;margin-right: 10rpx;" :src="index<item.score?'../../../static/imgs/start-sle.png':'../../../static/imgs/start1.png'" mode=""></image>
									</block>
								</view>
								<view style="width:95%;margin-top: 15rpx;color: #8E8E93;font-size: 25rpx;letter-spacing: 3rpx;" class="padding-bottom">
									{{item.content}}
								</view>
								<view style="margin-bottom:40rpx;margin-top: 40rpx;display: flex;flex-direction: row;justify-content: flex-end;align-items: center;" class="padding-bottom">
									<view style="margin-right: 30rpx;font-size: 25rpx;">
										{{item.intime}}
									</view>
									<view @click="replayFunction(item.id)" style="font-size:25rpx;width: 100rpx;height: 60rpx;background: #3D7BFF;color: #FFFFFF;display: flex;flex-direction: row;justify-content: center;align-items: center;">
										回复
									</view>
			<!-- 						<view @click="te" style="margin-left: 20rpx;font-size:25rpx;width: 100rpx;height: 60rpx;border:1rpx solid #929292;color: #929292;display: flex;flex-direction: row;justify-content: center;align-items: center;">
										删除
									</view> -->
								</view>
								<view v-if="item.replay != null"  style="margin-left: -100rpx;margin-bottom: 30rpx;background: #FFFAF1;padding: 15rpx 0;">
									<text style="font-size: 25rpx;">商家回复: </text>
									<text style="color: #8E8E93;padding-left: 20rpx;font-size: 25rpx;">{{item.replay}}</text>
								</view>
							</view>
						</view>
					</view>
		</view>
		<view class="pjia-box"  v-if="current==3">
			<view class="pjia-box-content" v-for="(item,index) in itemList4" :key="index">
						<view class="pjia-box-item">
							<image style="height:80rpx;width:100rpx;border-radius: 100%;" src="../../../static/imgs/st_pic.png" mode=""></image>
							<view style="width: 100%;" class="pjia-box-item-text">
								<text style="color: #3B3B3B;font-size: 35rpx;" class="padding-bottom">{{item.phone}}</text>
								<view class="padding-bottom" style="margin-top:10rpx;display: flex;flex-direction: row;">
									<block v-for="(ite,index) in 5" :key="index">
										<image style="height:30rpx;width:30rpx;margin-right: 10rpx;" :src="index<item.score?'../../../static/imgs/start-sle.png':'../../../static/imgs/start1.png'" mode=""></image>
									</block>
								</view>
								<view style="width:95%;margin-top: 15rpx;color: #8E8E93;font-size: 25rpx;letter-spacing: 3rpx;" class="padding-bottom">
									{{item.content}}
								</view>
								<view style="margin-bottom:40rpx;margin-top: 40rpx;display: flex;flex-direction: row;justify-content: flex-end;align-items: center;" class="padding-bottom">
									<view style="margin-right: 30rpx;font-size: 25rpx;">
										{{item.intime}}
									</view>
									<view @click="replayFunction(item.id)" style="font-size:25rpx;width: 100rpx;height: 60rpx;background: #3D7BFF;color: #FFFFFF;display: flex;flex-direction: row;justify-content: center;align-items: center;">
										回复
									</view>
			<!-- 						<view @click="te" style="margin-left: 20rpx;font-size:25rpx;width: 100rpx;height: 60rpx;border:1rpx solid #929292;color: #929292;display: flex;flex-direction: row;justify-content: center;align-items: center;">
										删除
									</view> -->
								</view>
								<view v-if="item.replay != null"  style="margin-left: -100rpx;margin-bottom: 30rpx;background: #FFFAF1;padding: 15rpx 0;">
									<text style="font-size: 25rpx;">商家回复: </text>
									<text style="color: #8E8E93;padding-left: 20rpx;font-size: 25rpx;">{{item.replay}}</text>
								</view>
							</view>
						</view>
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
				current: 0,
				items: ['全部', '最新', '好评','差评'],
				shopid: 0,
				replayList: [],
				itemList: [],
				itemList2: [],
				itemList3: [],
				itemList4: [],
			}
		},
		onLoad:function(option){
			this.shopid = option.shopid
		},
		onShow:function(){
			var that = this
			// 获取所有评论
			uni.request({
				url: this.$bashUrl+ '/index.php/home/Api/comment_store/',
				method: 'POST',
				data:{
					id: this.shopid
				},
				success:(res=>{
					that.itemList = []
					that.itemList2 = []
					that.itemList3 = []
					that.itemList4 = []
					console.log(res.data)
					that.itemList = res.data
					that.itemList2 = res.data.sort((a,b)=> new Date(b.intime).getTime() - new Date(a.intime).getTime() )
					// that.itemList3 = 
					res.data.forEach(item=>{
						if(item.score >= 4){
							that.itemList3.push(item)
						}else{
							that.itemList4.push(item)
						}
					})
				})
			})
		},
		methods: {
			onClickItem:function(val) {
				this.current = val.currentIndex
				console.log("点击了事件"+val.currentIndex)
			},
			replayFunction:function(id){
				var that = this
				uni.navigateTo({
					url:'/pages/BusinessSide/addReplay/addReplay?id=' + id +"&shopid=" + that.shopid
				})
			},
			// 刷新方法
			refresh:function(){
				uni.request({
					url: this.$bashUrl+ '/index.php/home/Api/comment_store/',
					method: 'POST',
					data:{
						id: this.shopid
					},
					success:(res=>{
						that.itemList = res.data
					})
				})
			}
		}
	}
</script>

<style>
@import url("pj-guili");
</style>
