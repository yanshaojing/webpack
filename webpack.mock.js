const Mock = require('mockjs')

module.exports = {
  'GET /api/list': (req, res) => {
    return res.json(Mock.mock({
      success: true,
      'data|0-20': [{
        'id|+1': '@id',
        title: '@ctile',
      }],
    }))
  },
}
