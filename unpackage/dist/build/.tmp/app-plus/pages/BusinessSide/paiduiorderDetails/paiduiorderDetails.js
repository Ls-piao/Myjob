(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/BusinessSide/paiduiorderDetails/paiduiorderDetails"],{"0c8e":function(e,t,n){"use strict";(function(e){n("c2bf"),n("921b");i(n("66fd"));var t=i(n("42f4"));function i(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])},"249a":function(e,t,n){"use strict";var i=n("d334"),u=n.n(i);u.a},3276:function(e,t,n){"use strict";var i,u=function(){var e=this,t=e.$createElement;e._self._c},a=[];n.d(t,"b",function(){return u}),n.d(t,"c",function(){return a}),n.d(t,"a",function(){return i})},"42f4":function(e,t,n){"use strict";n.r(t);var i=n("3276"),u=n("71f0");for(var a in u)"default"!==a&&function(e){n.d(t,e,function(){return u[e]})}(a);n("249a");var r,o=n("f0c5"),d=Object(o["a"])(u["default"],i["b"],i["c"],!1,null,"4a63747f",null,!1,i["a"],r);t["default"]=d.exports},"5fe6":function(e,t,n){"use strict";(function(e,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i={onLoad:function(t){var i=this;this.id=t.id,e.request({url:this.$bashUrl+"/index.php/home/Api/my_order_info/",method:"POST",data:{good_id:this.id},success:function(e){console.log(n(e," at pages\\BusinessSide\\paiduiorderDetails\\paiduiorderDetails.vue:29")),i.orderInfo=e.data}})},data:function(){return{id:0,orderInfo:{}}},method:{}};t.default=i}).call(this,n("6e42")["default"],n("0de9")["default"])},"71f0":function(e,t,n){"use strict";n.r(t);var i=n("5fe6"),u=n.n(i);for(var a in i)"default"!==a&&function(e){n.d(t,e,function(){return i[e]})}(a);t["default"]=u.a},d334:function(e,t,n){}},[["0c8e","common/runtime","common/vendor"]]]);