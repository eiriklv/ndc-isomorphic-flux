'use strict';

var debug = require('debug')('app:dev-server');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.dev');
var livereload = require('livereload');
var fs = require('fs');
var chokidar = require('chokidar');
var async = require('async');
var sass = require('node-sass');

var webpackServer = new WebpackDevServer(webpack(webpackConfig), {
  publicPath: webpackConfig.output.publicPath,
  contentBase: 'http://localhost:3000',
  noInfo: true,
  hot: true,
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
}).listen(3001, 'localhost', function(err, result) {
  if (err) console.log(err);
  else debug('Webpack server listening on port 3001');
});

var renderSass = function(filename) {
  sass.render({
    file: __dirname + '/../style/main.scss',
    outFile: __dirname + '/../public/css/main.css',
    sourceMap: true,
    success: function(data) {
      if (filename) debug('Changed ' + filename);
      
      async.series([
        fs.writeFile.bind(fs, __dirname + '/../public/css/main.css.map', data.map, 'utf-8'),
        fs.writeFile.bind(fs, __dirname + '/../public/css/main.css', data.css, 'utf-8')
      ], function(err) {
        if (err) debug('error writing css/sourcemap to file:', err);
      });
    },
    error: function(error) {
      console.log(error);
    }
  });
};

chokidar.watch('./style', {
  ignored: /[\/\\]\./
}).on('all', function(event, filename) {
  var ext = filename.split('/').pop().split('.').pop();
  if (ext !== 'scss') return;
  renderSass(filename);
});

var lr = livereload.createServer();
lr.watch(__dirname + '/../public');

renderSass();
