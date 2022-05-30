module.exports = {
  HOST: 'localhost', // HOST of Service Gateway
  PORT: '3000', // PORT of Service Gateway
  JWT_SECRET_SALT: '!s3cr3t-t0k3n!', // JWT Salt for JWT Verification
  SSRS_SERVER_IP: 'http://100.27.21.229', // SSRS Server IP
  SSRS_BASIC_AUTH:'QWRtaW5pc3RyYXRvcjpNRip3QWVYdkl0Y2dWRkJzNUsoNWVST0RqSSEhbFdDbg==' // base64_encode(username:password) of SSRS Credentials
}