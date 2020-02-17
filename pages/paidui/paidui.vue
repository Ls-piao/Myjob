<template>
	<view class="box">
		<view class="aa">
			<view class="box-top">
				{{shopname}}
			</view>
			<view class="box-title1">
				<text class="box-title-1">{{p}}人</text>
				<text class="box-title-1">{{nowdata}}</text>
				<text class="box-title-1">今天 {{t}}</text>
			</view>
			<view class="box-peploe">
				<text class="box-title" style="margin-left: -1rpx;">人数</text>
				<view class="box-input">
					<input type="number" maxlength="3" class="line" v-model="pepleNumber" placeholder="请输入就餐人数" placeholder-class="graywords" />
				</view>
			</view>
			<view class="box-table">
				<text class="box-title">桌号</text>
				<view class="box-zuo">
					<block v-for="(item,index) in itemList" :key='index'>
						<view  :class="[boxa,{'current':ind === index}]" @click="reds(item,index)">
							<text class="box-zuo-1-1">{{item.table_name}}</text>
							<text class="box-zuo-1-2">{{item.num}}人</text>
						</view>
					</block>
					<block v-for="(item,index) in itemList1" :key='index'>
						<view  :class="[boxa,'myou']">
							<text class="box-zuo-1-1">{{item.table_name}}</text>
							<text class="box-zuo-1-2">没有包间了</text>
						</view>
					</block>
				</view>
<!-- 				<view v-else style="display: flex;justify-content: center;align-items: center;color: red;">
					没有包间了
				</view> -->
			</view>
			<view class="box-time">
				<text class="box-title">时间</text>
				<view class="box-zuo">
					<block v-for="(item,index) in timeList" :key='index'>
						<view :class="[boxa,{'current1':ind1 === index},bbb]" @click="adds(item.name,index)">
							<text class="box-zuo-1-1">{{item.name}}</text>
						</view>
					</block>
				</view>
			</view>
		</view>
		<view class="bottom-text">
			提交后需等待餐厅确认
		</view>
		<view class="dibu-bottom" style="position: fixed; bottom: 50rpx;" @click="upData">
			<view class="dibu-bottom-2">
				开始点餐
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pepleNumber: '',
				ind: 0,
				bbb:'bbb',
				tid: '',
				boxa: 'box-zuo-1',
				shopid: '',
				ind1: 0,
				timeList: [],
				itemList: [],
				itemList1: [],
				p: 2,
				baojian: '',
				t: '11:00',
				nowdata: '',
				shopname: '',
				timea: '12:00',
				did: '',
				phone: '',
				notable: false
			}
		},
		onLoad:function(option){
			this.did = option.did
			this.phone = uni.getStorageSync('phone')
			this.shopname = option.name
			this.shopid = option.aid
		
		},
		onShow:function(option){
			var that = this
			this.itemList =[]
			this.itemList1 = []
			uni.request({
				url: this.$bashUrl + '/index.php/home/Api/store_table/',
				method:"POST",
				data:{
					tid: this.shopid
				},
				success(res){
					console.log(res)
					if(res.data.data[0]){
						that.tid = res.data.data[0].id
						that.p = res.data.data[0].num
					}
					that.nowdata = res.data.date
					if(res.data.data.length==0){
						that.notable = true
					}
					for(var i=0;i<res.data.data.length;i++){
						if(res.data.data[i].state == 0){
							// 可以选择桌子
							that.itemList.push(res.data.data[i])
							
						}else if(res.data.data[i].state == 1){
							// 不可以选择桌子
							that.itemList1.push(res.data.data[i])
						}
					}
				},
				fail(err) {
					console.log('获取错误')
				}
			})
			// 获取时间
			uni.request({
				url: this.$bashUrl+ '/index.php/home/Api/time_list/',
				method: 'POST',
				data:{
					id: this.shopid
				},
				success:(res=>{
					console.log(res)
					that.t = res.data[0].name
					that.timeList = res.data
					for(var i =0;i<res.data.length;i++){
						that.timeList[i].name = res.data[i].name.slice(0,5)
					}
				})
			})
			console.log(this.timeList)
			
		},
		methods: {
			reds:function(item,index){
				this.ind = index
				this.p = item.num
				this.baojian = item.table_name
				this.tid = this.itemList[index].id
			},
			adds:function(item,index){
				this.t = item
				this.ind1 = index
				this.timea = this.timeList[index].name
			},
			upData:function(){
				var that = this
				// 验证用户是完善的输入全部需要的数据
				var Intperson = parseInt(this.pepleNumber)
				console.log(this.tid+'     '+this.timea)
				if(Intperson!=0&&Intperson>0){
					uni.request({
						url:  this.$bashUrl + '/index.php/home/Api/user_appoint/',
						method: "POST",
						data:{
							id: this.shopid ,
							tid: this.tid,
							Pnumber: this.pepleNumber,
							phone: this.phone,
							timea: this.timea
						},
						success:function(res){
							var order_id = res.data
							uni.navigateTo({
							    url: '/pages/dianchan/dianchan?aid=' + that.did + '&orderid=' + order_id 
							})
						},
						fail:function(err){
							console.log("错误代码，无法请求")
						}
					})
				}else{
					uni.showToast({
						title: '请输入就餐人数',
						icon:'none'
					});
				}
			}
		}
	}
</script>

<style>
@import url("paidui.css");
</style>
