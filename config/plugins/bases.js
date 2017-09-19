const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const config = require('../config')

module.exports = (staticPath) => {
  return [
    /**
     * 生成HTML文件
     * https://webpack.js.org/plugins/html-webpack-plugin/
     */
    new HtmlWebpackPlugin({
      staticPath,
      inject: true,
      template: config.appIndexHtml,
    }),
    /**
     * 复制 public 目录下的文件到打包后的目录下
     * https://github.com/kevlened/copy-webpack-plugin/
     */
    new CopyWebpackPlugin([
      { from: config.appPublicDir },
    ]),
    /**
     * 启用 CommonChunkPlugin
     * https://webpack.js.org/plugins/commons-chunk-plugin/
     */
    new webpack.optimize.CommonsChunkPlugin({
      name: config.appVendorName,
      minChunks: Infinity,
    }),
  ]
}
