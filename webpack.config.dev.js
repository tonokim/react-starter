'use strict';
var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var precss       = require('precss');

var babelQuery = {
    presets: ['es2015', 'react', 'stage-0'],
    "env": {
      "development": {
        "plugins": [
          ["react-transform", {
            "transforms": [{
              "transform": "react-transform-hmr",
              "imports": ["react"],
              "locals": ["module"]
            }, {
              "transform": "react-transform-catch-errors",
              "imports": ["react", "redbox-react"]
            }]
          }]
        ]
      }
    },
    cacheDirectory: true
};


module.exports = {
  devServer:{
		contentBase: './src',
	},
	devtool: 'cheap-module-eval-source-map',
	entry: [
		'webpack-hot-middleware/client',
		'./src/index'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/static/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	module: {
		loaders: [{
			test: /\.js$/,
			loader: 'babel',
      // exclude: /node_modules/,
			include: path.join(__dirname, 'src'),
      query: babelQuery
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
  }
};
