const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const middlewares = require('./middlewares')
const { HOST, PORT, SSRS_SERVER_IP, JWT_SECRET_SALT, SSRS_BASIC_AUTH } = require('./config')
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
app.use('/', middlewares.auth, createProxyMiddleware({
  target: SSRS_SERVER_IP,
  pathRewrite: { '^/': '/ReportServer/' },
  // changeOrigin: true,
  onProxyReq: function (proxyReq, req, res) {
    console.log(req.query)
    proxyReq.setHeader('Authorization', `Basic ${SSRS_BASIC_AUTH}`)
  }
}))

// Start the Proxy
app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`)
})