<template class="tabControl">
	<view>
		<scroll-view scroll-x="true" :style="'background-color:'+bgc+';'" :class="fixed?'fxied':''" :scroll-left='scrollLeft'
		 scroll-with-animation>
			<view class="tabList">
				<view :class="'tabItem'+(currentIndex==index?' thisOpenSelect':'')" v-for="(item,index) in values" :key='index'
				 @click="_onClick(index)" ref='item'>
					<text>{{item}}</text>
					<view class="activeLine"></view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: 'tabControl',
		props: {
			current: {
				type: Number,
				default: 0
			},
			values: {
				type: Array,
				default () {
					return []
				}
			},
			bgc: {
				type: String,
				default: ''
			},
			fixed: {
				type: Boolean,
				default: false
			},
			scrollFlag: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				currentIndex: 0,
				windowWidth: 0, //设备宽度
				widthList: [], //选项宽度
				scrollLeft: 0, //移动距离
				newScroll: 0, //上一次移动距离(用来判断是左滑还是右滑)
				wornScroll: 0 //上一次移动距离(用来判断是左滑还是右滑)
			};
		},
		created() {

		},
		mounted() {
			// uni.getSystemInfo({
			// 	success: function(res) {
			// 		this.windowWidth = res.windowWidth + 12;
			// 	}
			// });
			// this.$nextTick(function() {
			// 	this.$refs.item.forEach(i => {
			// 		this.widthList.push(i.$el.offsetWidth + 30)
			// 	})
			// })

		},
		watch: {
			current(val) {
				if (val !== this.currentIndex) {
					this.currentIndex = val
					if (this.scrollFlag) {
						this.tabListScroll(val)
					}
				}
			}
		},
		methods: {
			_onClick(index) {
				if (this.currentIndex !== index) {
					this.currentIndex = index
					this.$emit('clickItem', {
						currentIndex: index
					})
					// 开启滚动
					if (this.scrollFlag) {
						this.tabListScroll(index)
					}
				}
			},
			// 选项移动
			tabListScroll(index) {
				let scoll = 0;
				this.wornScroll = index;
				
				if (this.wornScroll - this.newScroll > 0) {
					if (index > 1) {
						this.widthList.forEach((i, v) => {
							if (v < index) {
								scoll += i
							}
						})
					} else {
						scoll = 0
					}
				
				} else {
					if (index > 1) {
						this.widthList.forEach((i, v) => {
							if (v < index - 1) {
								scoll += i
							}
						})
					} else {
						scoll = 0
					}
					
				}
				this.newScroll = this.wornScroll;
				this.scrollLeft = scoll;
			}
		}
	}
</script>

<style lang="less" scoped>
	.fxied {
		position: fixed;
		top: 0px;
		z-index: 2;
	}
	.tabList {
		padding-top: 24rpx;
		padding-left: 24rpx;
		padding-bottom: 8rpx;
		white-space: nowrap;
		text-align: center;
		.tabItem {
			margin-right: 60rpx;
			display: inline-block;
			transition: all 3000 ease 0;
			text {
				font-size: 32rpx;
				line-height: 44rpx;
				color: #666;
			}
			.activeLine {
				width: 48rpx;
				height: 8rpx;
				border-radius: 4rpx;
				background-color: #007AFF;
				margin-top: 8rpx;
				display: none;
				margin-left: 50%;
				transform: translateX(-24rpx);
			}
		}
		.tabItem:first-child {
			margin-left: 22rpx;
		}

		.tabItem:last-child {
			margin-right: 24rpx;
		}

		.thisOpenSelect {
			text {
				color: #333;
				font-weight: 600;
			}
			.activeLine {
				display: block;
			}
		}
	}
</style>
