var path = require('path')
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  entry: {
    game: "./src/start.js",
    style: "./src/stylesheets/style.css"
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, "demo"),
    publicPath: '/assets/',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style", "css")
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("[name].css")
  ]
}