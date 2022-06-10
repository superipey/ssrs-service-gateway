const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const middlewares = require('./middlewares')
const { HOST, PORT, SSRS_SERVER_IP, JWT_SECRET_SALT, SSRS_BASIC_AUTH, TOKEN_FIELD } = require('./config')
const jwt = require('jsonwebtoken')

// Create Express Server
const app = express()

// Generate Token for Testing
app.use('/token', async (req, res, next) => {
  let user = {
    username: 'superipey',
    level: 'Admin',
    fullname: 'Ferry Stephanus Suwita'
  }

  let token = await jwt.sign(user, JWT_SECRET_SALT, { algorithm: 'HS512', expiresIn: '365d' })

  return res.send({
    message: 'success',
    data: {
      token
    }
  })
})

// Proxy endpoints
let token = '';
app.use('/', middlewares.auth, createProxyMiddleware({
  target: SSRS_SERVER_IP,
  // pathRewrite: { '^/': '/ReportServer/' },
  // autoRewrite: true,
  // changeOrigin: true,
  // xfwd: true,
  // changeOrigin: true,
  // cookieDomainRewrite: "44.203.168.235",
  onProxyReq: function (proxyReq, req, res) {
    // console.log(req.query)
    proxyReq.setHeader('Authorization', `Basic ${SSRS_BASIC_AUTH}`)
  },
  pathRewrite: async function (path, req) {
    // Remove Query Parameters 'TOKEN_FIELD' when proxying to SSRS Server
    let newPath = [];
    let _paths = path.split('?');
    _paths.map(_path=>{
      let newQuery = []
      let _query = _path.split('&');
      _query.map(_q => {
        let keys = _q.split("=")
        if (keys[0] == TOKEN_FIELD) return
        newQuery.push(keys.join("="))
      })
      newPath.push(newQuery.join("&"))
    })
    return newPath.join('?');
  }
}))

// Start the Proxy
app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`)
})