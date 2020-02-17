<template>
	<!-- <svg aria-hidden="true" style="position: absolute; width: 0px; height: 0px; overflow: hidden;"> -->
	<view class="fui-page-group statusbar">
		<!--6Z2S5bKb5piT6IGU5LqS5Yqo572R57uc56eR5oqA5pyJ6ZmQ5YWs5Y+4-->
		<tab-control :current="current" :values="items" bgc="#fff" :fixed="true" :scrollFlag='true' @clickItem="onClickItem">
			<!-- 使用 swiper 配合 滑动切换 -->
			<swiper class="swiper" style="height: 100%;" :current='current'>
				<swiper-item v-for="(item,index) in items" :key='index'>
					<view class="swiperItem">{{item}}</view>
				</swiper-item>
			</swiper>
		</tab-control>
		<view v-if="current==0" class="myteamindex">
			<view class="container">
				<view class="headinfo">
					<view class="userinfo">
						<view class="userImg">
							<image src="../../static/title.jpg">
						</view>
						<view class="usermsg">
							<view class="title">{{userInfo.phone}} </view>
							<view class="text">推荐人: {{userInfo.t_phone}}
							</view>
							<view class="subtitle">
								普通 </view>
						</view>
					</view>
					<view class="edituserInfo">
						<button class="editor" @tap="toEdit(phone)">编辑</button>
					</view>
				</view>

				<view class="myInfo">
					我的ID： {{userInfo.team_id}}
				</view>

				<view class="userblock">
					<view class="sucTotal">
						<view class="num">{{userInfo.y_cash}}</view>
						<view class="title">成功兑换补贴(元)</view>
					</view>
					<view class="ableTotal">
						<view class="text">
							<view class="num">{{userInfo.k_cash}}</view>
							<view class="title">可兑换补贴(元)</view>
						</view>
						<view class="btn" @tap="toShow('满 100 元才能!')">补贴 兑换</view>
					</view>
				</view>
				<view class="nav">
					<view @tap="toAward" class="award">
						<image src="../../static/myteam/money.png" mode=""></image>
						<view class="modemsg">
							<view class="title">市场补贴</view>
							<view class="num"><span>{{userInfo.price}}</span> 元</view>
						</view>
					</view>
					<view @tap="toOrder" class="order">
						<image src="../../static/myteam/list.png" mode=""></image>
						<view class="modemsg">
							<view class="title">市场订单</view>
							<view class="num"><span>{{userInfo.orders}}</span> 笔</view>
						</view>
					</view>
					<view class="detail" @tap="toDetail">
						<image src="../../static/myteam/detail.png" mode=""></image>
						<view class="modemsg">
							<view class="title">补贴明细</view>
							<view class="num"><span>{{userInfo.num}}</span> 笔</view>
						</view>
					</view>
					<view class="team" @tap="toMyteam">
						<image src="../../static/myteam/team.png" mode=""></image></i>
						<view class="modemsg">
							<view class="title">我的分享</view>
							<view class="num"><span>{{userInfo.orders}}</span>人</view>
						</view>
					</view>

					<!--<a class="fui-block-child external" href="./index.php?i=2&c=entry&m=ewei_shopv2&do=mobile&r=commission.qrcode&mid=2448">-->
					<!--<view class="iconImg text-yellow"><i class="icon icon-qrcode"></i></view>-->
					<!--<view class="title">推广二维码</view>-->
					<!--<view class="text"></view>-->
					<!--</a>-->
				</view>
				<view class="tuiguang" @tap="getCode">
					<view class="title">
						<image src="../../static/myteam/code.png" mode=""></image>推广码id
					</view>
					<view class="codeId">
						{{userInfo.team_id}}
					</view>
					<view class="addStore">
						<button type="primary" size="mini" style="background: #3D7BFF;font-size: 28upx;" @tap="toAddStore">添加店铺</button>
					</view>
				</view>
				
				<!--6Z2S5bKb5piT6IGU5LqS5Yqo572R57uc56eR5oqA5pyJ6ZmQ5YWs5Y+454mI5p2D5omA5pyJ-->
			</view>
		</view>
		<view v-if="current==1" class="myAward">
			<view class="container">
				<view class="header">
					<view class="count">
						{{award.all_cash}}
					</view>
					<view class="total">
						累计补贴(元)
					</view>
				</view>
				<!-- <view class="cards" @tap="tocards">
					<image src="../../static/myteam/card.png" mode="" class="leftimg"></image>
					<text> 银行卡管理</text> 
						<image src="../../static/Icon/left.png" mode="" class="rightimg"></image>
				</view> -->
				<view class="ablenum">
					<view class="ableLeft">
						<image src="../../static/myteam/money.png" mode=""></image>
						可兑换补贴
					</view>
					<view class="count">
						{{award.k_cash}}元
					</view>
				</view>
				<view class="awardlist">
					<view class="awardlist-list">
						<view class="left">
							<image src="../../static/myteam/list.png" mode=""></image>
							推荐补贴

						</view>
						<view class="count">
							{{award.price}}元
						</view>
					</view>
					<view class="awardlist-list">
						<view class="left">

							<image src="../../static/myteam/team.png" mode=""></image>
							商户补贴

						</view>
						<view class="count">
							{{award.prices}}元
						</view>
					</view>

				</view>
				<view class="withDraw">
					<navigator url="../tixianLog/tixianLog" open-type="navigate" style="padding: 30upx 20upx ;border-bottom:  1px solid #ccc;">领取补贴记录 ></navigator>
					<button type="primary" style="background: #3D7BFF;" @tap="togetMoney(award.k_cash,0)">去领取补贴</button>
				</view>
			</view>


		</view>
		<view v-if="current==2" class="mylist">
			<view class="container">
				<view class="headerNav">
					<view :class="listIndex==index?'select':''" @tap="tabList(index)" v-for="(item,index) in listItems" :key="index">
						<view class="navItem">
							{{item}}
							<view class="bottomline" v-if="listIndex==index"></view>
						</view>
					</view>
				</view>
				<view class="listContent">
					<view v-if="listIndex==0" class="alllist">
						<view class="list" v-for="(item,index) in storeList" :key="index">
							<!-- <view class="level">
								市场等级 : 个人
							</view> -->
							<view class="listNumber">
								订单编号 : 1000000{{item.id}}
							</view>
							<view class="listTime">
								下单时间 : {{item.intime}}
							</view>
							<view class="listCount">
								预计补贴 : + <text>{{item.price}}</text>
							</view>
						</view>
					</view>
					<view v-if="listIndex==1" class="waitlist">
						<view class="list"  v-for="(item,index) in fenxiaoList" :key="index">
						<!-- 	<view class="level">
								市场等级 : 个人
							</view> -->
							<view class="listNumber">
								订单编号 : 1000000{{item.id}}
							</view>
							<view class="listTime">
								下单时间 : {{item.intime}}
							</view>
							<view class="listCount">
								预计补贴 : + <text>{{item.price}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>

		</view>
		<view v-if="current==3" class="myteam">
			<view class="state">
				<!-- <image src="../../static/Icon/start.png" mode=""></image> -->
				已经成为的商务经理
			</view>
			<view class="teamItem" v-for="(item,index) in teamList" :key="index">
				<view class="agent">
					<view class="agentImg">
						<image src="../../static/myteam/team.png" mode=""></image>
					</view>
					<view class="agentDes">
						<view class="left">
							<view class="agentName">
								<!-- <image src="../../static/Icon/kong.png" mode=""></image> -->
								{{item.name?item.name:'无名好友'}}--{{item.phone}}
							</view>
							<view class="agentTime">
								分享时间:{{item.intime}}
							</view>
						</view>

					</view>
					
				</view>
			</view>
		</view>


	</view>
</template>

<script scoped>
	import tabControl from '@/components/tabControl-tag/tabControl-tag.vue';
	export default {
		components: {
			tabControl
		},
		data() {
			return {
				items: ['首页', '市场补贴', '市场订单', "我的分享"],
				itemList: [],
				current: 0,
				currentPage: 0,
				listItems: ['商户订单', '市场订单'],
				listIndex: 0,
				listPage: 0,
				phone: uni.getStorageSync('phone'),
				userInfo: {},
				award: {},
				storeList: [],
				fenxiaoList: [],
				teamList:[]
			}
		},
		onLoad() {
			console.log(this.phone)
			//获取首页信息
			uni.request({
				url: this.$bashUrl + '/index.php/home/Api/user_infos',
				method: "POST",
				data: {
					phone: this.phone
				},
				success: res => {
					console.log(res)
					this.userInfo = res.data
				}
			})
			//获取补贴信息

			//获取订单

			//获取我的团队信息

		},
		onShow() {
			//获取市场用户
			uni.request({
				url: this.$bashUrl + '/index.php/home/Api/user_infos',
				method: "POST",
				data: {
					phone: this.phone
				},
				success: res => {
					console.log(res)
					this.userInfo = res.data
				}
			})
			//获取市场补贴
			uni.request({
				url: this.$bashUrl + '/index.php/home/Api/user_reward',
				method: "POST",
				data: {
					phone: this.phone
				},
				success: res => {
					console.log(res)
					this.award = res.data
				}
			})
			//获取市场订单
			this.fenxiaoList=[]
			this.storeList = []
				uni.request({
					url: this.$bashUrl + '/index.php/home/Api/t_log_list',
					method: "POST",
					data: {
						phone: this.phone,
						limit: 20
					},
					success: res => {
						console.log('-------award------')
						console.log(res)
						console.log('-------award------')
						res.data.forEach(item => {
							if (item.state == 0) {
								this.fenxiaoList.unshift(item)
							} else {
								this.storeList.unshift(item)
							}
						})
					}
				})
			//获取市场团队
			uni.request({
				url: this.$bashUrl + '/index.php/home/Api/user_team',
				method: "POST",
				data: {
					phone: this.phone
				},
				success:res=>{
					console.log(res)
					this.teamList = res.data
				},
				})
		},
		methods: {
			toAddStore(){
				uni.navigateTo({
					url:'../addStore/addStore'
				})
			},
			togetMoney(count,type) {
				uni.navigateTo({
					url: '../withdraw/withdraw?k_cash=' + count+"&type="+type
				})
			},
			toShow(msg) {
				if (this.userInfo.k_cash >= 100) {
					this.current = 1
				} else {
					uni.showToast({
						title: msg,
						icon: 'none'
					})
				}
			},
			toAward() {
				this.current = 0
			},
			getCode() {

			},
			toDetail() {
				this.current = 1
			},
			toOrder() {
				this.current = 2
			},

			toMyteam() {
				this.current = 3
			},
			onClickItem(e) {
				this.current = e.currentIndex
				
			},
			tabList(e) {
				console.log(e)
				this.listIndex = e
				
			},
			toEdit(phone) {
				if (phone) {
					uni.navigateTo({
						url: '../editor/editor?phone=' + phone
					})
				} else {
					let phone = uni.getStorageSync('phone')
					uni.navigateTo({
						url: '../editor/editor?phone=' + phone
					})
				}
			}

		}
	}
</script>

<style lang="less" scoped>
	/* @import url("./foxui.min.css");
	@import url("./iconfont.css");
	@import url("./style.css"); */
	@import url("./index.less");
</style>
