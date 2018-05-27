# this is my project
##  这是一个牛逼的项目 牛不牛逼用心去感受
### 感受每一行代码中的诗琴雅意
#### 妹的，遍布下去了 就这样吧
##使用到的技术栈： webpack  vue  vue-router  mint-ui  mui  vue-preview  vuex  vue-resource
#项目实现步骤及总结
## webpack 基本配置 项目结构搭建
## 项目主体结构 app.vue
1. head 部分 使用mint-ui组件实现
2. 底部导航栏 tabbar部分  使用 mui 的导航栏api实现
3. 修改导航栏部分的显示图标和文字，购物车小图标 在mui的扩展图标中，因此还要引入扩展图标的css样式与字体库
4. 改造导航栏为router-link 设置路由链接
5.设置路由点击高亮显示 mui有默认的mui-active类  所以只需将路由的link-active-class 设为 mui-active 即可

	-- * 项目实施过程中发现导航栏部分点击不能正常跳转，原因是Mui默认阻止了a标签的跳转，所以查资料得到解决方案，导入mui的js后，在APP.vue页面挂载完成后 添加如下代码，如果通过body进行事件委托，会发现整个程序页面中所有的a标签都会点击跳转，会造成缩略图vue-preview不能正常显示
	```
		mounted(){       
			mui('.mui-bar-tab').on('tap','a',function(){
	　　　　　　	window.top.location.href=this.href;
	　　　　　　})
		}
	```
6. 中间部分放置 router-view  
	+因为head tabbar 都是定位的  所以页面要设置上下的相应的内边距

## 项目首页 homeContainer.vue
1. 轮播图制作 使用mint-ui 的轮播图组件
2. 六宫格布局 使用mui的九宫格布局实现

## 制作 新闻咨询 块
1.改造首页新闻咨询为router-link   设置路由匹配规则
2.新建 newslist.vue 组件， 实现页面的布局和样式
3.通过this.$http.get请求新闻列表数据，并通过v-for循环渲染到页面中
4.修改每条新闻列表为router-link，创建相应的路由匹配规则
5.创建新闻详情组件newslist-content.vue， 头部布局与样式实现
6.发送请求并渲染到页面中

## 评论子组件 comment.vue
1.商品详情部分也会有商品评论，所以讲评论组件抽离为子组件
2.创建comment.vue组件模板，页面的布局与样式实现
3.组件一创建created就请求数据存储在data中并进行数据渲染
4.加载更多按钮使用mint-ui 中mt-button实现，注册点击事件，向服务器发送请求，请求下一页数据，并将返回的数据数组与data中comments数组进行合并concat，实现加载显示更多
5.点击发送评论按钮，将文本框中的值Post请求至服务器，在提交成功后，将文本框中的值unshift 插入到data中comments数组前，实现页面的渲染
## 将首页 图片分享 改造为路由
1.创建图片列表 photolist.vue 组件模板，导入路由并创建路由规则
2.顶部图片分类滑动条的实现：可以使用mui的tab-top-webview-main.html
3. 需要把 slider 区域的 mui-fullscreen 类去掉
4.这是mui的js组件，所以需要导入mui.js， 并进行初始化
5.导入mui.js文件后，会发现控制台报错`Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode`  这是因为mui.js中使用了caller,callee,arguments属性，webpack打包好的js默认是启用严格模式的，不支持这些属性，需要安装babel-plugin-transform-remove-strict-mode插件取消严格模式
6. 刚进入 图片分享页面的时候， 滑动条无法正常工作， 经过我们认真的分析，发现， 如果要初始化 滑动条，必须要等 DOM 元素加载完毕，所以，我们把 初始化 滑动条 的代码，搬到了 mounted 生命周期函数中；（与DOM行为有关的代码需要在DOM挂载在页面中后执行）
7. 当 滑动条 调试OK后，发现， tabbar 无法正常工作了，这时候，我们需要把 每个 tabbar 按钮的 样式中  `mui-tab-item` 重新改一下名字；
8.实现点击不同类获取相应的图片数据并渲染
9.利用mint-ui中的`lazy-load`组件实现图片懒加载，这个组件需要全局导入mint-ui，按需导入时没有效果
## 实现点击图片跳转到图片详情的路由改造
1.创建图片详情组件模板， 导入组件并设置路由规则
2.页面布局与简单样式实现
3.请求数据并进行数据渲染
4.通过vue-preview 实现缩略图效果
5.评论子组件导入

## 首页 商品购买 路由改造
1.创建goodalist.vue组件模板，导入路由并设置路由规则
2.页面布局与样式实现
3.请求数据并进行数据渲染
4.加载更多按钮，注册点击事件请求下一页数据，并与data中的数据进行合并
## 点击商品图片进入商品详情
1.改造商品图片路由
2.创建商品详情goodsinfo.vue路由组件模板，使用mui的卡片视图实现整体页面布局
3.第一部分轮播图部分，将首页中的轮播图部分抽离为一个单独的轮播图组件swipe.vue，在此处导入
4.首页中轮播图中的图片与此处的轮播图图片不同，首页中图片宽度为100%，此处商品的图片是高度比宽度长的，所以此处轮播图组件中宽度不能为100%，那怎么实现呢？   两个轮播图唯一的不同就是宽度是不是100%，我们可以在轮播图子组件中将宽度100%定义为一个单独的类名full，然后给图片属性绑定`:class="{full: flag}"`，至于flag的值为true还是false 由调用他的父组件去决定（父给子传值）
5.卡片视图其他部分页面布局与样式设置  +-选择框使用mui的numbox实现
6.创建numbox子组件
7.数据请求及渲染
8.制作小球及实现点击加入购物车半场动画 用到v-show before-enter enter after-enter(小球的移动距离不能写死，在不同设备上需动态改变，及购物车徽章的位置减去小球的初始位置，使用getBoundingClientRect()方法)
9.实现+-框的最大值不能超过商品的库存数量
10.子组件+-框中的值一发生变化（change）就传递给父组件goodsinfo.vue存储在data中
## 与购物车有关的使用 vuex 状态管理模式 技术
11. 当点击加入购物车时，goodsinfo通过`this.$store.commit('storedata',{id: this.id, count: this.buynum,price: this.info.sell_price,flag: true})`将data中选中商品的id，数量，价格，以及选中状态以对象形式存储到全局的store.state.car中
12.mutations中的storedata方法中要将car中的数据存储到本地存储中，每次页面一刷新都要从本地存储中拿取数据
13.在getters中定义totalmount 循环car中的每一项计算count的和 并 绑定给购物车徽章

## 购物车模块
1.创建购物车模块组件模板
2.渲染选中的商品数据
