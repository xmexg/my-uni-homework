(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-cate-cate"],{"1b87":function(t,e,i){"use strict";i("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{list:[],currentIndex:0,children:[]}},created:function(){this.loadData()},methods:{onItemClick:function(t,e){this.currentIndex=e,this.children=t.children},loadData:function(){var t=this;uni.request({url:"https://api-hmugo-web.itheima.net/api/public/v1/categories",success:function(e){console.log(e),t.list=e.data.message,t.children=t.list[0].children}})}}};e.default=a},"22d8":function(t,e,i){var a=i("b3fc");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("5fa7de5c",a,!0,{sourceMap:!1,shadowMode:!1})},"2c4d":function(t,e,i){"use strict";var a=i("22d8"),n=i.n(a);n.a},"2dcc":function(t,e,i){"use strict";i.r(e);var a=i("bf1b"),n=i("9abf");for(var c in n)["default"].indexOf(c)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(c);i("2c4d");var s=i("f0c5"),r=Object(s["a"])(n["default"],a["b"],a["c"],!1,null,"09321740",null,!1,a["a"],void 0);e["default"]=r.exports},"9abf":function(t,e,i){"use strict";i.r(e);var a=i("1b87"),n=i.n(a);for(var c in a)["default"].indexOf(c)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(c);e["default"]=n.a},b3fc:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\n/* 水平间距 */\n/* 水平间距 */.container[data-v-09321740]{display:flex}.cate-box[data-v-09321740]{margin-bottom:56px}.left-box[data-v-09321740]{width:%?228?%;height:100vh}.list-item[data-v-09321740]{height:60px;text-align:center;line-height:60px;font-size:12px;border-bottom:1px #eee solid;background-color:#fff}.active[data-v-09321740]{border-left:4px #a23023 solid;box-sizing:border-box}.right[data-v-09321740]{width:%?572?%;height:100vh}.item2-title[data-v-09321740]{text-align:center;font-weight:700;padding:12px 0}.item3-box[data-v-09321740]{display:flex;flex-wrap:wrap;justify-content:space-around}.item3-icom[data-v-09321740]{width:%?160?%;height:%?140?%}.item3-name[data-v-09321740]{font-size:12px;text-align:center;margin-bottom:6px}',""]),t.exports=e},bf1b:function(t,e,i){"use strict";i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return n})),i.d(e,"a",(function(){}));var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"container"},[i("v-uni-scroll-view",{staticClass:"left-box",attrs:{"scroll-y":"true"}},t._l(t.list,(function(e,a){return i("v-uni-view",{key:e.cat_id,staticClass:"list-item",class:{active:t.currentIndex===a},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.onItemClick(e,a)}}},[t._v(t._s(e.cat_name))])})),1),i("v-uni-scroll-view",{staticClass:"right",attrs:{"scroll-y":"true"}},t._l(t.children,(function(e,a){return i("v-uni-view",{key:a,staticClass:"item2-box"},[i("v-uni-view",{staticClass:"item2-title"},[t._v(t._s(e.cat_name))]),i("v-uni-view",{staticClass:"item3-box"},t._l(e.children,(function(e,a){return i("v-uni-view",{key:"index3",staticClass:"item3-item"},[i("v-uni-image",{staticClass:"item3-icom",attrs:{src:e.cat_icon,mode:""}}),i("v-uni-view",{staticClass:"item3-name"},[t._v(t._s(e.cat_name))])],1)})),1)],1)})),1)],1)},n=[]}}]);