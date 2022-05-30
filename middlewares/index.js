const jwt = require('jsonwebtoken')
const {JWT_SECRET_SALT} = require('../config')

let middleware = {}

middleware.auth = async (req, res, next) => {
  try {
    const token = req.query['token']
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