<template>
	<view class="body">
		<view class="face-wapper">
			<image class="face-wapper-img" src="../../static/Icon/default-face.png"></image>
		</view>
		<view class="face-title"><text>欢迎使用某某~</text></view>
		<view class="login-box">
			<view class="info-wapper">
				<label class="words-lbl">
					<image class="info-img" src="../../static/Icon/username.png"></image>
				</label>
				<view class="words-inp">
					<input cursor="2" class="line" name="username" maxlength="13" type="text" value="" placeholder="账号" placeholder-class="graywords" />
				</view>
			</view>
			<view class="info-wapper">
				<label class="words-lbl">
					<image class="info-img" src="../../static/Icon/password.png"></image>
				</label>
				<view class="words-inp">
					<input class="line" name="password" type="text" value="" password="true" placeholder="密码" placeholder-class="graywords" />
				</view>
			</view>
		</view>
		<view class="password-sav">
			 <label>
				<checkbox checked="true" color="#3D7BFF" style="transform:scale(0.7)" />记住密码
			</label>
		</view>
		<view class="login-btn">登录</view>
		<!-- <view class="login-txt">
			<text>其它方式登录</text>
			<image class="login-img" src="../../static/Icon/weChat.png"></image>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cursorindex: 1
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	@import url("sigIn.css");
</style>
