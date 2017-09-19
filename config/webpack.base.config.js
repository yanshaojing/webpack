const pkg = require('../package.json')
const config = require('./config')

const vendorName = config.appVendorName

module.exports = (publicPath = '/') => {
  return {
    bail: true,
    entry: {
      index: config.appIndexJS,
      [vendorName]: Object.keys(pkg.dependencies),
    },
    output: {
      publicPath,
      path: config.appBuild,
      filename: '[name].js',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.css', '.scss', '.sass', '.less'],
    },
    stats: {
      chunks: false,
      children: false,
    },
  }
}
