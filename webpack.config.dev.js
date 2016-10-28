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
			include: path.join(__dirname, 'src')
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
  }
};
