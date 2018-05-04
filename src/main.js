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

// 导入vuex
import Vuex from 'vuex'
Vue.use(Vuex)
// 在每次页面刷新时 从本地存储中拿取car 的数据
var car = JSON.parse(localStorage.getItem('car') || '[]')

localStorage.getItem('car')
const store = new Vuex.Store({
	state: {
		car: car            //购物车中的所有数据
	},
	mutations: {
		storedata(state, obj){             //将用户购买的商品数据存储到state.car中
			var index = state.car.findIndex(item=>item.id == obj.id)
			// console.log(index)
			if (index == -1) {
				state.car.push(obj)
			}else{
				state.car[index].count += parseInt(obj.count)
			}
			// console.log(state.car)
			localStorage.setItem('car',JSON.stringify(state.car))      //在每次更新购物车中的数据时 将car中的数据放到本地存储中
		},
		updatacount(state, obj){             //在shopcar界面选择框中的数据改变时 同时改变car 对应id 的商品的数据
			state.car.some(item=>{
				if (item.id == obj.id) {
					item.count = obj.count
					return true
				}
			})
			localStorage.setItem('car',JSON.stringify(state.car))
		},
		removegoods(state, id){              //删除car 中对应id商品的数据
			state.car.some((item, i)=>{
				if (item.id == id) {
					state.car.splice(i, 1)
					return true
				}
			})
			localStorage.setItem('car',JSON.stringify(state.car))			
		},
		changeflag(state, obj){            //将对应id的选中状态同步到store中
			state.car.some(item=>{
				if (item.id == obj.id ) {
					item.flag = obj.flag
				}
			})
			localStorage.setItem('car',JSON.stringify(state.car))			

		}
	},
	getters: {
		tocalmount(state){            //购物车徽章中数据
			var tocalmount = 0;
			state.car.forEach(item=>{				
				tocalmount += parseInt(item.count)				
			})
			return tocalmount
		},
		getgoodscount(state, id){          //初始化shopcar页面中选择框的初始值
			var obj = {}
			state.car.forEach(item=>{			//以一个对象的形式 将id 与 count 联系起来	
				obj[item.id] = item.count				
			})
			return obj
		},
		getselected(state){                //初始化shopcar中开关按钮的状态值
			var obj = {}
			state.car.forEach(item=>{
				obj[item.id] = item.flag
			})
			return obj
		},
		gettotal(state){                    //选中商品的总数量 及 总价格  遍历car   选中状态为true的商品 计算总件数及总价格
			var obj = {
				totalcount: 0,
				totalprice: 0
			}
			state.car.forEach(item=>{
				if (item.flag) {
					obj.totalcount += parseInt(item.count)
					obj.totalprice += parseInt(item.price)*parseInt(item.count)
				}
			})
			return obj
		}
	}
})

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
	router,
	store
})