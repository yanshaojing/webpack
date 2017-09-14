const MinifyPlugin = require('babel-minify-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const baseConfigs = require('./webpack.base.config')

module.exports = () => {
  const { plugins, module, ...otherConfigs } = baseConfigs
  const getLoaderOptions = (isMinify = false) => {
    return {
      modules: true,
      sourceMap: false,
      minimize: isMinify,
      localIdentName: '[local]__[hash:base64:8]',
    }
  }

  return {
    ...otherConfigs,
    module: {
      ...module,
      rules: module.rules.concat([
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: getLoaderOptions(true),
              },
            ],
            fallback: 'style-loader',
          }),
        },
        {
          test: /\.less$/,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: getLoaderOptions(true),
              },
              {
                loader: 'less-loader',
                options: getLoaderOptions(),
              },
            ],
            fallback: 'style-loader',
          }),
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: getLoaderOptions(true),
              },
              {
                loader: 'sass-loader',
                options: getLoaderOptions(),
              },
            ],
            fallback: 'style-loader',
          }),
        },
      ]),
    },
    plugins: plugins.concat([
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
      new MinifyPlugin(),
    ]),
  }
}
