const fs = require('fs')
const path = require('path')

const resolve = (relativePath) => {
  const directory = fs.realpathSync(process.cwd())
  return path.resolve(directory, relativePath)
}

module.exports = {
  appVendorName: 'vendor',
  appStaticPath: '/static', // 开发环境下始终为 /
  appSrc: resolve('src'),
  appBuild: resolve('build'),
  appPublicDir: resolve('public'),
  appIndexJS: resolve('src/index.js'),
  appIndexHtml: resolve('public/index.html'),
}
