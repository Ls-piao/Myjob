<script>
	export default {
	
		onLaunch: function() {
			// wget热更新
			// #ifdef APP-PLUS  
			plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
				uni.request({
					url: 'http://ww.0816fc.net/index.php/home/Api/version_check',
					method: "post",
					data: {
						v: widgetInfo.version
					},
					success: (result) => {
						var data = result.data;
						if (data.update && data.wgtUrl) {
							uni.showModal({
								title: "下载更新",
								content: "当前版本过低请更新",
								success: res => {
									if (res.confirm) {
										uni.showLoading({
											title: '下载中,请稍等不要退出',
											mask: true
										});
										uni.downloadFile({
											url: 'http://sjz.rfyylm.com/down/update.wget', //仅为示例，并非真实的资源
											success: (res) => {
												if (res.statusCode === 200) {
													console.log('下载成功');
													console.log(res);
													uni.hideLoading();
													plus.runtime.install(res.tempFilePath, {
														force: false
													}, function() {
														console.log('install success...');
														plus.runtime.restart();
													}, function(e) {
														console.error('install fail...');
													});
												}
											}
										});
									}
									if (res.cancel) {

									}
								}
							})

						}
					}
				});
			});
			// #endif
		
		// uni.setStorageSync('phone',15181655227)
		// 判断用户是否注册，未注册直接跳转到注册登陆页面
		if (!uni.getStorageSync('phone')) {
			uni.redirectTo({
				url: '/pages/sigUp/sigUp'
			})
		}
		},
		onShow: function() {
			
		},
		onHide: function() {}
	}
</script>

<style>
	/* 	@import './common/fontpfang.css'; */
	@font-face {
		font-family: test1-icon;
		src: url('~@/static/DIN-Medium.otf');
	}

	page {
		height: 100%;
		width: 100%;
		position: absolute;
		font-family: test1-icon;
	}

	input {
		placeholder-color: #999999;
	}
</style>
