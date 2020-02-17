<template>
	<view class="content">
		<view class="header">
			<view class="swiper-area">
				<swiper class="swiper" :indicator-dots="indicatorDots" :duration="duration" circular="true" indicator-color="#ffffff"
				 indicator-active-color="#FF546E" @change="swiperChange">
					<block v-for="(item,index) in bannerList" :key="index">
						<swiper-item>
							<!-- <view class="swiper-item" :style="{backgroundImage:'url('+item.imgUrl+')'}"></view> -->
							<image :src="imgUrl+item" mode="" class="swiper-item"></image>
						</swiper-item>
					</block>
				</swiper>
				<view class="dot-area tc">{{current}}/{{bannerList.length}}</view>
			</view>
			<view class="shop-card-title">
				<text class="shop-card-title-name">{{itemLista.name}}</text>
				<view class="shop-card-title-jieshao">
					<image class="shop-card-title-jieshao-img" src="../../static/Icon/start.png" mode=""></image>
					<text class="shop-card-title-price">5</text>
					<!-- <text class="shop-card-title-price">{{itemLista.score}}</text> -->
					<!-- <text class="shop-card-title-time">￥50/次 </text> -->
					<text class="shop-card-title-qm">{{itemLista.distance}}</text>
				</view>
				<view class="shop-card-title-book">
					<view class="shop-card-title-book-tag">
						<view class="shop-card-title-book-tag-y">
							预约
						</view>
						<view class="shop-card-title-book-tag-m">
							秒订
						</view>
					</view>
				</view>
			</view>
			<view class="header-author">
				<view class="header-author-0">
					<image class="h-img" src="../../static/Icon/shop.png" mode=""></image>
					<text class="h-title">营业时间</text>
					<text class="h-time">{{itemLista.open_time}}</text>
				</view>
				<!-- <view class="header-author-0 tip">
					<image class="h-img" src="../../static/Icon/shop.png" mode=""></image>
					<text class="h-title tip-title">Tip:</text>
					<text class="h-time">新鲜的火锅食材，劲爽的火锅底料，跳动的舌尖在桌上飞舞</text>
				</view> -->
				<view class="header-author-1">
					<image class="h-img-1" src="../../static/Icon/add.png" mode=""></image>
					<view class="header-author-1-o">
						<text class="h-title-1" @tap="getLocation">{{itemLista.address}}</text>
						<!-- <view @click="callPhone">
							<image class="h-pone" src="../../static/pone.png" mode=""></image>
						</view> -->
					</view>
				</view>
				<!-- <view class="header-author-juli">距您850m</view> -->
			</view>
		</view>
		<view v-if="kongzhi == 1&&status!=20" class="paidui" >
			<view class="paidui-title">
				<view class="paidui-title-1">
					<image class="paidui-title-img" src="../../static/rili.png" mode=""></image>
					<view class="paidui-title-txt">排队</view>
				</view>
				<text class="paidui-title-1-txt">等待时间仅供参考</text>
			</view>
			<view>
				<view class="paidui-tiem" v-if="li_state == 0">
					<view class="paidui-tiem-m">{{pp}}</view>
					<view class="paidui-tiem-w">前方<text class="paidui-tiem-p">{{paidui}}</text>位</view>
					<view class="paidui-tiem-f">预计{{paidui_t}}分钟</view>
				</view>
				<view class="paidui-tiem" style="display: flex;flex-direction: row;justify-content: center;" v-if="li_state == 1">
					排队已确认
				</view>
				<view class="paidui-tiem" style="display: flex;flex-direction: row;justify-content: center;" v-if="li_state == 2">
					排队已取消
				</view>
			</view>
			<view class="paidui-dizhi">
				<view class="paidui-dizhi-b" style="opacity: 0.001;">
					<image class="paidui-dizhi-img" src="../../static/Icon/address.png" mode=""></image>
					<!-- <text class="paidui-dizhi-tt">李四黄焖鸡</text> -->
				</view>
				<view :class="[bb,{'aa':quhao_1=='true'}]">
					<view v-if="quhao_1 == 'flase'" @click="quhao">
						取号
					</view>
					<view v-else>
						已取号
					</view>
				</view>
			</view>
			<view class="paidui-ttt">
				<text>过号需要重新排队 [实际以商家为主]</text>
			</view>
			<view v-if="notnet" class="notnet-A">
				餐厅当前未联网，暂停手机取号
			</view>
			<view v-if="notnet" class="notnet-B">
				<text>您可以致电商家，询问排队情况 ,</text>
				<text class="notnet-B-c" @click="callPhone">点击拨打</text>
			</view>
		</view>
		
		<view v-else-if="kongzhi == 0&&status!=20" class="yuyue">
			<view class="paidui-title">
				<view class="paidui-title-1">
					<image class="paidui-title-img" src="../../static/Icon/yuyue.png" mode=""></image>
					<view class="paidui-title-txt">预约</view>
				</view>
				<text class="paidui-title-1-txt">仅限当天预约</text>
			</view>
			<view class="paidui-tiem paidui-tiem-1">
				<view v-if="yyx" class="paidui-tiem-m">您已经预约在{{itemList1.point_time}}</view>
				<view v-else class="paidui-tiem-m">选中就餐人数,日期,时间</view>
			</view>
			<view class="yuyue-list">
				<!-- <view class="yuyue-text">
					<text class="yuyue-text-t">3小时前有人预约</text>
					<text>已有3人预约</text>
				</view> -->
				<view class="paidui-dizhi-quhao paidui-dizhi-quhao-1" @click="Todianchan" v-if="!yyx">
					<view>
						立即预约
					</view>
				</view>
			</view>
		</view>
		<view style="text-align: center;" v-if="status == 20">
			本店已打烊！营业时间{{itemLista.open_time}}
		</view>
		<view v-if="notnet" class="setting">
			<view class="setting-1">
				<image class="paidui-dizhi-quhao-1-1" src="../../static/Icon/warring.png" mode=""></image>
				<text>可以预约点餐时通知我!</text>
			</view>
			<view class="paidui-dizhi-quhao">
				<image class="paidui-dizhi-quhao-2" src="../../static/Icon/ldang.png" mode=""></image>
				<text>设置提醒</text>
			</view>
		</view>
		<view v-if="notnet" class="tiqianyyue">
			<view class="tiqianyyue-a">
				<view class="tiqianyyue-1">
					<image class="tiqianyyue-4" src="../../static/Icon/rlishi.png" mode=""></image>
					<view class="tiqianyyue-3">预</view>
					<view class="tiqianyyue-3">约</view>
				</view>
				<view class="tiqianyyue-2">
					<text class="tiqianyyue-2-1">火爆餐厅排队难？</text>
					<text class="tiqianyyue-2-2">提前预约，到店即可自取</text>
				</view>
			</view>
			<view class="tiqianyyue-b">
				去看看
			</view>
		</view>
		<!-- 推荐菜品 -->
		<view class="tuijian">
			<view class="tuijianmuen uni-common-mt">
				本店热门
			</view>
			<view class="shop-scroll">
				<scroll-view class="scroll-view_H" scroll-x="true">
					<view class="tuijianbox" v-for="(item,index) in hotList" :key="index">
						<image v-if="hotList.length>1" class="tuijianboximg" :src="imgUrl+item.img" mode=""></image>
						<image v-else class="tuijianboximg" src="../../static/zanwu.jpg" mode=""></image>
						<view class="tuijianboxtext">{{item.name}}</view>
					</view>

				</scroll-view>
			</view>
		</view>

		<!-- 评论展示 -->
		<!-- <view style="margin-top: 50rpx;margin-left: 15rpx;font-size: 35rpx;font-weight: blod;">
			用户评论:
		</view>
		<view class="pjia-box" v-if="comment" style="margin-top: 50rpx;">
			<view class="pjia-box-content" v-for="(item,index) in itemList5" :key="index">
				<view class="pjia-box-item" style="width: 90%;margin: 0 auto;">
					<view style="width: 100%;" class="pjia-box-item-text">
						<view style="display: flex;align-items: center;">
							<image style="height:100rpx;width:100rpx;border-radius: 100%;" src="../../static/imgs/st_pic.png" mode=""></image>
							<text style="color: #3B3B3B;font-size: 35rpx;margin-left: 20rpx;" class="padding-bottom">{{item.phone}}</text>
							<view style="display: flex;justify-content: flex-end;font-size: 25rpx;margin-left: 100rpx;">
								{{item.intime}}
							</view>
						</view>
						<view class="padding-bottom" style="margin-top:20rpx;display: flex;flex-direction: row;">
							<block v-for="(ite,index) in 5" :key="index">
								<image style="height:30rpx;width:30rpx;margin-right: 10rpx;" :src="index<item.score?'../../static/imgs/start-sle.png':'../../static/imgs/start1.png'"
								 mode=""></image>
							</block>
						</view>
						<view style="width:80%;margin-top: 30rpx;color: #8E8E93;font-size: 25rpx;letter-spacing: 3rpx;" class="padding-bottom">
							{{item.content}}
						</view>
						<view style="margin-bottom:40rpx;margin-top: 40rpx;display: flex;flex-direction: row;justify-content: flex-end;align-items: center;"
						 class="padding-bottom">
							<view style="margin-right: 30rpx;font-size: 25rpx;">
							</view>
						</view>
						<view v-if="item.replay != null" style="margin-bottom: 30rpx;background: #FFFAF1;padding: 15rpx 0;">
							<text style="font-size: 25rpx;">商家回复: </text>
							<text style="color: #8E8E93;padding-left: 20rpx;font-size: 25rpx;">{{item.replay}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="!comment" style="color: #8E8E93;margin-top: 100rpx;display: flex;justify-content: center;">
			暂无用户评论
		</view> -->
		<view class="meunBlog" v-if="isShow">
			<view class="iconX" @click="closeBlog">
				<image src="../../static/cancel.png" mode=""></image>
			</view>
			<view class="content">
				<view class="flex" style="background: #fff;">
					<view class="left-a" style="background: #fafafa;">
						<scroll-view scroll-y scroll-with-animation style="height:calc(100vh - 400upx)">
							<!-- 左边 -->
							<view class="flex-sub bg-pink ddd">
								<view :class="index == curListIndex ? 'true': 'false'" @tap="goAnchor" :data-id="item.id" class="padding-tb-sm"
								 v-for="(item, index) in leftNav" :key="index">
									<text>{{item.name}}</text>
								</view>
							</view>
						</scroll-view>
					</view>

					<view class="right-a">
						<view class="right-banner">
							<image class="hot-img" src="../../static/imgs/111.png" mode=""></image>
						</view>
						<view class="right-box">
							<scroll-view scroll-y scroll-with-animation style="height:calc(100vh - 400upx)" :scroll-into-view="'main-'+ mainCur"
							 @scroll="noScroll">
								<!-- 右边 -->
								<view class="flex-sub bg-red">
									<view v-for="(item, index) in rightNav" :key="index" :id="'main-'+ index">
										<view class="right-a-item">
											<image class="shop-img" :src="imgUrl+item.img" mode=""></image>
											<view class="right-a-box" style="height: 200upx;width: 100%;">
												<view class="shop-name">
													<text class="shop-name-text">{{item.name}}</text>
													<view class="shop-name-tuijian">
														<view class="shop-name-tuijian-1">
															推荐
														</view>
														<text class="shop-name-tuijian-2"></text>
													</view>
													<view class="shop-yueshou">
														<text class="shop-yueshou-1">销量 {{item.sales}}</text>
														<view class="shop-yueshou-2">
															<view class="shop-yueshou-2-price">
																<text class="shop-yueshou-2-price-1">¥</text>
																<text class="shop-yueshou-2-price-2">{{item.price}}</text>
															</view>
															<view class="flex justify-end text-center text-content bbb">
																<view class="item bg-blue" :class="rightListSum[index].delAnimation ? 'delRightShoppingCardAnimations' : 'delLeftShoppingCardAnimations'"
																 v-if="rightListSum[index].showDel" @click="delShoppingCard(index)">
																	<text>-</text>
																</view>
																<view class="hhh">
																	<view class="item bg-blue aaa" :data-index="index" @click="addShoppingCard">
																		<image class="add-img" src="../../static/imgs/291.png" mode=""></image>
																	</view>
																</view>
															</view>
														</view>
													</view>
												</view>
											</view>
											<view class="gray_big_line"></view>
										</view>
									</view>
								</view>
							</scroll-view>
						</view>
					</view>
					<!-- 小球动画 -->
					<view :animation="animationY" :style="'position:fixed;top:' + ballY + 'px;'" v-if="showBall">
						<view class="ball" :animation="animationX" :style="'position:fixed;left:' + ballX + 'px;'"></view>
					</view>
				</view>
				<view class="dibu-bottom" style="position: fixed; bottom: 50rpx;">
					<view class="dibu-bottom-1" style="width: 70%;height: 90rpx; border-radius: 70rpx;background-color: #191919;">
						<view class="dibu-bottom-1-left">
							<text class="dibu-bottom-z">总价</text>
							<view class="dibu-bottom-p">
								<text>¥</text>
								<text class="dibu-bottom-p-2">{{zprice}}</text>
							</view>
						</view>
					</view>
					<view class="dibu-bottom-2" :key="index" @click="submitOrder">
						确认订单
					</view>
					<view class="ball-red">{{shoppingCarz}}</view>
					<!-- 			<view style="font-size: 50rpx;color: #212121;">
						{{dddd}}
					</view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bb: 'paidui-dizhi-quhao',
				itemLista: {},
				isnet: true, // 联网（false为未联网，true为联网）
				notnet: false, // 未联网
				tabIndex: 1,
				indicatorDots: false,
				duration: 500,
				shopID: 0,
				shopTYPE: 0,
				shopname: 0,
				imgs: [
					'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4067865560,4104866691&fm=15&gp=0.jpg'
				],
				itemList: [{
					imgUrl: '../../static/Icon/pi1.png'
				}, {
					imgUrl: '../../static/Icon/pi1.png'
				}, {
					imgUrl: '../../static/Icon/pi1.png'
				}],
				current: 1, //当前下标
				isShowStoreWindow: false, //是否显示店铺列表
				isSkuWindow: false, //是否显示sku
				kongzhi: 0,
				itemList1: [],
				imgUrl: '',
				paidui: 0,
				paidui_t: 0,
				quhao_1: 'false',
				phone: '',
				did: 0,
				yyx: false,
				pp: 0,
				shopPhone: '',
				replayList: [],
				itemList5: [],
				comment: true,
				li_state: '',
				hotList: [],
				bannerList: [],
				isShow: false,
				rightListSum: [],
				showShoppingCart: true, // 购物车显示
				shoppingCartAnimation: false, // 购物车动画
				shoppingCarz: 0,
				shopId: 0,
				showBall: false, // 小球是否显示
				animationY: '', // 动画Y
				animationX: '', // 动画X
				ballY: '', // 小球当前位置Y
				ballX: '', // 小球当前位置X
				leftNav: [],
				rightNav: [],
				curListIndex: 0,
				mainCur: 0,
				listHeight: [], // 左边列表高度
				scrollY: '',
				Did: '',
				Tid: 0,
				zprice: 0.00, // 支付总价
				goodsList: [],
				order_id: 0,
				providerList: [],
				loading: false,
				dddd: '',
				status:0
			}
		},
		onLoad: function(option) {
			var that = this
			this.phone = uni.getStorageSync('phone')
			this.shopID = option.id
			this.imgUrl = this.$bashUrl + '/Uploads/'
			console.log(this.imgUrl)
			//获取弹窗
			uni.request({
				url: this.$bashUrl + '/index.php/home/Api/store_menu/',
				method: 'POST',
				data: {
					id: this.shopID
					// type: this.Tid
				},
				success: (res => {
					console.log(res)
					that.rightNav = res.data.goods
					that.leftNav = res.data.type
					var aarr = []
					for (var i = 0; i < that.rightNav.length; i++) {
						var newArr = {
							showDel: false,
							delAnimation: false,
							sum: 0,
						}
						aarr.push(newArr)
					}
					// 添加对应数据的购物车动画
					that.rightListSum = aarr
				})
			})
		},
		onShow: function(option) {
			this.phone = uni.getStorageSync('phone')
			var that = this
			uni.request({
				url: this.$bashUrl + '/index.php/home/Api/store_detail/',
				method: 'POST',
				data: {
					id: this.shopID
				},
				success: (res => {
					console.log(res)
					this.bannerList=[]
					this.bannerList.push(res.data.bunner1)
					this.bannerList.push(res.data.bunner2)
					this.bannerList.push(res.data.bunner3)
					console.log(this.bannerList)
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
									this.$set(res.data,'distance',that.$dis(lat1, lng1, Number(res.data.lat), Number(res.data.lng)))
						}
					})
					that.shopPhone = res.data.phone
					that.itemLista = res.data
					that.shopname = res.data.name
					that.status = res.data.status
					// this.shopTYPE = res.data.type
				})
			})
			uni.request({
				url: this.$bashUrl + '/index.php/home/Api/store_state/',
				method: 'POST',
				data: {
					id: this.shopID,
					phone: this.phone
				},
				success: (res => {
					console.log(res)
					if (res.data.lines) {
						that.quhao_1 = res.data.line_state
						that.paidui = res.data.lines
						that.paidui_t = that.paidui * 20
						that.pp = Number(res.data.number) + '号'
					}
					if (res.data.line_state == 'flase') {
						that.pp = '默认'
					}
					if (res.data.point) {
						that.itemList1 = res.data.point
						that.yyx = true
					} else {
						that.did = that.shopID,
							that.yyx = false
					}
					that.li_state = res.data.li_state
					console.log(that.li_state)
					that.kongzhi = res.data.state
				})
			})
			// 获取所有评论
			uni.request({
				url: this.$bashUrl + '/index.php/home/Api/comment_store/',
				method: 'POST',
				data: {
					id: this.shopID,
				},
				success: (res => {
					that.itemList5 = res.data
					if (res.data.length > 0) {
						that.comment = true
					} else {
						that.comment = false
					}
					for (var i = 0; i < res.data.length; i++) {
						var phone = that.itemList5[i].phone
						that.itemList5[i].phone = that.passwordTl(phone)
					}
				})
			})
			console.log('获取菜品')
			console.log(this.shopID)
			uni.request({
				url: this.$bashUrl + '/index.php/home/Api/store_menu/',
				method: 'POST',
				data: {
					id: Number(this.shopID)
				},
				success: res => {
					console.log(res)
					let hotArr = []
					if (res.data.goods.length > 0) {

						res.data.goods.forEach((item, index) => {
							if (index < 4) {
								hotArr.push(item)
							}
						})
						this.hotList = hotArr
					} else {
						this.hotList = [{
							img: '../../static/zanwu.jpg',
							name: '暂无数据'
						}]
					}
				}
			})

		},
		methods: {
			closeBlog() {
				this.isShow = false
				this.goodsList = []
			},
			//排队确认订单
			submitOrder() {
				console.log(11)
				if (this.goodsList.length > 0) {

					uni.showToast({
						title: "点餐成功",
						success: res => {
							setTimeout(()=>{
								
							uni.switchTab({
								url: "../reserve/reserve"
							})
							},1000)
						}
					})
					this.quhao_1 = true
				} else {
					uni.showToast({
						title: "请选择商品",
						icon: 'none'
					})
				}
			},
			// 删除购物车
			async delShoppingCard(index) {
				if (this.rightListSum[index].sum - 1 <= 0) {
					this.rightListSum[index].sum = this.rightListSum[index].sum - 1
					this.rightListSum[index].delAnimation = false
					this.setDelayTime(100).then(() => {
						this.rightListSum[index].showDel = false
					})
				} else {
					this.rightListSum[index].sum = this.rightListSum[index].sum - 1
				}
			},
			// 添加购物车
			addShoppingCard(e) {
				let index = e.currentTarget.dataset.index
				// 添加商品到goodsList
				this.goodsList.push(this.rightNav[index].id)
				this.rightListSum[index].sum = this.rightListSum[index].sum + 1
				this.rightListSum[index].delAnimation = true
				this.rightListSum[index].showDel = true
				// x, y表示手指点击横纵坐标, 即小球的起始坐标
				let ballX = e.detail.x,
					ballY = e.detail.y;
				this.createAnimation(ballX, ballY);
				// 计算购物车商品数量
				this.shoppingCarz++
				console.log()
				this.zprice = (parseFloat(this.zprice) + parseFloat(this.rightNav[index].price)).toFixed(2);
				// this.zprice = parseFloat(this.zprice) + parseFloat(this.rightNav[index].price) 
			},
			// 延迟执行
			setDelayTime(sec) {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						resolve()
					}, sec)
				});
			},
			// 创建动画
			createAnimation(ballX, ballY) {
				uni.getSystemInfo({
					success: async (e) => {
						// var bottomX = e.windowWidth; // 结束位置X
						var bottomX = 50; // 结束位置X
						var bottomY = e.windowHeight - 50; // 结束位置Y
						var animationX = this.flyX(bottomX, ballX); // 创建小球水平动画
						var animationY = this.flyY(bottomY, ballY); // 创建小球垂直动画
						this.ballX = ballX; // 小球当前位置X
						this.ballY = ballY; // 小球当前位置Y
						this.showBall = true; // 显示小球

						this.setDelayTime(100).then(() => {
							this.animationX = animationX.export(); // 执行动画X
							this.animationY = animationY.export(); // 执行动画Y
							// 400ms延时, 即小球的抛物线时长
							return this.setDelayTime(400);
						}).then(() => {
							this.animationX = this.flyX(0, 0, 0).export(); // 执行动画X
							this.animationY = this.flyY(0, 0, 0).export(); // 执行动画Y
							this.showBall = false; // 隐藏小球
							this.shoppingCartAnimation = true // 购物车动画
							// 400ms延时, 即小球的抛物线时长
							return this.setDelayTime(400);
						}).then(() => {
							this.shoppingCartAnimation = false // 购物车动画
						})

					}
				})
			},
			// 水平动画
			flyX(bottomX, ballX, duration) {
				/**
				 * bottomX 结束位置
				 * ballX 开始位置
				 * duration 动画持续时间
				 */
				let animation = uni.createAnimation({
					duration: duration || 400,
					timingFunction: 'linear',
				})
				animation.translateX(bottomX - ballX).step(); // 动画效果
				return animation;
			},
			// 垂直动画
			flyY(bottomY, ballY, duration) {
				/**
				 * bottomY 结束位置
				 * ballY 开始位置
				 * duration 动画持续时间
				 */
				let animation = uni.createAnimation({
					duration: duration || 400,
					timingFunction: 'ease-in',
				})

				animation.translateY(bottomY - ballY).step(); // 动画效果
				return animation;
			},
			// 滑动
			noScroll(e) {
				// console.log(e)

				this.scrollY = e.detail.scrollTop + 20
				// 当滚动到顶部
				if (this.scrollY < 0) {
					this.curListIndex = 0
					// this.mainCur = 0
					return true
				}
				// 在中间部分滚动
				for (let i = 0; i < this.listHeight.length - 1; i++) {
					let height = this.listHeight[i]
					// 思路 拿数组里面的开始、结束 值进行范围比较
					if (this.scrollY > height.start && this.scrollY < height.end) {

						this.curListIndex = i
						// this.mainCur = i
					}
				}
			},
			// 左边导航栏点击
			goAnchor(e) {
				this.curListIndex = e.currentTarget.dataset.id // 下标选中
				this.mainCur = e.currentTarget.dataset.id // 右边锚点
			},
			// 计算每个左边区块的高度
			calculateHeight() {
				let list = this.rightNav
				let tabHeight = 0;
				for (let i = 0; i < list.length; i++) {
					const query = uni.createSelectorQuery().in(this);
					query.select("#main-" + i).boundingClientRect(data => {
						let res = {}
						res.start = tabHeight // 开始高度
						tabHeight = tabHeight + data.height;
						res.end = tabHeight // 结束高度
						this.listHeight.push(res)
					}).exec();

					let rightListSum = {
						showDel: false,
						delAnimation: false, // 删除动画
						sum: 0,
					}
					this.rightListSum.push(rightListSum)
				}
			},
			// 生成微信支付签名算法
			sign: function(data) {
				let StringA = '';


			},
			//获取位置
			getLocation() {
				uni.getLocation({
					type: 'gcj02',
					success: (res) => {
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
						uni.openLocation({
							latitude:Number(this.itemLista.lat),
							longitude:Number(this.itemLista.lng)
						})
					},
					fail: res => {
						// 定位权限未开启，引导设置
						uni.showModal({
							title: '温馨提示',
							content: '您已拒绝定位,请开启'+res,
							confirmText: '去设置',
							success(res) {
								if (res.confirm) {
									//打开授权设置
									this.openSetting()
								}
							}
						})
					}
				})
			},
			openSetting() {
				// 打开小程序的设置
				// #ifdef MP-WEIXIN
				// uni.openSetting()
				// #endif
				// App跳转系统的设置界面
				// #ifdef APP-PLUS
				uni.getSystemInfo({
					success(res) {
						if (res.platform == 'ios') { //IOS
							plus.runtime.openURL("app-settings://");
						} else if (res.platform == 'android') { //安卓
							let main = plus.android.runtimeMainActivity();
							let Intent = plus.android.importClass("android.content.Intent");
							let mIntent = new Intent('android.settings.ACTION_SETTINGS');
							main.startActivity(mIntent);
						}
					}
				});
				// #endif
			},
			// 打电话
			callPhone: function() {
				uni.makePhoneCall({
					phoneNumber: this.shopPhone
				});
			},
			quhao: function() {
				// 排队
				var that = this
				if (uni.getStorageSync('phone')) {
					uni.request({
						url: this.$bashUrl + '/index.php/home/Api/lines/',
						method: 'POST',
						data: {
							id: this.shopID,
							phone: this.phone
						},
						success: (res => {
							// 前方排队人数
							that.pp = Number(res.data.number) + '号'
							that.paidui = Number(res.data.line) + 1
							that.paidui_t = that.paidui * 20
							uni.showToast({
								title: '取号成功',
								duration: 2000,
								success: res => {

								}
							})
							that.quhao_1 = 'true'
							setTimeout(() => {
								uni.showModal({
									title: "取号成功是否点餐",
									content: "是否去点餐",
									success: res => {
										console.log(res)
										if (res.confirm == true) {
											console.log(1)
											that.isShow = true
										}
									}
								})
							}, 2000)

						})
					})

				} else {
					uni.showToast({
						title: '未登录~',
						duration: 3000
					})
					uni.navigateTo({
						url: '/pages/sigUp/sigUp'
					})
				}
			},
			swiperChange(e) {
				this.current = e.detail.current + 1;
			},
			Todianchan(e) {
				if (!uni.getStorageSync('phone')) {
					uni.showToast({
						title: '未登录~',
						duration: 3000
					})
					uni.navigateTo({
						url: '/pages/sigUp/sigUp'
					})
				} else {
					uni.navigateTo({
						url: '/pages/paidui/paidui?aid=' + this.shopID + "&name=" + this.shopname + "&did=" + this.did
					})
				}
			},
			passwordTl: function(tl) {
				var reg = /^(\d{3})\d{4}(\d{4})$/;
				return (tl.replace(reg, "$1****$2"))
			}
		}
	}
</script>

<style lang="less" scoped>
	@import url("goods-details.css");
	@import url("paiduidiancan.css");

	.meunBlog {
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.5);
		position: fixed;
		left: 0;
		top: 0;

		.content {
			width: 95%;
			height: 95%;
			margin: auto;

		}

		.iconX {
			position: absolute;
			right: 20upx;
			width: 40upx;
			height: 40upx;
			top: 100upx;

			image {
				width: 40upx;
				height: 40upx;
			}
		}
	}
</style>
