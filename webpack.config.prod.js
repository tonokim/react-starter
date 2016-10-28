var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var autoprefixer = require('autoprefixer');
var precss       = require('precss');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // devtool: 'source-map',
  entry: {
    bundle: [
  		'./src/index'
  	],
    vendor: [
      'react',
      'react-dom',
      'redux',
      'react-redux',
      'react-router',
      'redbox-react',
    ],
  },
	output: {
		path: path.join(__dirname, 'static'),
		filename: '[chunkhash:8].[name].js',
		// publicPath: '/static/',
    publicPath: '/'
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
    new webpack.optimize.OccurenceOrderPlugin(),//按引用频度来排序 ID，以便达到减少文件大小的效果
    new webpack.optimize.DedupePlugin(),  //查找相等或近似的模块，避免在最终生成的文件中出现重复的模块。
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true, // React doesn't support IE8
        warnings: false,
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', '[chunkhash:8].vendor.js'),
		new ExtractTextPlugin('[chunkhash:8].[name].css'),
		new CopyWebpackPlugin([
      {
        from: './src/imgs/',
        to: 'imgs/',
        ignore:['.DS_Store']
      }
      // ,{
      //   from: './src/css/',
      //   to: 'css/',
      //   ignore:['.DS_Store']
      // },{
      //   from: './src/fonts/',
      //   to: 'fonts/',
      //   ignore:['.DS_Store']
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
			loader: 'babel?cacheDirectory',
			include: path.join(__dirname, 'src'),
		},
    { test: /\.css$/, loader: 'style!css!postcss?pack=defaults' },
    { test: /\.scss$/, loader: 'style!css!postcss?pack=defaults!sass' },
    { test: /\.(png|jpg|jpeg|gif)$/, loader: 'url?limit=10000&name=./images/[name].[ext]' },
    { test: /\.(ttf|eot|woff|woff2|otf|svg)/, loader: 'file?name=./font/[name].[ext]' }]
	},
  postcss:() => {
    return{
      defaults: [autoprefixer({ browsers: ['last 5 versions'] })],
      other: [precss,autoprefixer({ browsers: ['last 5 versions'] })]
    };
  },
	resolve: {
		alias: {}
	},
  noParse:[]
};
