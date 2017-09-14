module.exports = (env) => {
  if (env.production) {
    return require('./config/webpack.prod.config')(env)
  }

  return require('./config/webpack.dev.config')(env)
}
