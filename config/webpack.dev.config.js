const webpack = require('webpack')
const DashboardPlugin = require('webpack-dashboard/plugin')
const mockAPI = require('./webpack.mock.config')
const baseLoaders = require('./loaders/bases')
const basePlugins = require('./plugins/bases')
const based = require('./webpack.base.config')
const config = require('./config')

const PUBLIC_PATH = '/'
const STATIC_PATH = ''

module.exports = (env) => {
  const port = env.port || 8080
  const defaultOptions = {
    modules: true,
    sourceMap: true,
    localIdentName: '[local]__[hash:base64:8]',
  }

  return {
    ...based(PUBLIC_PATH),
    devtool: 'source-map',
    watchOptions: {
      ignored: /node_modules/,
    },
    /**
     * 开发环境配置
     * https://webpack.js.org/configuration/dev-server/
     */
    devServer: {
      port,
      hot: true,
      noInfo: true,
      overlay: true,
      compress: true,
      setup: mockAPI(env.mock),
      contentBase: config.appPublicDir,
    },

    /** modules */
    module: {
      rules: baseLoaders.concat([
        {
          test: /\.css$/,
          include: config.appSrc,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.less$/,
          include: config.appSrc,
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
          include: config.appSrc,
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

    /** plugins */
    plugins: basePlugins(STATIC_PATH).concat([
      /**
       * 热替换
       * https://webpack.js.org/plugins/hot-module-replacement-plugin/
       */
      new webpack.HotModuleReplacementPlugin(),
      /**
       * 在控制台中输出模块名
       * https://webpack.js.org/plugins/named-modules-plugin/
       */
      new webpack.NamedModulesPlugin(),
      /**
       * 避免发出包含错误的模块
       * https://webpack.js.org/plugins/no-emit-on-errors-plugin/
       */
      new webpack.NoEmitOnErrorsPlugin(),
      /**
       * 输出日志可视化
       * https://github.com/FormidableLabs/webpack-dashboard
       */
      new DashboardPlugin(),
    ]),
  }
}
