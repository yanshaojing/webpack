const path = require('path')
const webpack = require('webpack')
const baseConfigs = require('./webpack.base.config')

module.exports = (env) => {
  const PORT = env.port || 8080
  const HTML_PATH = path.join(__dirname, '../public')
  const { plugins, module, ...otherConfigs } = baseConfigs
  const defaultOptions = {
    modules: true,
    sourceMap: true,
    localIdentName: '[local]__[hash:base64:8]',
  }

  return {
    ...otherConfigs,
    devtool: 'source-map', // devtool: 'source-map',
    /**
     * 开发环境配置
     * https://webpack.js.org/configuration/dev-server/
     */
    devServer: {
      port: PORT,
      hot: true,
      noInfo: true,
      overlay: true,
      compress: true,
      contentBase: HTML_PATH, // 入口 html 文件
    },
    module: {
      ...module,
      rules: module.rules.concat([
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.less$/,
          use: [
            { loader: 'style-loader' },
            {
              loader: 'css-loader',
              options: defaultOptions,
            },
            {
              loader: 'less-loader',
              options: defaultOptions,
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            { loader: 'style-loader' },
            {
              loader: 'css-loader',
              options: defaultOptions,
            },
            {
              loader: 'sass-loader',
              options: defaultOptions,
            },
          ],
        },
      ]),
    },
    plugins: plugins.concat([
      /**
       * 热替换
       * https://webpack.js.org/plugins/hot-module-replacement-plugin/
       */
      new webpack.HotModuleReplacementPlugin(),
    ]),
  }
}
