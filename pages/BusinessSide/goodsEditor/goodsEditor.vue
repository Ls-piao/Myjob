<template>
	<view class="goods">
		<view class="goods-top padding-left">
			<view class="goods-top-top">
				<text class="goods-top-1">菜品所属:</text>
				<text class="goods-top-2">{{typesList[classify].name}}</text>
			</view>
		</view>
		<view class="goods-title">
			<view class="goods-title-box border-1">
				<text class="goods-title-title">主标题</text>
				<view class="goods-title-input">
					<input type="text"  placeholder-class="input-text" @input="inputValue" v-model="title" style="padding-left: 30upx;
" />
				</view>
			</view>
			<view class="goods-title-box border-1">
				<text class="goods-title-title">商品描述</text>
				<view class="goods-title-input">
					<input type="text"  placeholder-class="input-text" @input="inputValue1" v-model="ftitle" />
				</view>
			</view>

		</view>
		<view class="fenge"></view>
		<view class="goods-img padding-left">
			<!-- <image src="" mode=""></image> -->
			<view class="goods-img-box">
				<block v-for="(item,index) in imgList" :key="index">
					<image class="goods-img-box-img" :src="item"></image>
				</block>
				<image v-if="maxImg" @click="UpImg" class="goods-img-box-img" src="../../../static/imgs/a291.png" mode=""></image>
			</view>
		</view>
		<view class="fenge"></view>
		<view class="goods-title">
			<!-- <view class="goods-title-box border-1">
				<text class="goods-title-title">商品分类</text>
				<picker-view :value="value" @change="bindChange" :indicator-style="indicatorStyle">
					{{goodsTypes}}
					<picker-view-column>
						<view class="item" v-for="(item,index) in typesList" :key="index" >{{item}}</view>
					</picker-view-column>
				</picker-view>
			</view> -->
			<view class="typelist">
				<view class="typelistBox">
					<view class="typeChose">
						当前选择
					</view>
					<view class="typelistBody">
						<picker @change="bindChange" :value="classify" range-key="name" :range="typesList" mode="selector">
							<view class="typeitem">{{typesList[classify].name}}</view>
						</picker>
					</view>
				</view>
			</view>
			<view class="goods-title-box" style="border-bottom: 1px solid #ccc;">
				<text class="goods-title-title">价格</text>
				<view class="goods-title-input goods-title-input-2">
					<input type="number"  placeholder-class="input-text" @input="inputValue4" v-model="price" />
				</view>
			</view>
		</view>
		<!-- <view class="goods-top padding-left">
			<view class="goods-top-top">
				<text class="goods-top-1">商品限购:</text>
				<text class="goods-top-2">（不输入默认不限）</text>
			</view>
		</view>
		<view class="goods-title" style="margin-bottom: 200rpx;">
			<view class="goods-title-box border-1">
				<text class="goods-title-title">单次最多</text>
				<view class="goods-title-input">
					<input type="number" placeholder="0" placeholder-class="input-text" @input="inputValue5" />
				</view>
			</view>
			<view class="goods-title-box">
				<text class="goods-title-title">单次最低</text>
				<view class="goods-title-input">
					<input type="number" placeholder="0" @input="inputValue6" />
				</view>
			</view>
		</vi ew> -->
		<view @click="submit" class="submit" style="position: fixed; bottom: 0rpx;">
			<view class="dibu-bottom-2">
				保存
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgList: [],
				maxImg: true,
				title: '',
				ftitle: '',
				price: '',
				classify: 0,
				max: '',
				min: '',
				unit: '',
				tempFilePaths: [],
				shopid: '',
				goodsTypes: '',
				typesList: [],
				typeId: 0,
				type: 0,
				imgUrl: '',
				goodsid:0


			}
		},
		onLoad(option) {
			if (option.type == 0) {

				uni.request({
					url: this.$bashUrl + '/index.php/home/Api/goods_info',
					method: "post",
					data: {
						good_id: Number(option.id)
					},
					success: res => {
						console.log(res)
						this.price = res.data.price
						this.title = res.data.name
						this.ftitle = res.data.content
					}
				})
			}
			this.goodsid = option.id
			this.shopid = option.shopid
			this.imgUrl = this.$imgUrl
			var that = this
			console.log(option)
			this.type = option.type
			uni.request({
				url: this.$bashUrl + '/index.php/home/Api/type_lists',
				method: 'post',
				data: {
					store_id: option.shopid
				}
			}).then(res => {
				console.log(res)
				this.typesList = res[1].data
			})

		},
		onShow: function() {

		},
		onHide: function() {
			// 隐藏键盘
			uni.hideKeyboard()
		},
		methods: {
			bindChange: function(e) {
				console.log(e)
				this.classify = e.detail.value

			},
			UpImg: function(e) {
				var that = this
				uni.chooseImage({
					count: 9, // 上传照片张数
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						that.tempFilePaths = res.tempFilePaths;
						// 显示图片
						// 对传递过来的字符串进行改造,符合显示要求
						var s1 = JSON.stringify(res.tempFilePaths).slice(1, -1)
						that.imgList = s1.split(",")
						if (that.imgList.length >= 9) that.maxImg = false;
						for (var i = 0; i < that.imgList.length; i++) {
							that.imgList[i] = that.imgList[i].slice(1, -1)
						}
					},
					fail: function(res) {

					}
				});
			},
			submit: function() {
				//  提交
				var that = this
				// 上传表单\
				if (this.type == 0) {
					console.log(that.tempFilePaths[0])
					uni.uploadFile({
						url: that.$bashUrl + '/index.php/home/Api/save_goods',
						method: "post",
						filePath: that.tempFilePaths[0],
						name: 'file',
						formData: {
							"store_id":this.shopid,
							'goodsid': this.goodsid,
							'name': this.title,
							'content': this.ftitle,
							'price': this.price,
							'type': Number(this.typesList[this.classify].id)
						},
						success: (d) => {
							console.log(d)
						uni.showToast({
							title: '商品更新成功',
							icon:'none',
							duration:2000,
							mask:true,
								success() {
									setTimeout(()=>{
										uni.navigateBack({
											delta:1
										})
									},2000)
									// 清空数据
									that.title = ''
									that.ftitle = ''
									that.price = ''
									that.classify = ''
									that.max = ''
									that.min = ''
									that.unit = ''
								},
								fail() {
									// 清空数据
									that.title = ''
									that.ftitle = ''
									that.price = ''
									that.classify = ''
									that.max = ''
									that.min = ''
									that.unit = ''
								}
							})
						},
						fail: function(err) {
							console.log('商品更新失败')
						}
					})
				} else {
					console.log(this.typesList[this.classify].id)
					uni.uploadFile({
						url: that.$bashUrl + '/index.php/home/Api/new_goods/',
						filePath: that.tempFilePaths[0],
						name: 'file',
						formData: {
							'store_id': this.shopid,
							'name': this.title,
							'content': this.ftitle,
							'price': this.price,
							'type': Number(this.typesList[this.classify].id)
						},
						success: (uploadFileRes) => {
							uni.showToast({
								title: '商品上传成功',
								icon:'none',
								duration:2000,
								mask:true,
								success() {
									uni.navigateBack({
										delta:1
									})
									// 清空数据
									that.title = ''
									that.ftitle = ''
									that.price = ''
									that.classify = ''
									that.max = ''
									that.min = ''
									that.unit = ''
								},
								fail() {
									// 清空数据
									that.title = ''
									that.ftitle = ''
									that.price = ''
									that.classify = ''
									that.max = ''
									that.min = ''
									that.unit = ''
								}
							})
						},
						fail: function(err) {
							console.log('商品上传失败')
						}
					});
				}
			},
			// 主标题
			inputValue: function(e) {
				this.title = e.detail.value
			},
			// 副标题
			inputValue1: function(e) {
				this.ftitle = e.detail.value
			},
			// 单位
			inputValue2: function(e) {
				this.unit = e.detail.value
			},
			// 商品分类
			// 价格
			inputValue4: function(e) {
				this.price = e.detail.value
			},
			// 单次最多
			inputValue5: function(e) {
				this.max = e.detail.value
			},
			// 单次最低
			inputValue6: function(e) {
				this.min = e.detail.value
			},
		}
	}
</script>

<style lang="less" scoped>
	@import url("goodsEditor.css");
	.typelist {
		width: 92%;
		margin: 0 auto;
		height: 100upx;
		color: #666666;
		border-bottom: 1px solid #ccc;

		.typelistBox {
			display: flex;
			line-height: 100upx;

			.typeChose {
				width: 20%;
				font-size: 35upx;
			}

			.typelistBody {
				flex: 1;
				color: #000000;
				padding-left: 20upx;
				picker{
					padding-left: 50upx;

				}
				.typeitem {}
			}
		}
	}
</style>
