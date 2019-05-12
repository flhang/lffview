var path = require('path');
var webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
	entry: './src/main.js', // 项目的入口文件，webpack会从main.js开始，把所有依赖的js都加载打包
	output: {
		path: path.resolve(__dirname, './dist'), // 项目的打包文件路径
		publicPath: '/dist/', // 通过devServer访问路径
		filename: 'build.js' // 打包后的文件名
	},
	devServer: {
		historyApiFallback: true,
		overlay: true
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js'
		}
	},
	module: {
		rules: [{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			}, {
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'static/img/[name].[hash:7].[ext]'
				}
			},

		]
	},
	plugins: [
		// 请确保引入这个插件来施展魔法
		new VueLoaderPlugin()
	]
};
