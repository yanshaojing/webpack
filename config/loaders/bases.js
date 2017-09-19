const config = require('../config')

module.exports = [
  {
    test: /\.jsx?$/,
    include: config.appSrc,
    loader: 'babel-loader',
  },
  {
    test: /\.(png|jpg|gif)$/,
    include: config.appSrc,
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
    include: config.appSrc,
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
    include: config.appSrc,
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
]
