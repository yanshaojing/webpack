const mock = require('../webpack.mock')

const setup = (app) => {
  Object.keys(mock).forEach((key) => {
    const [method, route] = key.split(' ')
    if (method && route) {
      app[method.toLowerCase()](route, mock[key])
    }
  })
}

module.exports = (isMockAPI) => {
  if (!isMockAPI) {
    return
  }
  return setup
}
