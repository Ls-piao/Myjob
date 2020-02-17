<template>
	<view class="container">
		<view class="name">
			<view class="left">
				商家名字
			</view>
			<view class="right">
				<input type="text" v-model="name" />
			</view>
		</view>
		<view class="bank">
			<view class="left">
				商家电话
			</view>
			<view class="right">
				<input type="number" maxlength="11" v-model="storephone" />
			</view>

		</view>
		<view class="bank">
			<view class="left">
				管理者电话
			</view>
			<view class="right">
				<input type="number" maxlength="11" v-model="adminphone"  />
			</view>
		</view>
		<view class="bank">
			<view class="left">
				商家描述
			</view>
			<view class="right">
				<textarea v-model="des" placeholder="请填写商家描述" placeholder-style="color:#ccc" style="width:auto" />
				</view>
		</view>
		<view class="bank">
			<view class="left">
				商家地址
			</view>
			<view class="right">
				<input type="text" v-model="address"  />
			</view>
		</view>
		<view class="bankplace">
			<view class="left">
				营业时间
			</view>
			<view class="right">
				<input type="text" v-model="opentime" />
			</view>
		</view>
		<view class="card">
			<view class="left">
				商家图片
			</view>
			<view class="right">
				<image  :src="img" class="upload"  v-if="img"></image>
				<image @tap="upImg(2)" src="../../static/imgs/291.png" mode="" class="logo" v-else ></image>
			</view>
	
		</view>
		<view class="card">
			<view class="left">
				类型
			</view>
			<view class="right">
				<picker @change="bindChange" :value="classify" range-key="name" :range="typesList" mode="selector">
					<view class="typeitem">{{typesList[classify].name}}</view>
				</picker>
			</view>
	
		</view>
		<button type="primary" @tap="save" style="background: #3D7BFF;margin-top: 100upx;">保存</button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				name:'',
				phone:uni.getStorageSync('phone'),
				adminphone:'',
				storephone:'',
				address:'',
				opentime:'',
				img:"",
				des:'',
				typesList:[],
				classify:0
				
			}
		},
		onLoad(){
			uni.request({
				url:this.$bashUrl+'/index.php/home/Api/store_type',
				success:res=>{
					console.log(res)
					this.typesList = res.data
				}
			})
		},
		methods:{
			save(){
				if(this.name){
					if(this.storephone && this.storephone.length==11){
						if(this.des){
							if(this.address){
									if(this.opentime){
										if(this.img){
											console.log(this.img)
											uni.uploadFile({
												url:this.$bashUrl+'/index.php/home/Api/storeadd',
												method: "post",
												filePath:this.img[0],
												name:"img",
												formData:{
													name:this.name,
													phone:Number(this.storephone),
													user_phone:Number(this.adminphone),
													img:this.img,
													discount:this.des,
													type:this.typesList[this.classify].id,
													open_time:this.opentime,
													address:this.address
												},
												success:res=>{
													console.log(res)
													if(res.data==1){
														uni.showToast({
															title:"添加成功"
														})
														this.name =''
														this.storephone=''
														this.address=''
														this.adminphone=''
														this.opentime=''
														this.img='',
														this.des='',
														this.classify=0
														setTimeout(()=>{
															uni.navigateBack({
																delta:1
															})
														},2000)
														
													}else{
															uni.showToast({
																title:"添加失败"
															})
														}
													}
												})
								}else{
									uni.showToast({
										title:"请上传商家图片！",
										icon:'none'
									})
								}
							}else{
								uni.showToast({
									title:"请输入营业时间！",
									icon:'none'
								})
							}
						}else{
							uni.showToast({
								title:"请输入商家地址！",
								icon:'none'
							})
						}
					}else{
						uni.showToast({
							title:"请输入商家描述！",
							icon:'none'
						})
					}
					}else{
						uni.showToast({
							title:"请输入商铺电话！",
							icon:'none'
						})
					}
				}else{
					uni.showToast({
						title:"请输入商铺名字！",
						icon:'none'
					})
				}
		
		
		
			},
			bindChange(e){
				this.classify = e.detail.value 
			},
			upImg(type){
				uni.chooseImage({
					success: res =>{
						// 显示图片
						// 对传递过来的字符串进行改造,符合显示要求
						console.log(res)
							this.img = res.tempFilePaths
					},
					fail: function(res) {
					
					}
				});
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.container{
		width: 100%;
		font-size: 28upx;
		background: #fafafa;
		>view{
			margin: 20upx 0;
			display: flex;
			border-radius: 20upx;
			align-items: center;
			background: #fff;
			.left{
				width: 170upx;
				text-align: center;
				border-right: 1px solid #eee;
				padding: 20upx;
				line-height: 80upx;
			}
			.right{
				flex: 1;
				padding: 10upx 20upx;
				position: relative;
				image{
					width: 100upx;
					height: 100upx;
					position: absolute;
					left: 20upx;
					top: -37upx;
				}
				
			}
			
		}
	}
</style>
