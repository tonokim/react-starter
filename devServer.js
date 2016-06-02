var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');

var app = express();
var compiler = webpack(config);

var host = 'http://localhost';
var port = 3000;

var serverOptions = {
	noInfo: true,
	publicPath: config.output.publicPath
}

app.use(require('webpack-dev-middleware')(compiler, serverOptions));

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static(path.join(__dirname, 'src')));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at ' + host + ':' + port);
});
