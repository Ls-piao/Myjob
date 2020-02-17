import Vue from 'vue'
import App from './App'
import qqmapsdk from './sdk/qqmap-wx-jssdk.js'
import drawer from './components/drawer/drawer.vue'

Vue.component('drawer',drawer)
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
// console.log(uni)
// 全局变量存放处
Vue.prototype.QQMapWX = new qqmapsdk({
	key: 'IFIBZ-YVHCX-HNP4H-TK34M-35AMT-D2FV4'
});
//---------------------------------------------------------------------
// function request(token, url, type, data) {
// 	token = uni.getStorageSync('token')
// 	uni.request({
// 		url: 'http://ww.0816fc.net/'+url,
// 		methods: type,
//		header:token
// 		data:data
//		success:res=>{
//			return res
//		},
//		fail:err=>{
//			return err
//		}
// 	})
// }
//--------------------------------------------------------------

Vue.prototype.$bashUrl = 'http://ww.0816fc.net/'
Vue.prototype.$imgUrl = 'http://ww.0816fc.net/Uploads/'
Vue.prototype.$dis = function(lat1, lng1, lat2, lng2) {
		var radLat1 = lat1 * Math.PI / 180;
		var radLat2 = lat2 * Math.PI / 180;
		var radLng1 = lng1 * Math.PI / 180;
		var radLng2 = lng2 * Math.PI / 180;
		var a = radLat1 - radLat2
		var b = radLng1 - radLng2
		var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
			Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));

		s = s * 6378.137; // EARTH_RADIUS;
		s = Math.round(s * 10000) / 10000; //输出为mi
		var distance = s;
		var distance_str = "";
		if (parseInt(distance) >= 1) {
			distance_str = distance.toFixed(1) + "km";
		} else {
			distance_str = parseInt(distance * 1000) + "m";
		}
		//s=s.toFixed(4);
		return distance_str;


	},
	// 全局函数存放处
	// request.interceptors.request.use((request)=>{

	// })

	Vue.prototype.nowTime = Date.nowTime || function() {
		return new Date().getTime();
	};
