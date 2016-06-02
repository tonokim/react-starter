var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var autoprefixer = require('autoprefixer');
var precss       = require('precss');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // devtool: 'source-map',
	entry: [
		'./src/index'
	],
	output: {
		path: path.join(__dirname, 'static'),
		filename: '[chunkhash:8].bundle.js',
		// publicPath: '/static/',
    publicPath: '/'
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
    // new webpack.optimize.MinChunkSizePlugin({
    //   compress: {
    //     warnings: false
    //   }
    // }),
    // new webpack.optimize.CommonsChunkPlugin('common','/common.js'),
    new webpack.optimize.DedupePlugin(),  //查找相等或近似的模块，避免在最终生成的文件中出现重复的模块。
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false,
			},
		}),
    new webpack.optimize.OccurenceOrderPlugin(),  //按引用频度来排序 ID，以便达到减少文件大小的效果
    // new webpack.optimize.AggressiveMergingPlugin({
  	// 		minSizeReduce: 1.5,
  	// 		moveToParents: true
  	// }),
		new ExtractTextPlugin("[chunkhash:8].[name].css"),
		new CopyWebpackPlugin([
      {
        from: './src/imgs/',
        to: 'imgs/'
      },{
        from: './src/css/',
        to: 'css/'
      },{
        from: './src/fonts/',
        to: 'fonts/'
      },
      // ,{
      // 	from: './src/api/',
      // 	to: 'api/'
      // }
      // ,{
      // 	from: './index.static.html',
      // 	to: 'index.html',
      // 	toType: 'file'
      // }
    ]),
    new HtmlWebpackPlugin({
      title: 'react-starter',
      template: 'index.ejs',
      inject: 'body'
    })
	],
	module: {
		loaders: [{
			test: /\.js$/,
			loaders: ['babel'],
			include: path.join(__dirname, 'src')
		},{
			test: /\.css$/,
			loader: ExtractTextPlugin.extract('style','css!postcss?pack=defaults')
		},{
			test: /\.scss$/,
			loader: ExtractTextPlugin.extract('style','css!postcss?pack=defaults!sass')
		},{
			test: /\.(png|jpg)$/,
			loader: 'url?limit=8192'
		},{
			test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
			loader: "url?limit=10000&mimetype=application/font-woff"
		}, {
			test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
			loader: "url?limit=10000&mimetype=application/font-woff2"
		}, {
			test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
			loader: "url?limit=10000&mimetype=application/octet-stream"
		}, {
			test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
			loader: "file"
		}, {
			test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
			loader: "url?limit=10000&mimetype=image/svg+xml"
		}]
	},
  postcss:function(){
    return{
      defaults: [autoprefixer({ browsers: ['last 5 versions'] })],
      other: [precss,autoprefixer({ browsers: ['last 5 versions'] })]
    };
  },
	resolve: {
		alias: {
		}
	}
};
