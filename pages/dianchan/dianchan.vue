<template>
	<view id="test">
		<view>
			<!-- 头部 -->
			<view class="header-banner">
<!-- 				<view class="h-search" style="display: flex;flex-direction: row;justify-content: center;margin-top: 6rpx;
">
					<image class="h-search-img" src="../../static/Icon/search.png"></image>
					<view class="h-address-text">
						<text>请输入商品名</text>
					</view>
				</view> -->
				<view class="header-banner-box">
					<image class="header-banner-img" src="../../static/Icon/pi1.png" mode=""></image>
					<view class="header-banner-2">
						<text class="header-banner-2-text">开始点餐</text>
					</view>
				</view>
			</view>
			<!-- 内容 -->
			<view class="flex">
				<view class="left-a">
					<scroll-view scroll-y scroll-with-animation style="height:calc(100vh - 400upx)">
						<!-- 左边 -->
						<view class="flex-sub bg-pink ddd">
							<view :class="index == curListIndex ? 'true': 'false'" @tap="goAnchor(index,item.id)"   class="padding-tb-sm" v-for="(item, index) in leftNav" :key="index">
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
						<scroll-view scroll-y scroll-with-animation style="height:calc(100vh - 400upx)" :scroll-into-view="mainCur" @scroll="noScroll">
							<!-- 右边 -->
							<view class="flex-sub bg-red">
								<view v-for="(item, index) in rightNav" :key="index" :id="'order'+item.type">
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
															<!-- <view class="item bg-blue"  
															:class="rightListSum[index].delAnimation ? 'delRightShoppingCardAnimations' : 'delLeftShoppingCardAnimations'" 
															v-if="rightListSum[index].showDel" @click="delShoppingCard(index)">
																<text>-</text>
															</view> -->
															<view class="hhh">
														<!-- 		<view class="aaa-1" v-if="rightListSum[index].showDel">
																	<text class="aaa-2">{{rightListSum[index].sum}}</text>
																</view> -->
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
			<!-- 底部导航栏 -->
			<view class="dibu-bottom" style="position: fixed; bottom: 50rpx;">
				<view  class="dibu-bottom-1" style="width: 70%;height: 90rpx; border-radius: 70rpx;background-color: #191919;">
					<view class="dibu-bottom-1-left">
						<text class="dibu-bottom-z">总价</text>
						<view class="dibu-bottom-p">
							<text>¥</text>
							<text class="dibu-bottom-p-2">{{zprice}}</text>
						</view>
					</view>
				</view>
				<!-- <view v-for="(item,index) in providerList" class="dibu-bottom-2" :key="index" @click="requestPayment(item,index)"> -->
				<view v-for="(item,index) in providerList" class="dibu-bottom-2" :key="index" @click="toPay">
					去结算
				</view>
				<view class="ball-red">{{shoppingCarz}}</view>
	<!-- 			<view style="font-size: 50rpx;color: #212121;">
					{{dddd}}
				</view> -->
			</view>
			<view class="dasdasd"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rightListSum: [],
				showShoppingCart: true, // 购物车显示
				shoppingCartAnimation: false, // 购物车动画
				shoppingCarz: 0,
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
				imgUrl: '',
				zprice: 0.00,   // 支付总价
				goodsList: [],
				order_id: 0,
				providerList: [],
				loading: false,
				dddd: ''
			}
		},
		onLoad:function(option) {
			// 获取支付通道
			console.log('开始')
			  uni.getProvider({
					service: "payment",
					success: (e) => {
						console.log("payment success:" + JSON.stringify(e));
						let providerList = [];
						e.provider.map((value) => {
							switch (value) {
								case 'wxpay':
									providerList.push({
										name: '微信',
										id: value,
										loading: false
									});
									break;
								default:
									break;
							}
						})
						this.providerList = providerList;
						console.log(this.providerList)
					},
					fail: (e) => {
						console.log("获取支付通道失败：", e);
					}
				});
			this.order_id = option.orderid
			this.imgUrl = this.$imgUrl
			this.Did = option.aid  // id
			console.log(this.Did)
			// this.Tid = option.orderId // type
			this.calculateHeight()
			var that = this
			uni.request({
				url: this.$bashUrl+ '/index.php/home/Api/store_menu/',
				method: 'POST',
				data:{
					id: this.Did
					// type: this.Tid
				},
				success:(res=>{
					console.log(res)
					that.rightNav = res.data.goods
					that.leftNav =  res.data.type
					var aarr= []
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
		methods: {
			toPay(){
				uni.navigateTo({
					url:"../count/count?order_id="+this.order_id+"&goodslist="+this.goodsList+'&price='+this.zprice
				})
			},
			async requestPayment(e, index) {
				// 提交订单到后台商家
				var that = this
				console.log(parseFloat(this.zprice))
				if(parseFloat(this.zprice) != 0.00 && parseFloat(this.zprice)!=0){
					console.log('正在支付')
					uni.showLoading({
					    title: '正在支付...'
					});
					this.providerList[index].loading = true;
					// 传入price,body,订单号（随机生成）
					// e.id为支付通道
					let orderId = '';
					orderId =  this.randomOrder(orderId)
					console.log(orderId)
					let price = this.zprice
					let body = "莫等闲-预定支付";
					let orderInfo1 = await this.getOrderInfo(orderId,price,body);
					console.log(orderInfo1)
					
					
					if(!orderInfo1.appid)
					{
						uni.showToast({
							title: '支付信息有误',
							icon: 'none'
						});
						uni.hideLoading();
						return false;
					}
					// 生成签名支付签名算法
					var obj={
								appid: orderInfo1.appid,      //id 应用id
								partnerid:orderInfo1.partnerid,              //商户号 
								prepayid: orderInfo1.prepayid,                         //预支付
								package:'Sign=WXPay',
								noncestr:orderInfo1.noncestr,
								timestamp:orderInfo1.timestamp,   //时间戳
								sign:orderInfo1.sign
							}
					let orderInfo = JSON.stringify(obj)
					uni.requestPayment({
						provider: 'wxpay',
						orderInfo: orderInfo,
						success: (e) => {
							// that.dddd = e
							uni.request({
								url: this.$bashUrl+ '/index.php/home/Api/user_order/',
								method:'POST',
								data:{
									id: this.order_id,
									price: this.zprice,
									goods: this.goodsList,
									pay_state: 1
								},
								success(res) {
									uni.showToast({
										title: "支付成功!",
										icon: "none"
									})
								uni.hideLoading();
								// 成功后跳转到tab页面
								setTimeout(function(){
									uni.switchTab({
									    url: '/pages/reserve/reserve'
									});
								}, 2000);
								},
								fail(err) {
									uni.hideLoading();
									console.log(err)
								}
							})
						},
						fail: (e) => {
							
							uni.hideLoading();
						},
						complete: () => {
							this.providerList[index].loading = false;
						}
					})
				}else{
					uni.showToast({
						title: '订单不能为空',
						icon: 'none'
					});
				}
			},
			randomOrder(value){
				for(var i=0;i<6;i++) //6位随机数，用以加在时间戳后面。
				{
				    value += Math.floor(Math.random()*10);
				}
				return new Date().getTime() + value;  //时间戳，用来生成订单号。
			},
		   getOrderInfo(orderId,price,body) {
					let appid = "";
					// #ifdef APP-PLUS
					// appid = plus.runtime.appid;
					// #endif
					let url = 'https://ww.0816fc.net/index.php/home/Pay/pay'
					return new Promise((resolve) => {
						uni.request({
							url: url,
							method:"POST",
							data:{
								id: this.order_id,
								orderId: orderId,
								body: body,
								price: price,
								goods: this.goodsList,
							},
							success: (result) => {
								resolve(result.data)
							},
							fail: (e) => {
								resolve(e);
							}
						})
					})
				},
			// 删除购物车
			async delShoppingCard(index) {
				if (this.rightListSum[index].sum-1 <= 0) {
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
			addShoppingCard(e){		
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
				this.zprice = ( parseFloat(this.zprice) + parseFloat(this.rightNav[index].price) ).toFixed(2);
				// this.zprice = parseFloat(this.zprice) + parseFloat(this.rightNav[index].price) 
			},
			// 延迟执行
			setDelayTime(sec) {
				return new Promise((resolve, reject) => {
					setTimeout(() => {resolve()}, sec)
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
							this.shoppingCartAnimation =  true // 购物车动画
							// 400ms延时, 即小球的抛物线时长
							return this.setDelayTime(400);
						}).then(() => {
							this.shoppingCartAnimation =  false // 购物车动画
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
				animation.translateX(bottomX-ballX).step(); // 动画效果
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
	
				animation.translateY(bottomY-ballY).step(); // 动画效果
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
			goAnchor(e,id) {
				console.log(e)
				this.curListIndex = e // 下标选中
				this.mainCur = "order"+id // 右边锚点
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
			sign:function(data){
				let StringA = '';
		
				
			}
		}
	}
</script>

<style>
	@import url("dianchan.css");
</style>