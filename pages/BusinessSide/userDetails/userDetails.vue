<template>
	<view class="listContent">
			<view class="list">
				<view class="listNumber">
					订单编号 : 10012323131
				</view>
				<view class="listTime">
					下单时间 : 123123131
				</view>
				<view class="listCount">
					预计补贴 : + <text>123123</text>
				</view>
			</view>
			<view class="list">
				<view class="listNumber">
					订单编号 : 10012323131
				</view>
				<view class="listTime">
					下单时间 : 123123131
				</view>
				<view class="listCount">
					预计补贴 : + <text>123123</text>
				</view>
			</view>
			<view class="list">
				<view class="listNumber">
					订单编号 : 10012323131
				</view>
				<view class="listTime">
					下单时间 : 123123131
				</view>
				<view class="listCount">
					预计补贴 : + <text>123123</text>
				</view>
			</view>
		</view>
</template>

<script>
	export default{
		onLoad: (e) => {
			this.id = e.userid
		},
		data(){
			return{
				id:"",
			}
		}
	}
</script>

<style lang="less" scoped>
	
	.listContent{
		width: 100%;
		height: 100%;
		
		.list{
			width: 95%;
			margin: 20upx auto;
			font-size: 28upx;
			font-weight: 500;
			box-shadow: 1px 2px 3px rgba(0,0,0,0.2);
			>view{
				padding: 20upx 0 0 20upx;
			}
			.listTime{
				border-bottom: 1px solid #eee;
				padding-bottom: 10upx;
			}
			.listCount {
				width: 90%;
				text-align: right;
				margin: 15upx auto;
				font-size: 28upx;
				text{
					color: #FF8000;
					font-weight: 600;
					font-size: 32upx;
				}
			}
		}
	}
	
</style>
