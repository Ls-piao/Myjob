<template>
	<view class="box">
		<view class="">
			<my-issue @submit="getxin" />
		</view>
	</view>
</template>
<script>
	import myIssue from '@/components/myIssue.vue'
	export default {
		components:{
			myIssue
		},
		data() {
			return {
				Did: '',
				shopid: ''
			}
		},
		onLoad:function(option){
			this.Did = option.id
			this.shopid = option.shopid
		},
		methods: {
			getxin:function(value){
				var that = this
				uni.request({
					url: this.$bashUrl + '/index.php/home/Api/comment_replay/',
					method:"POST",
					data:{
						id: this.Did,
						replay: value.textareaValue
					},
					success:function(res){
						uni.showToast({
							title: '回复成功',
							icon:"none"
						})
						uni.navigateTo({
							url: "/pages/BusinessSide/pj-guanli/pj-guanli?shopid=" + that.shopid
						})
					}
				})

			}
		}
	}
</script>

<style>

</style>
