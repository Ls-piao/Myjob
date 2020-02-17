<template>
	<view class="container">
		<view class="goodsListBody">
			<view class="listLeft">
				<scroll-view scroll-y scroll-with-animation style="height:calc(100vh - 200upx)">
					<view class="listNav">
						<view :class="('order'+(index+1)) == curListIndex ? 'select': ''" @tap="goAnchor" :data-id="item.soret" class="listNav"
						 v-for="(item, index) in leftList" :key="index">
							<text>{{item.name}}</text>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="listRight">
				<scroll-view scroll-y scroll-with-animation style="height:calc(100vh - 200upx)" :scroll-into-view="curListIndex"
				 @scroll="noScroll">
					<!-- 右边 -->
					<view class="rightGoods" v-for="(item, index) in leftList" :key="index">
						<view :id="'order'+item.soret" class="title">{{item.name}}</view>
						<view>
							<view class="goodsBody" v-for="(goodsitem,goodsindex) in item.info" :key="goodsindex">
								<view class="goodsHead">
									<image :src="imgUrl+goodsitem.img" mode=""></image>
									<view class="mask"  v-if="!goodsitem.sales">
										已下架 
									</view> 
									<view class="goodsDes">
										<view class="goodsTitle">{{goodsitem.name}}</view>
										<view class="goodsPrice">￥ {{goodsitem.price}}

										</view>
									</view>
								</view>
								<view class="goodsBottom">
									<button size="mini" plain :data-id="goodsitem.id" @tap="toEdit">编辑</button>
									<button size="mini"  plain  @tap="toDel(goodsitem.id)" class="del">删除</button>
									<switch style="zoom:.8;" :checked="goodsitem.sales" :data-index="index" :data-i="goodsindex" @change="switchChange" />
								</view>
							</view>

						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="bottom">
			<navigator open-type="navigate" :url='"../manageTypes/manageTypes?id="+store_id'>
				<image src="../../../static/tabBarIcon/types.png" mode="" ></image> 管理分类
			</navigator>
			<navigator open-type="navigate" :url='"../goodsEditor/goodsEditor?shopid="+store_id'>
				<image src="../../../static/tabBarIcon/new.png" mode="" ></image> 新建商品
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(e) {
			this.store_id = Number(e.shopid)
			console.log(this.store_id)
			this.imgUrl = this.$imgUrl
		},
		onReady() {
			// 		let query = uni.createSelectorQuery().in(this)
			// 		let heightArr = []
			// 		let s = 0;
			// 		query.selectAll('.rightGoods').boundingClientRect(react => {
			// 		  react.forEach(item => {
			// 		    s += item.height
			// 		    heightArr.push(s)
			// 		  })
			// 		  console.log(heightArr)
			// 		  this.heightArr = heightArr

			// 		}).exec()
			// 		query.select('.listRight').boundingClientRect(react => {
			// 		  console.log(react.height)
			// 		 this.containerH = react.height
			// 		}).exec()

		},
		onShow(){
			this.pageInit()
		},
		data() {
			return {
				imgUrl: '',
				heightArr: [],
				containerH: 0,
				store_id: 0,
				leftList: [

				],
				curListIndex: "order1",


			}
		},
		methods: {
			toDel(id){
				var id = Number(id)
				console.log(id)
				uni.request({
					url:this.$bashUrl+'/index.php/home/Api/del_good',
					method:"post",
					data:{
						good_id:id
					},
					success:(res)=>{
						
							console.log(res)
							if(res.data ==1){
								uni.showToast({
									title:"删除成功"
								})
								this.pageInit()
							}
					}
				})
			},
			toEdit(e){
				console.log(e)
				uni.navigateTo({
					url:'../goodsEditor/goodsEditor?id='+e.target.dataset.id+"&type=0&shopid="+this.store_id
				})
			},
			switchChange(e) {
				let type=''
				if (this.leftList[e.target.dataset.index].info[e.target.dataset.i].sales == 0) {
					this.leftList[e.target.dataset.index].info[e.target.dataset.i].sales = 1
					type='up'
				} else {
					this.leftList[e.target.dataset.index].info[e.target.dataset.i].sales = 0
					type='down'
				}
				let id = Number(this.leftList[e.target.dataset.index].info[e.target.dataset.i].id)
				console.log(id)
				this.undateSale(id,type)
			},
			undateSale(id,type){
				uni.request({
					url:this.$bashUrl+'/index.php/home/Api/goods_sales',
					method:"post",
					data:{
						good_id:id,
						type
					},
					success:(res=>{
						console.log(res)
					})
				})
			},
			pageInit() {
				uni.request({
					url: this.$bashUrl + '/index.php/home/Api/types_list',
					method: 'post',
					data: {
						store_id: this.store_id
					}
				}).then(res => {
					console.log(res[1].data)
					this.leftList = res[1].data
					for(let i = 0 ; i <this.leftList.length;i++){
						this.leftList[i].soret = i+1
					}
				})
			},
			goAnchor(e) {
				console.log(e)
				this.curListIndex = "order" + e.currentTarget.dataset.id
				console.log(this.curListIndex)
				console.log(e.currentTarget.dataset.id)
			},
			
			noScroll(e) {
				// console.log(e)

				// this.scrollY = e.detail.scrollTop + 20
				// // 当滚动到顶部
				// if (this.scrollY < 0) {
				// 	this.curListIndex = 0
				// 	// this.mainCur = 0
				// 	return true
				// }
				// // 在中间部分滚动
				// for (let i = 0; i < this.listHeight.length - 1; i++) {
				// 	let height = this.listHeight[i]
				// 	// 思路 拿数组里面的开始、结束 值进行范围比较
				// 	if (this.scrollY > height.start && this.scrollY < height.end) {

				// 		this.curListIndex = i
				// 		// this.mainCur = i
				// 	}
				// }
			}
		}
	}
</script>

<style lang="less" scoped>
	.container {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	.title {
		background: rgba(222, 233, 211, .5);
		color: #aaa;
		border-radius: 5px;
		font-size: 30upx;
	}

	.goodsListBody {
		display: flex;

		.listLeft {
			width: 226upx;
			background: #fafafa;

			.listNav {
				text-align: center;
				height: 100upx;
				line-height: 100upx;
				background: #fafafa;
			}
		}

		.listRight {
			flex: 1;

			.rightGoods {
				width: 90%;
				margin: 20upx 0;

				.goodsBody {
					padding: 20upx;
					;
					display: flex;
					flex-direction: column;

					.goodsBottom {
						flex: 1;

						button {
							margin: 0 10upx;
							float: right;
							border-radius: 0;
							width: 130rpx;
							height: 60rpx;
							font-size: 27upx;
							&:nth-child(2) {
								color: #fff;
								background: #3374FF;
							}

							&:nth-child(1) {
								color: #c6c3c6;
								border: 1px solid #c6c3c6;
							}
						}
					}

					.goodsHead {
						height: 200upx;
						display: flex;
						position: relative;
						font-size: 30upx;

						.mask {
							display: inline-block;
							background: #120c07aa;
							position: absolute;
							color: #fff;
							text-align: center;
							line-height: 150upx;
						}

						image,
						.mask {
							width: 150upx;
							height: 150upx;
							margin-right: 20upx;
							;
						}

						.goodsDes {
							display: flex;
							flex-direction: column;

							.goodsTitle {
								flex: 1;
							}

							.goodsPrice {
								flex: 2;

								.sale,
								.unsale {
									display: inline-block;
									margin-left: 20upx;
									font-size: 20upx;
									border: 1px solid;
									padding: 2upx 3upx;
								}

								.sale {
									border-color: #3d7bff;
									color: #3d7bff
								}

								.unsale {
									border-color: #c6c3c6;
									color: #c6c3c6
								}
							}
						}
					}
				}
			}
		}
	}
	
	.bottom {
		flex: 1;
		display: flex;
		align-items: center;

		navigator {
			flex: 1;
			color: #007AFF;
			display: block;
			text-align: center;
			font-size: 30upx;

			&:nth-child(1) {
				border-right: 1px solid #eee;
			}
			.del{
				border: none !important;;
			}
			image {
				width: 50upx;
				height: 50upx;
				vertical-align: middle;
			}
		}
	}

	.select {
		background: #fff !important;
		color: #3d7bff;
		font-size: 40upx;
	}
</style>
