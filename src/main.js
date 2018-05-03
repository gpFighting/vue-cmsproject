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

// 全局指定跟域名  post请求配置
Vue.http.options.emulateJSON = true;
Vue.http.options.root = 'http://www.escook.cn:3000/'


// 导入VuePreview模块  制作图片详情缩略图部分
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 导入moment  日期格式化
import moment from 'moment'
Vue.filter('dateFormat', function (dateStr, pattern='YYYY-MM--DD HH:mm:ss'){
	 return moment(dateStr).format(pattern)
})
// 导入mint-ui 的相关模块
/*import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.use(Lazyload);*/
// 全局导入mint-ui组件  lazyload控件按需导入的话不会出现懒加载效果
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)



import './lib/Mui/css/mui.min.css' //导入mui样式表
import './lib/Mui/css/icons-extra.css'  //导入购物车图标样式表




// 导入App跟组件
import app from './App.vue'
var vm = new Vue({
	el: '#app',
	render: c=>c(app),
	router
})