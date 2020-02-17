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
				Did: 0
			}
		},
		onLoad:function(option){
			this.Did = option.id
		},
		methods: {
			getxin:function(value){
				uni.request({
					url: this.$bashUrl + '/index.php/home/Api/comment_list/',
					method:"POST",
					data:{
						id: this.Did,
						start: value.score,
						content: value.textareaValue
					},
					success:function(res){
						uni.showToast({
							title: '评价成功,谢谢分享',
							duration:2000
						})
						uni.switchTab({
							url:'../reserve/reserve'
						})
					}
				})

			}
		}
	}
</script>

<style>

</style>
