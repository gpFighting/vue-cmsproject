// 入口文件
import Vue from 'vue'

// 导入路由模块
import VueRouter from 'vue-router'
Vue.use(VueRouter) //注册路由
// 导入路由组件
import router from './router.js'
// 导入vue-resource组件
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.emulateJSON = true;

import moment from 'moment'
Vue.filter('dateFormat', function (dateStr, pattern='YYYY-MM--DD HH:mm:ss'){
	 return moment(dateStr).format(pattern)
})
// 导入mint-ui 的相关模块
import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.use(Lazyload);
import './lib/Mui/css/mui.min.css' //导入mui样式表
import './lib/Mui/css/icons-extra.css'  //导入购物车图标样式表




// 导入App跟组件
import app from './App.vue'
var vm = new Vue({
	el: '#app',
	render: c=>c(app),
	router
})