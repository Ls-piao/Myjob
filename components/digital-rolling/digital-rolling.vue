<template>
	<view>
		<!-- #ifdef H5 -->
		<view class="digital-rolling" :style="forMatHei()">
			<swiper :duration="100" :vertical="true" :circular="true" :current="item%10" class="each-item" v-for="(item,index) in currentList" :style="forMatWid()"
			 :key="index">
				<swiper-item class="cur-item" v-for="i in 10" :key="i">
					{{i-1}}
				</swiper-item>
			</swiper>
			<view class="stopmove" @touchmove.stop.prevent="" :style="forMatHei()">
				<!-- 禁止用户手动滚动 -->
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifndef H5 -->
		<view class="digital-rolling" :style="{height:forMatHei()}">
			<swiper :duration="100" :vertical="true" :circular="true" :current="item%10" class="each-item" v-for="(item,index) in currentList" :style="{width:forMatWid()}"
			 :key="index">
				<swiper-item class="cur-item" v-for="i in 10" :key="i">
					{{i}}
				</swiper-item>
			</swiper>
			<view class="stopmove" @touchmove.stop.prevent="" :style="{height:forMatHei()}">
				<!-- 禁止用户手动滚动 -->
			</view>
		</view>
		<!-- #endif -->
	</view>


</template>

<script>
	export default {
		data() {
			return {
				currentList: [],
				count: 0,
				timer: {},
			};
		},
		props: {
			digitFrom: {//初始值（请确认初始值目标值位数一致，不接受小数）
				type: String,
				default: '000000'
			},
			digitTo: {//目标值（请确认初始值目标值位数一致，不接受小数）
				type: String,
				default: '000000'
			},
			drWidth: { //每个数字宽度单位rpx
				type: Number,
				default: 50
			},
			drHeight: { //整体高度单位rpx
				type: Number,
				default: 50
			}
		},
		created() {
			this.digitFromList.forEach(item => {
				this.currentList.push(Number(item))
			})
			this.makeMove();
		},
		computed: {
			digitFromList() {
				return this.digitFrom.split('');
			},
			digitToList() {
				return this.digitTo.split('');
			}
		},
		methods: {
			makeMove() {
				this.timer = setInterval(() => {
					this.count++;

					for (let i = 0; i < this.digitFromList.length; i++) {
						if (this.currentList[i] % 10 != this.digitToList[i]) {
							this.$set(this.currentList, i, this.currentList[i] + 1);
						}
					}
					if (this.count === 9) {
						this.count = 0;
						clearInterval(this.timer);
					}
				}, 100)
			},
			forMatWid() {
				//#ifdef H5
				return 'width:' + this.drWidth + 'rpx;';
				//#endif
				return this.drWidth + 'rpx;';
			},
			forMatHei() {
				//#ifdef H5
				return 'height:' + this.drHeight + 'rpx;';
				//#endif
				return this.drHeight + 'rpx;';
			}
		},
		watch: {
			digitTo() {
				this.makeMove();
			}
		},
		beforeDestroy() {
			clearInterval(this.timer);
		}
	}
</script>

<style lang="scss">
	.digital-rolling {
		display: flex;
		position: relative;
		align-items: center;
		height: 50rpx;
		width: 100%;

		.each-item {
			height: 50rpx;
			width: 50rpx;
			text-align: center;

			.cur-item {
				height: 100%;
				font-size: 32rpx;
			}
		}

		.stopmove {
			position: absolute;
			width: 750rpx;
			height: 50rpx;
			z-index: 101;
		}
	}
</style>
