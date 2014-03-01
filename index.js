module.exports = require('ws').Server
module.exports.createServer = function (options, connectionListener) {
  var server = new module.exports(options)
  if (typeof connectionListener === 'function')
    server.on('connection', connectionListener)
  return server
}