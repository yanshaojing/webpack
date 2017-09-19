const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const baseLoaders = require('./loaders/bases')
const basePlugins = require('./plugins/bases')
const based = require('./webpack.base.config')
const config = require('./config')

const PUBLIC_PATH = config.appStaticPath
const STATIC_PATH = PUBLIC_PATH.replace(/\/$/, '')

module.exports = () => {
  const getLoaderOptions = (isMinify = true) => {
    return {
      modules: true,
      sourceMap: false,
      minimize: isMinify,
      localIdentName: '[local]__[hash:base64:8]',
    }
  }

  return {
    ...based(PUBLIC_PATH),

    /** modules */
    module: {
      rules: baseLoaders.concat([
        {
          test: /\.css$/,
          include: config.appSrc,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: { minimize: true },
              },
            ],
            fallback: 'style-loader',
          }),
        },
        {
          test: /\.less$/,
          include: config.appSrc,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: getLoaderOptions(),
              },
              {
                loader: 'less-loader',
                options: getLoaderOptions(false),
              },
            ],
            fallback: 'style-loader',
          }),
        },
        {
          test: /\.scss$/,
          include: config.appSrc,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: getLoaderOptions(),
              },
              {
                loader: 'sass-loader',
                options: getLoaderOptions(false),
              },
            ],
            fallback: 'style-loader',
          }),
        },
      ]),
    },

    /** plugins */
    plugins: basePlugins(STATIC_PATH).concat([
      /**
       * 打包之前清空上一次的打包信息
       * https://github.com/johnagan/clean-webpack-plugin/
       */
      new CleanWebpackPlugin(['*'], {
        root: config.appBuild,
      }),
      /**
       * 提升作用域，优化代码执行速度
       * https://webpack.js.org/plugins/module-concatenation-plugin/
       */
      new webpack.optimize.ModuleConcatenationPlugin(),
      /**
       * 样式分离
       * https://webpack.js.org/plugins/extract-text-webpack-plugin/
       */
      new ExtractTextPlugin({
        filename: '[name].css',
        ignoreOrder: true,
        allChunks: true,
      }),
      /**
       * 文件 Minify
       * https://webpack.js.org/plugins/babel-minify-webpack-plugin/
       */
      new MinifyPlugin({
        removeConsole: true,
        removeDebugger: true,
      }),
    ]),
  }
}
