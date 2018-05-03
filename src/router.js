import vueRouter from 'vue-router'

import homeContainer from './components/tabbar/homeContainer.vue'
import memberContainer from './components/tabbar/memberContainer.vue'
import shopcarContainer from './components/tabbar/shopcarContainer.vue'
import searchContainer from './components/tabbar/searchContainer.vue'
import newslist from './components/newslist/newslist.vue'
import newslistContent from './components/newslist/newslist-content.vue'
import photoList from './components/photos/photolist.vue'
import photoInfo from './components/photos/photoinfo.vue'
import goodslist from './components/goodslist/goodslist.vue'
import goodsinfo from './components/goodslist/goodsinfo.vue'
import goodsdesc from './components/goodslist/goodsdesc.vue'
import goodscomment from './components/goodslist/goodscomment.vue'
var router = new vueRouter({
	routes: [
		{path: '/', redirect: '/home'},
		{path: '/home', component: homeContainer},
		{path: '/member', component: memberContainer},
		{path: '/shopcar', component: shopcarContainer},
		{path: '/search', component: searchContainer},
		{path: '/home/newslist', component: newslist},
		{path: '/home/newslistContent/:id', component: newslistContent},
		{path: '/home/photoList', component: photoList},
		{path: '/home/photoInfo/:id', component: photoInfo},
		{path: '/home/goodslist', component: goodslist},
		{path: '/home/goodsinfo/:id', component: goodsinfo},
		{path: '/home/goodsdesc/:id', component: goodsdesc, name: 'getdesc'},
		{path: '/home/goodscomment/:id', component: goodscomment, name: 'getcomments'}
	],
	linkActiveClass: 'mui-active'
})

// 暴露router
export default router

