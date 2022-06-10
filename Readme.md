# Configuration
Open `config.js`
```
HOST: '', // HOST of Service Gateway
PORT: '', // PORT of Service Gateway
JWT_SECRET_SALT: '', // JWT Salt for JWT Verification
SSRS_SERVER_IP: '', // SSRS Server IP
SSRS_BASIC_AUTH: '' // base64_encode(username:password) of SSRS Credentials
TOKEN_FIELD: 'token' // Custom Token Field Name from Frontend
```

# How to Access
Call endpoint with parameter query `token`

Homepage Report Example: `http://host:port/ReportServer/?token=JWT_TOKEN`

Deep Report Folder Example: `http://host:port/ReportServer/Report+Project1?token=JWT_TOKEN`

Report Example: `http://host:port/ReportServer/Pages/ReportViewer.aspx?%2fReport+Project1%2fReport1&rs:Command=Render&token=JWT_TOKEN`

# How to Use this Example
```
$ yarn install
$ yarn start
```