<template>

	<view class="container">

		<tab-control :current="current" :values="items" bgc="#fff" :fixed="true" :scrollFlag='true' @clickItem="onClickItem">
			<!-- 使用 swiper 配合 滑动切换 -->
			<swiper class="swiper" style="height: 100%;" :current='current'>
				<swiper-item v-for="(item,index) in items" :key='index'>
					<view class="swiperItem">{{item}}</view>
				</swiper-item>
			</swiper>
		</tab-control>
		<view class="hongbao" v-if="current==0">
			<view class="hBox">
				<view class="top">
					<view class="left">
							<view class="price-top">
								<text class="bigPirce">50.</text> <text>00元</text>
							</view>
							<view class="price-bottom">
								适用于期限xx天及上的单笔输出xx可使用
							</view>
					</view>
					<view class="right">
						<view class="name" @tap='toUse'>
							立即使用
						</view>
						<view class="time">
							<view class="">
								2020-01-02至
							</view>
							<view class="">
								2020-05-05有效
							</view>
						</view>
					</view>
				</view>
				<view class="bottom">
					<view class="cardtype">
						抵扣券
					</view>
					<view class="des">
						新人大礼包
					</view>
				</view>
			</view>
			<!-- <view class="nocard">
				<image src="../../static/quan2.png" mode=""></image>
				<view class="txt">
					暂无卡卷
				</view>
			</view> -->
		</view>
		<view class="kajuan" v-if="current==1">
			<!-- <view class="nocard">
				<image src="../../static/quan2.png" mode=""></image>
				<view class="txt">
					暂无卡卷
				</view>
			</view> -->
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
				phone: '',
				items: ['我的红包', '我的卡卷'],
				current: 0,

			}
		},
		methods: {
			onClickItem(e) {
				this.current = e.currentIndex
			},
			toUse(){
				uni.switchTab({
					url:'../yuding/yuding'
				})
			}
		},

		onLoad: function() {
			this.phone = uni.getStorageSync('phone')


		},
	}
</script>

<style lang="less" scoped>
	.container {
		width: 100%;

		>view {
			width: 90%;
			margin: 100upx auto 0;

			.hBox {
				margin: 10upx 0;
				height: 300upx;
				width: 100%;
				border-radius: 40upx;
				box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
				display: flex;
				flex-direction: column;
				color: #fff;
				overflow: hidden;
				font-size: 26upx;
				.top {
					height: 80%;
					background: #FF5B5B;
					display: flex;
					align-items: center;

					.left {
						width: 50%;
						margin-left: 40upx;
						padding-right: 20upx;
						border-right: 1px solid #ccc;
						.price-top {

							.bigPirce {
								font-weight: 600;
								font-size: 80upx;
							}
						}
						.price-bottom{
							width: 80%;
						}
					}

					.right {
						flex: 1;
						margin-left: 40upx;
						.name{
							font-size: 35upx;
							font-weight: 600;
							margin: 30upx 0;
						}
					}
				}

				.bottom {
					flex: 1;
					display: flex;
					justify-content: space-between;
					color: #666;
					font-size: 24upx;
					width: 70%;
					margin: 0 auto;
					align-items: center;
					
				}
			}

			.nocard {
				width: 100%;
				height: 100%;
				margin: 200upx auto;
				color: #999;
				font-size: 28upx;
				text-align: center;

				image {
					width: 100upx;
					height: 60upx;
				}
			}
		}
	}
</style>
