<template>
	<view :class="['side-nav',{'left':direction == 'left'},{'right':direction == 'right'},{'show':show}]">
		<view class="item">
			<view class="body">
				<slot />
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			//方向  left：右往左滑动  right:左往右边滑动
			direction: {
				type: String,
				default: 'right'
			}
		},
		data() {
			return {}
		},
		onLoad() {

		},
		methods: {
			cancel() {
				this.$emit('cancel');
			},
			ensure() {
				this.$emit('ensure');
			}
		}

	}
</script>

<style lang="less">
	/* flex */
	.flex-box {
		display: flex;
		flex-wrap: wrap;
	}

	.flex-box>.item-2 {
		flex: 0 0 50%;
	}

	.side-nav {
		position: fixed;
		z-index: 99;
		left: 0;
		top: 0;
		height: 100%;
		width: 600upx;
		background-color: #fff;
		overflow-x: hidden;
		transition: 0.5s;
		display: flex;
		flex-direction: column;
		box-shadow: 0 0 5px #888888;
		
		&.left{
			transform: translateX(760upx);
			&.show {
				transform: translateX(150upx);
			}
			
		}
		
		&.right{
			transform: translateX(-760upx);
			&.show {
				transform: translateX(0);
			}
			
		}

	
		.body {
			height: 100%;
			overflow-y: auto;
			position: relative;
			background: linear-gradient(to right,#27cdff,#3374FF);
			color: #fff !important;
		}


		.item:nth-of-type(1) {
			height: 0;
		}

		.item:nth-of-type(1) {
			flex: 1 0 auto;
		}


		.action-area {
			.item-2 {
				button {
					border-radius: 0;
					line-height: 96upx;
				}
			}
		}
	}



	/* #ifdef H5 */
	.side-nav {
		padding-top: 44px;
		box-sizing: border-box;
	}

	/* #endif */
</style>
