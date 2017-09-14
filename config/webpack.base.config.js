const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const { dependencies = {} } = require('../package.json')

// 常量
const APP_PATH = path.resolve('./src') // 源码所在目录
const BUILD_PATH = path.resolve('./dist') // 代码打包输出目录
const PUBLIC_PATH = '/' // 资源根目录
const COMMON_LIST = Object.keys(dependencies) || [] // 获取依赖包，作为公共代码打包

module.exports = {
  context: APP_PATH,
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: {
    index: APP_PATH,
    common: COMMON_LIST,
  },
  output: {
    path: BUILD_PATH,
    publicPath: PUBLIC_PATH,
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'images/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              mimetype: 'application/font-woff',
              name: 'fonts/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 8192,
              mimetype: 'application/font-woff',
              name: 'fonts/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    /**
     * 打包前，清空原目录
     * https://github.com/johnagan/clean-webpack-plugin
     */
    new CleanWebpackPlugin([BUILD_PATH], { verbose: false }),
    /**
     * 启用 CommonChunkPlugin
     * https://webpack.js.org/plugins/commons-chunk-plugin/
     */
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: Infinity,
    }),
  ],
}
