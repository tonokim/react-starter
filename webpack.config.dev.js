var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var precss       = require('precss');

module.exports = {
  devServer:{
		contentBase: './src',
	},
	devtool: 'cheap-module-eval-source-map',
	entry: {
    bundle: [
  		'webpack-hot-middleware/client?noInfo=true&reload=true',
  		'./src/index'
  	],
    vendor: [
      'react',
      'react-dom',
      'redux',
      'react-redux',
      'react-router',
      'redbox-react',
      'webpack-hot-middleware/client?noInfo=true&reload=true',
    ],
  },
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].js',
		publicPath: '/static/'
	},
	plugins: [
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
	],
	module: {
		loaders: [{
			test: /\.js$/,
			loader: 'babel?cacheDirectory',
      // exclude: /node_modules/,
			include: path.join(__dirname, 'src'),
		},{
			test: /\.css$/,
			loader: 'style!css!postcss?pack=defaults'
		},{
			test: /\.scss$/,
			loader: 'style!css!postcss?pack=defaults!sass'
		},{
			test: /\.(png|jpg)$/,
			loader: 'url?limit=8192'
		},{
			test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'url?limit=10000&mimetype=application/font-woff'
		}, {
			test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'url?limit=10000&mimetype=application/font-woff2'
		}, {
			test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'url?limit=10000&mimetype=application/octet-stream'
		}, {
			test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'file'
		}, {
			test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'url?limit=10000&mimetype=image/svg+xml'
		}]
	},
  postcss:() => {
    return{
      defaults: [autoprefixer({ browsers: ['last 5 versions'] })],
      other: [precss,autoprefixer({ browsers: ['last 5 versions'] })]
    };
  }
};
