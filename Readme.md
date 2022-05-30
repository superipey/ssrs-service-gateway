# Configuration
Open `config.js`
```
HOST: '', // HOST of Service Gateway
PORT: '', // PORT of Service Gateway
JWT_SECRET_SALT: '', // JWT Salt for JWT Verification
SSRS_SERVER_IP: '', // SSRS Server IP
SSRS_BASIC_AUTH: '' // base64_encode(username:password) of SSRS Credentials
```

# How to Access
Call endpoint with parameter query `token`

Homepage Report Example: `http://host:port?token=JWT_TOKEN`

Deep Report Example: `http://host:port/Report+Project1?token=JWT_TOKEN`

# How to Use this Example
```
$ yarn install
$ yarn start
```