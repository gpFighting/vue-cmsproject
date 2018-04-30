import vueRouter from 'vue-router'

import homeContainer from './components/tabbar/homeContainer.vue'
import memberContainer from './components/tabbar/memberContainer.vue'
import shopcarContainer from './components/tabbar/shopcarContainer.vue'
import searchContainer from './components/tabbar/searchContainer.vue'

var router = new vueRouter({
	routes: [
		{path: '/', redirect: '/home'},
		{path: '/home', component: homeContainer},
		{path: '/member', component: memberContainer},
		{path: '/shopcar', component: shopcarContainer},
		{path: '/search', component: searchContainer}
	],
	linkActiveClass: 'mui-active'
})

// 暴露router
export default router

