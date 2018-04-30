const path = require('path')

// 导入html-webpack-plugin插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
	// entry,output 配置webpack-dev-server的入口文件与输出文件
	entry: path.join(__dirname, './src/main.js'),
	output: {
		// 输出到哪个文件
		path: path.join(__dirname, './dist'),
		filename: 'bundle.js'
	},
	// plugins这个节点配置所有的插件
	plugins: [
	new HtmlWebpackPlugin({
		// template指定根据的是哪个文件
		template: path.join(__dirname, './src/index.html'),
		// 在内存中生成的文件名
		filename: 'index.html'
	})
	],
	// module这个节点配置所有的第三方模块加载器
	module: {
		rules: [
		// 匹配以.css结尾的 使用style-loader css-loader来加载
		{test: /\.css$/, use: ['style-loader','css-loader']},
		// 匹配以.less结尾的  使用less-loader来加载
		{test: /\.less$/, use: ['style-loader','css-loader','less-loader']},
		// 设置图片加载  limit设置只有当图片小于这个字节时才进行base64位编码转换 [name].[ext]设置图片的名字用原来图片的名字及后缀 [hash:10]-在图片名前加10位的hash值，避免图片名字一样产生问题
		{test: /\.(jpg|png|gif|jpeg|bmp)$/, use: 'url-loader?limit=2203521&name=[hash:10]-[name].[ext]'},
		// 设置字体图标
		{test: /\.(eot|svg|ttf|woff|woff2)$/, use: 'url-loader'},
		// 配置babel-loader用来处理高级的 es6代码  exclude设置node_modules文件夹下的js文件不进行编译
		{test: /\.js$/, use: 'babel-loader', exclude: /node_modules/},
		// 配置.vue文件用vue-loader来加载
		{test: /\.vue$/, use: 'vue-loader'}
		]
	},
	/*resolve: {
		// 修改vue包被导入时的路径
		alias: {
			'vue$': 'vue/dist/vue.js'
		}
	}*/
}
