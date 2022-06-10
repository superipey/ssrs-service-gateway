const jwt = require('jsonwebtoken')
const { JWT_SECRET_SALT, TOKEN_FIELD } = require('../config')

let middleware = {}

middleware.auth = async (req, res, next) => {
  try {
    let token = req.query[TOKEN_FIELD]

    if (req.headers.referer) {
      let query = req.headers.referer.split("&");
      query.map(_q => {
        let key = _q.split("=")
        if (key[0] == TOKEN_FIELD) {
          token = key[1]
        }
      })
    }

    if (!token || token === "null") {
      return res.send({
        message: 'Unauthorized'
      }, 401)
    }

    const user = await jwt.verify(token, JWT_SECRET_SALT)
    req.user = user
    next()
  } catch (e) {
    return res.send({
      message: 'Unauthorized'
    }, 401)
  }
}

module.exports = middleware