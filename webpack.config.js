
switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production ':
  case 'production': module.exports = require('./config/webpack.prod')
    break
  case 'dev':
  case 'development ':
  case 'development':
  default: module.exports = require('./config/webpack.dev')
}
