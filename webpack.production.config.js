var webpack = require('webpack');
var path = require('path');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var CopyWebpackPlugin = require('copy-webpack-plugin');

// 产出html模板
// 问题
// 1、生成图片路径问题。
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: 'cheap-source-map',
  entry: [
    path.resolve(__dirname, 'app/main.jsx'),
  ],
  output: {
    path: __dirname + '/build',
    publicPath: '/',
    filename: 'bundle.[hash:8].js'
  },
  module: {
    loaders:[
      { test: /\.css$/, include: path.resolve(__dirname, 'app'), loader: 'style-loader!css-loader' },
      { test: /\.js[x]?$/, include: path.resolve(__dirname, 'app'), exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.(png|jpg)$/,include: path.resolve(__dirname, 'app'), loader: 'url?limit=10240'}
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new uglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new HtmlWebpackPlugin({
      title: 'your app title',
      template: './app/index.html',
    }),
    new CopyWebpackPlugin([
      { from: './app/main.css', to: 'main.css' }
    ]),
  ]
};
